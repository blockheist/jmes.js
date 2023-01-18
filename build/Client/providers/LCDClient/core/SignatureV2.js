"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignatureV2 = exports.SignMode = void 0;
const PublicKey_1 = require("./PublicKey");
const Tx_1 = require("./Tx");
const CompactBitArray_1 = require("./CompactBitArray");
const signing_1 = require("@jmesworld/jmes.proto/src/cosmos/tx/signing/v1beta1/signing");
const multisig_1 = require("@jmesworld/jmes.proto/src/cosmos/crypto/multisig/v1beta1/multisig");
var signing_2 = require("@jmesworld/jmes.proto/src/cosmos/tx/signing/v1beta1/signing");
Object.defineProperty(exports, "SignMode", { enumerable: true, get: function () { return signing_2.SignMode; } });
class SignatureV2 {
    constructor(public_key, data, sequence) {
        this.public_key = public_key;
        this.data = data;
        this.sequence = sequence;
    }
    static fromData(data) {
        return new SignatureV2(PublicKey_1.PublicKey.fromData(data.public_key), SignatureV2.Descriptor.fromData(data.data), Number.parseInt(data.sequence));
    }
    toData() {
        return {
            public_key: this.public_key.toData(),
            data: this.data.toData(),
            sequence: this.sequence.toFixed(),
        };
    }
    static fromAmino(data) {
        return new SignatureV2(PublicKey_1.PublicKey.fromAmino(data.pub_key), new SignatureV2.Descriptor(new SignatureV2.Descriptor.Single(SignatureV2.SignMode.SIGN_MODE_LEGACY_AMINO_JSON, data.signature)), 0);
    }
}
exports.SignatureV2 = SignatureV2;
(function (SignatureV2) {
    SignatureV2.SignMode = signing_1.SignMode;
    class Descriptor {
        constructor(data) {
            data instanceof Descriptor.Single
                ? (this.single = data)
                : (this.multi = data);
        }
        static fromData(data) {
            if (data.single) {
                return new Descriptor(Descriptor.Single.fromData(data.single));
            }
            if (data.multi) {
                return new Descriptor(Descriptor.Multi.fromData(data.multi));
            }
            throw new Error('must be one of single or multi');
        }
        toData() {
            if (this.single) {
                return {
                    single: this.single.toData(),
                };
            }
            if (this.multi) {
                return {
                    multi: this.multi.toData(),
                };
            }
            throw new Error('must be one of single or multi');
        }
        toModeInfoAndSignature() {
            if (this.single) {
                const sigData = this.single;
                return [
                    new Tx_1.ModeInfo(new Tx_1.ModeInfo.Single(sigData.mode)),
                    Buffer.from(sigData.signature, 'base64'),
                ];
            }
            if (this.multi) {
                const sigData = this.multi;
                const modeInfos = [];
                const signatures = [];
                for (const signature of sigData.signatures) {
                    const [modeInfo, sigBytes] = signature.toModeInfoAndSignature();
                    modeInfos.push(modeInfo);
                    signatures.push(sigBytes);
                }
                const multisigBytes = multisig_1.MultiSignature.encode(multisig_1.MultiSignature.fromPartial({
                    signatures: signatures,
                })).finish();
                return [
                    new Tx_1.ModeInfo(new Tx_1.ModeInfo.Multi(sigData.bitarray, modeInfos)),
                    multisigBytes,
                ];
            }
            throw new Error('invalid signature descriptor');
        }
    }
    SignatureV2.Descriptor = Descriptor;
    (function (Descriptor) {
        class Single {
            constructor(mode, signature) {
                this.mode = mode;
                this.signature = signature;
            }
            static fromData(data) {
                return new Single((0, signing_1.signModeFromJSON)(data.mode), data.signature);
            }
            toData() {
                const { mode, signature } = this;
                return {
                    mode: (0, signing_1.signModeToJSON)(mode),
                    signature,
                };
            }
        }
        Descriptor.Single = Single;
        class Multi {
            constructor(bitarray, signatures) {
                this.bitarray = bitarray;
                this.signatures = signatures;
            }
            static fromData(data) {
                return new Multi(CompactBitArray_1.CompactBitArray.fromData(data.bitarray), data.signatures.map(v => Descriptor.fromData(v)));
            }
            toData() {
                return {
                    bitarray: this.bitarray.toData(),
                    signatures: this.signatures.map(sig => sig.toData()),
                };
            }
        }
        Descriptor.Multi = Multi;
    })(Descriptor = SignatureV2.Descriptor || (SignatureV2.Descriptor = {}));
})(SignatureV2 = exports.SignatureV2 || (exports.SignatureV2 = {}));
//# sourceMappingURL=SignatureV2.js.map