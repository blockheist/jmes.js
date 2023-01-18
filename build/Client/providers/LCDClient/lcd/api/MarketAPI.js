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
exports.MarketAPI = void 0;
const core_1 = require("../../core");
const BaseAPI_1 = require("./BaseAPI");
class MarketAPI extends BaseAPI_1.BaseAPI {
    constructor(lcd) {
        super(lcd.apiRequester);
        this.lcd = lcd;
    }
    /**
     * Gets the Market's swap rate for a given coin to a requested denomination.
     * @param offerCoin coin to convert
     * @param askDenom denomination to swap into
     */
    swapRate(offerCoin, askDenom, _params = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.lcd.config.isClassic) {
                throw new Error('Not supported for the network');
            }
            const params = Object.assign(Object.assign({}, _params), { offer_coin: offerCoin.toString(), ask_denom: askDenom });
            return this.c
                .get(`/terra/market/v1beta1/swap`, params)
                .then(d => core_1.Coin.fromData(d.return_coin));
        });
    }
    /**
     * Gets current value of the pool delta, which is used to determine Terra<>Luna swap rates.
     */
    poolDelta(params = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.lcd.config.isClassic) {
                throw new Error('Not supported for the network');
            }
            return this.c
                .get(`/terra/market/v1beta1/terra_pool_delta`, params)
                .then(d => new core_1.Dec(d.terra_pool_delta));
        });
    }
    /**
     * Gets the current Market module's parameters.
     */
    parameters(params = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.lcd.config.isClassic) {
                throw new Error('Not supported for the network');
            }
            return this.c
                .get(`/terra/market/v1beta1/params`, params)
                .then(({ params: d }) => ({
                pool_recovery_period: Number.parseInt(d.pool_recovery_period),
                base_pool: new core_1.Dec(d.base_pool),
                min_stability_spread: new core_1.Dec(d.min_stability_spread),
            }));
        });
    }
}
exports.MarketAPI = MarketAPI;
//# sourceMappingURL=MarketAPI.js.map