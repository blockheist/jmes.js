"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModeInfo = exports.SignerInfo = exports.AuthInfo = exports.TxBody = exports.Tx = void 0;
const PublicKey_1 = require("./PublicKey");
const signing_1 = require("@jmesworld/jmes.proto/src/cosmos/tx/signing/v1beta1/signing");
const tx_1 = require("@jmesworld/jmes.proto/src/cosmos/tx/v1beta1/tx");
const CompactBitArray_1 = require("./CompactBitArray");
const Msg_1 = require("./Msg");
const Fee_1 = require("./Fee");
const Long = __importStar(require("long"));
const SignatureV2_1 = require("./SignatureV2");
class Tx {
    constructor(body, auth_info, signatures) {
        this.body = body;
        this.auth_info = auth_info;
        this.signatures = signatures;
    }
    static fromAmino(data, isClassic) {
        const signatures = data.value.signatures.map(s => SignatureV2_1.SignatureV2.fromAmino(s));
        return new Tx(new TxBody(data.value.msg.map(m => Msg_1.Msg.fromAmino(m, isClassic)), data.value.memo, Number.parseInt(data.value.timeout_height)), new AuthInfo([], Fee_1.Fee.fromAmino(data.value.fee)), signatures.map(s => { var _a; return ((_a = s.data.single) === null || _a === void 0 ? void 0 : _a.signature) || ''; }));
    }
    static fromData(data, isClassic) {
        return new Tx(TxBody.fromData(data.body, isClassic), AuthInfo.fromData(data.auth_info), data.signatures);
    }
    toData(isClassic) {
        return {
            body: this.body.toData(isClassic),
            auth_info: this.auth_info.toData(),
            signatures: this.signatures,
        };
    }
    static unpackAny(anyProto, isClassic) {
        return this.fromProto(tx_1.Tx.decode(anyProto.value), isClassic);
    }
    static fromProto(proto, isClassic) {
        return new Tx(TxBody.fromProto(proto.body, isClassic), AuthInfo.fromProto(proto.authInfo), proto.signatures.map(sig => Buffer.from(sig).toString('base64')));
    }
    toProto(isClassic) {
        return tx_1.Tx.fromPartial({
            body: this.body.toProto(isClassic),
            authInfo: this.auth_info.toProto(),
            signatures: this.signatures.map(s => Buffer.from(s, 'base64')),
        });
    }
    toBytes(isClassic) {
        return tx_1.Tx.encode(this.toProto(isClassic)).finish();
    }
    static fromBuffer(buf, isClassic) {
        return Tx.fromProto(tx_1.Tx.decode(buf), isClassic);
    }
    appendEmptySignatures(signers) {
        signers.forEach(signer => {
            let signerInfo;
            if (signer.publicKey) {
                if (signer.publicKey instanceof PublicKey_1.LegacyAminoMultisigPublicKey) {
                    signerInfo = new SignerInfo(signer.publicKey, signer.sequenceNumber, new ModeInfo(new ModeInfo.Multi(CompactBitArray_1.CompactBitArray.fromBits(signer.publicKey.pubkeys.length), [])));
                }
                else {
                    signerInfo = new SignerInfo(signer.publicKey, signer.sequenceNumber, new ModeInfo(new ModeInfo.Single(ModeInfo.SignMode.SIGN_MODE_DIRECT)));
                }
            }
            else {
                signerInfo = new SignerInfo(new PublicKey_1.SimplePublicKey(''), signer.sequenceNumber, new ModeInfo(new ModeInfo.Single(ModeInfo.SignMode.SIGN_MODE_DIRECT)));
            }
            this.auth_info.signer_infos.push(signerInfo);
            this.signatures.push('');
        });
    }
    clearSignatures() {
        this.auth_info.signer_infos = [];
        this.signatures = [];
    }
    appendSignatures(signatures) {
        for (const signature of signatures) {
            const [modeInfo, sigBytes] = signature.data.toModeInfoAndSignature();
            this.signatures.push(Buffer.from(sigBytes).toString('base64'));
            this.auth_info.signer_infos.push(new SignerInfo(signature.public_key, signature.sequence, modeInfo));
        }
    }
}
exports.Tx = Tx;
class TxBody {
    constructor(messages, memo, timeout_height) {
        this.messages = messages;
        this.memo = memo;
        this.timeout_height = timeout_height;
    }
    static fromData(data, isClassic) {
        return new TxBody(data.messages.map(m => Msg_1.Msg.fromData(m, isClassic)), data.memo, Number.parseInt(data.timeout_height));
    }
    toData(isClassic) {
        var _a, _b;
        return {
            memo: (_a = this.memo) !== null && _a !== void 0 ? _a : '',
            messages: this.messages.map(m => m.toData(isClassic)),
            timeout_height: ((_b = this.timeout_height) !== null && _b !== void 0 ? _b : 0).toFixed(),
        };
    }
    static fromProto(proto, isClassic) {
        return new TxBody(proto.messages.map(m => Msg_1.Msg.fromProto(m, isClassic)), proto.memo, proto.timeoutHeight.toNumber());
    }
    toProto(isClassic) {
        var _a;
        return tx_1.TxBody.fromPartial({
            memo: this.memo,
            messages: this.messages.map(m => m.packAny(isClassic)),
            timeoutHeight: Long.fromNumber((_a = this.timeout_height) !== null && _a !== void 0 ? _a : 0),
        });
    }
    toBytes(isClassic) {
        return tx_1.TxBody.encode(this.toProto(isClassic)).finish();
    }
}
exports.TxBody = TxBody;
class AuthInfo {
    constructor(signer_infos, fee) {
        this.signer_infos = signer_infos;
        this.fee = fee;
    }
    static fromData(data) {
        return new AuthInfo(data.signer_infos.map(s => SignerInfo.fromData(s)), Fee_1.Fee.fromData(data.fee));
    }
    toData() {
        return {
            fee: this.fee.toData(),
            signer_infos: this.signer_infos.map(info => info.toData()),
        };
    }
    static fromProto(proto) {
        return new AuthInfo(proto.signerInfos.map(s => SignerInfo.fromProto(s)), Fee_1.Fee.fromProto(proto.fee));
    }
    toProto() {
        return tx_1.AuthInfo.fromPartial({
            fee: this.fee.toProto(),
            signerInfos: this.signer_infos.map(info => info.toProto()),
        });
    }
    toBytes() {
        return tx_1.AuthInfo.encode(this.toProto()).finish();
    }
}
exports.AuthInfo = AuthInfo;
class SignerInfo {
    constructor(public_key, sequence, mode_info) {
        this.public_key = public_key;
        this.sequence = sequence;
        this.mode_info = mode_info;
    }
    static fromData(data) {
        var _a;
        return new SignerInfo(PublicKey_1.PublicKey.fromData((_a = data.public_key) !== null && _a !== void 0 ? _a : new PublicKey_1.SimplePublicKey('').toData()), Number.parseInt(data.sequence), ModeInfo.fromData(data.mode_info));
    }
    toData() {
        const { public_key, sequence, mode_info } = this;
        return {
            mode_info: mode_info.toData(),
            public_key: (public_key === null || public_key === void 0 ? void 0 : public_key.toData()) || null,
            sequence: sequence.toFixed(),
        };
    }
    static fromProto(proto) {
        var _a;
        return new SignerInfo(PublicKey_1.PublicKey.fromProto((_a = proto.publicKey) !== null && _a !== void 0 ? _a : new PublicKey_1.SimplePublicKey('').packAny()), proto.sequence.toNumber(), ModeInfo.fromProto(proto.modeInfo));
    }
    toProto() {
        const { public_key, sequence, mode_info } = this;
        return tx_1.SignerInfo.fromPartial({
            modeInfo: mode_info.toProto(),
            publicKey: public_key === null || public_key === void 0 ? void 0 : public_key.packAny(),
            sequence: Long.fromNumber(sequence),
        });
    }
}
exports.SignerInfo = SignerInfo;
class ModeInfo {
    constructor(mode_info) {
        if (mode_info instanceof ModeInfo.Single) {
            this.single = mode_info;
        }
        else {
            this.multi = mode_info;
        }
    }
    static fromData(data) {
        if (data.single) {
            return new ModeInfo(ModeInfo.Single.fromData(data.single));
        }
        if (data.multi) {
            return new ModeInfo(ModeInfo.Multi.fromData(data.multi));
        }
        throw new Error('must be one of single or multi');
    }
    toData() {
        var _a, _b;
        return {
            single: (_a = this.single) === null || _a === void 0 ? void 0 : _a.toData(),
            multi: (_b = this.multi) === null || _b === void 0 ? void 0 : _b.toData(),
        };
    }
    static fromProto(proto) {
        const singleMode = proto.single;
        const multiMode = proto.multi;
        return new ModeInfo(singleMode
            ? ModeInfo.Single.fromProto(singleMode)
            : ModeInfo.Multi.fromProto(multiMode));
    }
    toProto() {
        var _a, _b;
        return tx_1.ModeInfo.fromPartial({
            multi: (_a = this.multi) === null || _a === void 0 ? void 0 : _a.toProto(),
            single: (_b = this.single) === null || _b === void 0 ? void 0 : _b.toProto(),
        });
    }
}
exports.ModeInfo = ModeInfo;
(function (ModeInfo) {
    ModeInfo.SignMode = signing_1.SignMode;
    class Single {
        constructor(mode) {
            this.mode = mode;
        }
        static fromData(data) {
            return new Single((0, signing_1.signModeFromJSON)(data.mode));
        }
        toData() {
            return {
                mode: (0, signing_1.signModeToJSON)(this.mode),
            };
        }
        static fromProto(proto) {
            return new Single(proto.mode);
        }
        toProto() {
            return tx_1.ModeInfo_Single.fromPartial({
                mode: this.mode,
            });
        }
    }
    ModeInfo.Single = Single;
    class Multi {
        constructor(bitarray, modeInfos) {
            this.bitarray = bitarray;
            this.modeInfos = modeInfos;
        }
        static fromData(proto) {
            return new Multi(CompactBitArray_1.CompactBitArray.fromData(proto.bitarray), proto.mode_infos.map(m => ModeInfo.fromData(m)));
        }
        toData() {
            return {
                bitarray: this.bitarray.toData(),
                mode_infos: this.modeInfos.map(m => m.toData()),
            };
        }
        static fromProto(proto) {
            return new Multi(CompactBitArray_1.CompactBitArray.fromProto(proto.bitarray), proto.modeInfos.map(m => ModeInfo.fromProto(m)));
        }
        toProto() {
            return tx_1.ModeInfo_Multi.fromPartial({
                bitarray: this.bitarray.toProto(),
                modeInfos: this.modeInfos.map(m => m.toProto()),
            });
        }
    }
    ModeInfo.Multi = Multi;
})(ModeInfo = exports.ModeInfo || (exports.ModeInfo = {}));
//# sourceMappingURL=Tx.js.map