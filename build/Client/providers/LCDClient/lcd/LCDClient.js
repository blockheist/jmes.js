"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LCDClient = void 0;
const APIRequester_1 = require("./APIRequester");
const api_1 = require("./api");
const LCDUtils_1 = require("./LCDUtils");
const Wallet_1 = require("./Wallet");
const DEFAULT_LCD_OPTIONS = {
    gasAdjustment: 1.75,
};
// isClassic network: true
// forked network : false
const DEFAULT_NETWORK_TYPE_BY_CHAIN_ID = {
    default: false,
    'jmes-888': true
};
const DEFAULT_GAS_PRICES_BY_CHAIN_ID = {
    default: {
        ujmes: 0.15,
    },
    'jmes-888': {
        ujmes: 0.15,
    },
};
/**
 * An object repesenting a connection to a terrad node running the Lite Client Daemon (LCD)
 * server, a REST server providing access to a node.
 *
 * ### Example
 *
 * ```ts
 * import { LCDClient, Coin } from 'terra.js';
 *
 * const terra = new LCDClient({
 *    URL: "https://lcd.terra.dev",
 *    chainID: "columbus-3"
 * });
 *
 * terra.market.swapRate(new Coin('ujmes', 10000), 'ukrw').then(c => console.log(c.toString()));
 * ```
 */
class LCDClient {
    /**
     * Creates a new LCD client with the specified configuration.
     *
     * @param config LCD configuration
     */
    constructor(config) {
        this.config = Object.assign(Object.assign(Object.assign({}, DEFAULT_LCD_OPTIONS), { gasPrices: DEFAULT_GAS_PRICES_BY_CHAIN_ID[config.chainID] ||
                DEFAULT_GAS_PRICES_BY_CHAIN_ID['default'], isClassic: DEFAULT_NETWORK_TYPE_BY_CHAIN_ID[config.chainID] ||
                DEFAULT_NETWORK_TYPE_BY_CHAIN_ID['default'] }), config);
        this.apiRequester = new APIRequester_1.APIRequester(this.config.URL);
        // instantiate APIs
        this.auth = new api_1.AuthAPI(this);
        this.bank = new api_1.BankAPI(this);
        this.distribution = new api_1.DistributionAPI(this);
        this.feeGrant = new api_1.FeeGrantAPI(this);
        this.gov = new api_1.GovAPI(this);
        this.market = new api_1.MarketAPI(this);
        this.mint = new api_1.MintAPI(this);
        this.authz = new api_1.AuthzAPI(this);
        this.oracle = new api_1.OracleAPI(this);
        this.slashing = new api_1.SlashingAPI(this);
        this.staking = new api_1.StakingAPI(this);
        this.tendermint = new api_1.TendermintAPI(this);
        this.treasury = new api_1.TreasuryAPI(this);
        this.wasm = new api_1.WasmAPI(this);
        this.ibc = new api_1.IbcAPI(this);
        this.ibcTransfer = new api_1.IbcTransferAPI(this);
        this.tx = new api_1.TxAPI(this);
        this.utils = new LCDUtils_1.LCDUtils(this);
    }
    /** Creates a new wallet with the Key. */
    wallet(key) {
        return new Wallet_1.Wallet(this, key);
    }
}
exports.LCDClient = LCDClient;
//# sourceMappingURL=LCDClient.js.map