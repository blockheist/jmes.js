"use strict";
// Adapted from https://github.com/terra-money/terra-js/blob/master/src/utils/keyUtils.ts
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
exports.MnemonicKey = exports.JMES_COIN_TYPE = void 0;
const bip32 = __importStar(require("@scure/bip32"));
const bip39 = __importStar(require("bip39"));
const RawKey_1 = require("./RawKey");
exports.JMES_COIN_TYPE = 6280;
const DEFAULT_OPTIONS = {
    account: 0,
    index: 0,
    coinType: exports.JMES_COIN_TYPE,
};
/**
 * Implements a BIP39 mnemonic wallet with standard key derivation from a word list. Note
 * that this implementation exposes the private key in memory, so it is not advised to use
 * for applications requiring high security.
 */
class MnemonicKey extends RawKey_1.RawKey {
    /**
     * Creates a new signing key from a mnemonic phrase. If no mnemonic is provided, one
     * will be automatically generated.
     *
     * ### Providing a mnemonic
     *
     * ```ts
     * import { MnemonicKey } from 'terra.js';
     *
     * const mk = new MnemonicKey({ mnemonic: '...' });
     * console.log(mk.accAddress);
     * ```
     *
     * ### Generating a random mnemonic
     *
     * ```ts
     * const mk2 = new MnemonicKey();
     * console.log(mk2.mnemonic);
     * ```
     *
     * @param options
     */
    constructor(options = {}) {
        const { account, index, coinType } = Object.assign(Object.assign({}, DEFAULT_OPTIONS), options);
        let { mnemonic } = options;
        if (mnemonic === undefined) {
            mnemonic = bip39.generateMnemonic(256);
        }
        const seed = bip39.mnemonicToSeedSync(mnemonic);
        const masterKey = bip32.HDKey.fromMasterSeed(seed);
        const hdPathLuna = `m/44'/${coinType}'/${account}'/0/${index}`;
        // console.log({hdPathLuna});
        const terraHD = masterKey.derive(hdPathLuna);
        const privateKey = terraHD.privateKey;
        if (!privateKey) {
            throw new Error('Failed to derive key pair');
        }
        super(Buffer.from(privateKey));
        // console.log({MnemonicKeyPrivateKey: Buffer.from(privateKey)})
        this.mnemonic = mnemonic;
    }
}
exports.MnemonicKey = MnemonicKey;
//# sourceMappingURL=MnemonicKey.js.map