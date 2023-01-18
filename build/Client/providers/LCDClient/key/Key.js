"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Key = void 0;
const bech32_1 = require("bech32");
const core_1 = require("../core");
const SignatureV2_1 = require("../core/SignatureV2");
const signing_1 = require("@jmesworld/jmes.proto/src/cosmos/tx/signing/v1beta1/signing");
/**
 * Abstract key interface that provides transaction signing features and Bech32 address
 * and public key derivation from a public key. This allows you to create custom key
 * solutions, such as for various hardware wallets, by implementing signing and calling
 * `super` with the raw public key from within your subclass. See [[MnemonicKey]] for
 * an implementation of a basic mnemonic-based key.
 */
class Key {
    /**
     * Called to derive the relevant account and validator addresses and public keys from
     * the raw compressed public key in bytes.
     *
     * @param publicKey raw compressed bytes public key
     */
    constructor(publicKey) {
        this.publicKey = publicKey;
    }
    /**
     * Jmes account address. `jmes-` prefixed.
     */
    get accAddress() {
        if (!this.publicKey) {
            throw new Error('Could not compute accAddress: missing rawAddress');
        }
        return this.publicKey.address();
    }
    /**
     * Terra validator address. `jmesvaloper-` prefixed.
     */
    get valAddress() {
        if (!this.publicKey) {
            throw new Error('Could not compute valAddress: missing rawAddress');
        }
        return bech32_1.bech32.encode('jmesvaloper', bech32_1.bech32.toWords(this.publicKey.rawAddress()));
    }
    /**
     * Signs a [[StdSignMsg]] with the method supplied by the child class.
     * only used Amino sign
     *
     * @param tx sign-message of the transaction to sign
     * @param isClassic target network is isClassic or not?
     */
    createSignatureAmino(tx, isClassic) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.publicKey) {
                throw new Error('Signature could not be created: Key instance missing publicKey');
            }
            return new SignatureV2_1.SignatureV2(this.publicKey, new SignatureV2_1.SignatureV2.Descriptor(new SignatureV2_1.SignatureV2.Descriptor.Single(signing_1.SignMode.SIGN_MODE_LEGACY_AMINO_JSON, (yield this.sign(Buffer.from(tx.toAminoJSON(isClassic)))).toString('base64'))), tx.sequence);
        });
    }
    /**
     * Signs a [[SignDoc]] with the method supplied by the child class.
     *
     * @param tx sign-message of the transaction to sign
     * @param isClassic target network is isClassic or not?
     */
    createSignature(signDoc, isClassic) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.publicKey) {
                throw new Error('Signature could not be created: Key instance missing publicKey');
            }
            // backup for restore
            const signerInfos = signDoc.auth_info.signer_infos;
            signDoc.auth_info.signer_infos = [
                new core_1.SignerInfo(this.publicKey, signDoc.sequence, new core_1.ModeInfo(new core_1.ModeInfo.Single(signing_1.SignMode.SIGN_MODE_DIRECT))),
            ];
            const sigBytes = (yield this.sign(Buffer.from(signDoc.toBytes(isClassic)))).toString('base64');
            console.log({ sigBytes });
            // restore signDoc to origin
            signDoc.auth_info.signer_infos = signerInfos;
            return new SignatureV2_1.SignatureV2(this.publicKey, new SignatureV2_1.SignatureV2.Descriptor(new SignatureV2_1.SignatureV2.Descriptor.Single(signing_1.SignMode.SIGN_MODE_DIRECT, sigBytes)), signDoc.sequence);
        });
    }
    /**
     * Signs a [[Tx]] and adds the signature to a generated StdTx that is ready to be broadcasted.
     * @param tx
     */
    signTx(tx, options, isClassic) {
        return __awaiter(this, void 0, void 0, function* () {
            const copyTx = new core_1.Tx(tx.body, new core_1.AuthInfo([], tx.auth_info.fee), []);
            const sign_doc = new core_1.SignDoc(options.chainID, options.accountNumber, options.sequence, copyTx.auth_info, copyTx.body);
            let signature;
            if (options.signMode === signing_1.SignMode.SIGN_MODE_LEGACY_AMINO_JSON) {
                signature = yield this.createSignatureAmino(sign_doc, isClassic);
            }
            else {
                signature = yield this.createSignature(sign_doc, isClassic);
            }
            const sigData = signature.data.single;
            copyTx.signatures.push(...tx.signatures, sigData.signature);
            copyTx.auth_info.signer_infos.push(...tx.auth_info.signer_infos, new core_1.SignerInfo(signature.public_key, signature.sequence, new core_1.ModeInfo(new core_1.ModeInfo.Single(sigData.mode))));
            return copyTx;
        });
    }
}
exports.Key = Key;
//# sourceMappingURL=Key.js.map