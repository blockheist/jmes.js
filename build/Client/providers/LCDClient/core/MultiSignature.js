"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MultiSignature = void 0;
const PublicKey_1 = require("./PublicKey");
const CompactBitArray_1 = require("./CompactBitArray");
const SignatureV2_1 = require("./SignatureV2");
class MultiSignature {
    /**
     * MultiSignature constructor
     * public_keys order must be guaranteed
     */
    constructor(multisig_pubkey) {
        this.multisig_pubkey = multisig_pubkey;
        const n = multisig_pubkey.pubkeys.length;
        this.bitarray = CompactBitArray_1.CompactBitArray.fromBits(n);
        this.signatures = [];
    }
    appendSignature(signature_data, index) {
        const newSigIndex = this.bitarray.numTrueBitsBefore(index);
        // Signature already exists, just replace the value there
        if (this.bitarray.getIndex(index)) {
            this.signatures[newSigIndex] = signature_data;
            return;
        }
        this.bitarray.setIndex(index, true);
        // Optimization if the index is the greatest index
        if (newSigIndex == this.signatures.length) {
            this.signatures.push(signature_data);
            return;
        }
        this.signatures.splice(newSigIndex, 0, signature_data);
    }
    // adds a signature to the multisig, at the index in
    // keys corresponding to the provided pubkey.
    appendSignatureFromPubKey(signature_data, public_key) {
        const index = this.multisig_pubkey.pubkeys.findIndex(v => v.key === public_key.key);
        if (index == -1) {
            throw new Error("provided key doesn't exist in public_keys");
        }
        this.appendSignature(signature_data, index);
    }
    appendSignatureV2s(signatures) {
        for (const signature of signatures) {
            if (!(signature.public_key instanceof PublicKey_1.SimplePublicKey)) {
                throw new Error('non-SimplePublicKey cannot be used to sign multisig');
            }
            this.appendSignatureFromPubKey(signature.data, signature.public_key);
        }
    }
    toSignatureDescriptor() {
        return new SignatureV2_1.SignatureV2.Descriptor(new SignatureV2_1.SignatureV2.Descriptor.Multi(this.bitarray, this.signatures));
    }
}
exports.MultiSignature = MultiSignature;
//# sourceMappingURL=MultiSignature.js.map