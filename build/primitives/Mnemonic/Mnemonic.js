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
exports.Mnemonic = void 0;
const crypto = __importStar(require("crypto"));
const ethers_1 = require("ethers");
const bip39 = __importStar(require("bip39"));
const DerivableKey_1 = require("../DerivableKey");
const bip32 = __importStar(require("@scure/bip32"));
class Mnemonic {
    constructor(mnemonic, password) {
        this.mnemonic = (mnemonic) ? mnemonic : Mnemonic.generateMnemonic();
        // FIXME: that's bad. Only valid for dev times...
        this.password = password !== null && password !== void 0 ? password : null;
    }
    static generateMnemonic(overwroteRandomBytes = null) {
        const getRandomValuesFn = (crypto && crypto.webcrypto)
            // FIX: Binding done to fix specific issue with nodev18 (https://github.com/cloudflare/miniflare/pull/216)
            ? crypto.webcrypto.getRandomValues.bind(crypto.webcrypto)
            : crypto.getRandomValues;
        const uintArray = new Uint8Array(32);
        // @ts-ignore
        const randomBytes = (overwroteRandomBytes !== null) ? overwroteRandomBytes : getRandomValuesFn(uintArray);
        // @ts-ignore
        const mnemonic = ethers_1.ethers.utils.entropyToMnemonic(randomBytes);
        return mnemonic;
    }
    static mnemonicToSeed(mnemonic, password) {
        return (password) ? bip39.mnemonicToSeedSync(mnemonic, password) : bip39.mnemonicToSeedSync(mnemonic);
    }
    toSeed() {
        return Mnemonic.mnemonicToSeed(this.mnemonic, this.password);
    }
    // @ts-ignore
    toMasterDerivableKey(opts = { account: 0, index: 0 }) {
        const seed = this.toSeed();
        const masterKey = bip32.HDKey.fromMasterSeed(seed);
        return new DerivableKey_1.DerivableKey(masterKey);
    }
}
exports.Mnemonic = Mnemonic;
;
//# sourceMappingURL=Mnemonic.js.map