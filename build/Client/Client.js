"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Client = void 0;
const Wallet_1 = require("../primitives/Wallet");
const MarketplaceAPI_1 = __importDefault(require("./providers/MarketplaceAPI/MarketplaceAPI"));
const IdentityAPI_1 = __importDefault(require("./providers/IdentityAPI/IdentityAPI"));
const FaucetAPI_1 = __importDefault(require("./providers/FaucetAPI/FaucetAPI"));
const LCDClient_1 = require("./providers/LCDClient/lcd/LCDClient");
const CONSTANTS_1 = require("../CONSTANTS");
class Client {
    constructor(config) {
        var _a, _b, _c;
        // Specific provider to external services
        this.providers = {
            marketplaceAPI: new MarketplaceAPI_1.default((_a = config === null || config === void 0 ? void 0 : config.providers) === null || _a === void 0 ? void 0 : _a.marketplaceAPI),
            identityAPI: new IdentityAPI_1.default((_b = config === null || config === void 0 ? void 0 : config.providers) === null || _b === void 0 ? void 0 : _b.identityAPI),
            faucetAPI: new FaucetAPI_1.default((_c = config === null || config === void 0 ? void 0 : config.providers) === null || _c === void 0 ? void 0 : _c.faucetAPI),
            LCDC: null
        };
    }
    createLCDClient(config) {
        this.providers.LCDC = new LCDClient_1.LCDClient(config);
        return this.providers.LCDC;
    }
    createWallet(key, lcdcUrl) {
        // Where 8888 is specific JMES Path for mainnet.
        // jmes-888 in testnet
        const bip44Path = `m/44'/${CONSTANTS_1.JMES_COIN_TYPE}'`;
        console.log(`Generating a new wallet with key on BIP Path ${bip44Path}`);
        // If it's a mnemonic based key, we create a derivableKey first.
        // @ts-ignore
        let derivableKey = (key.toMasterDerivableKey) ? key.toMasterDerivableKey() : key;
        // @ts-ignore
        const chainDerivedKey = derivableKey.derivePath(bip44Path);
        return new Wallet_1.Wallet(chainDerivedKey, lcdcUrl);
    }
}
exports.Client = Client;
//# sourceMappingURL=Client.js.map