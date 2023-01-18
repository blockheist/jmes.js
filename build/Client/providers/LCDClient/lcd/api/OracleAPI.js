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
exports.OracleAPI = void 0;
const BaseAPI_1 = require("./BaseAPI");
const core_1 = require("../../core");
class OracleAPI extends BaseAPI_1.BaseAPI {
    constructor(lcd) {
        super(lcd.apiRequester);
        this.lcd = lcd;
    }
    /**
     * Gets the Oracle module's currently registered exchange rate for ujmes in all available denominations.
     */
    exchangeRates(params = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.lcd.config.isClassic) {
                throw new Error('Not supported for the network');
            }
            return this.c
                .get(`/terra/oracle/v1beta1/denoms/exchange_rates`, params)
                .then(d => core_1.Coins.fromData(d.exchange_rates));
        });
    }
    /**
     * Gets the Oracle module's currently registered exchange rate for the specific denomination.
     * @param denom denomination in which to get the exchange rate of ujmes
     */
    exchangeRate(denom, params = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.lcd.config.isClassic) {
                throw new Error('Not supported for the network');
            }
            return this.c
                .get(`/terra/oracle/v1beta1/denoms/${denom}/exchange_rate`, params)
                .then(d => core_1.Coin.fromData({
                denom,
                amount: d.exchange_rate,
            }));
        });
    }
    /**
     * Gets the current list of active denominations.
     */
    activeDenoms(params = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.lcd.config.isClassic) {
                throw new Error('Not supported for the network');
            }
            return this.c
                .get(`/terra/oracle/v1beta1/denoms/actives`, params)
                .then(d => d.actives);
        });
    }
    /**
     * Gets the registered feeder address associated with the validator. The feeder address is the
     * Terra account that is permitted to sign Oracle vote messages in the validator's name.
     * @param validator validator's operator address
     */
    feederAddress(validator, params = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.lcd.config.isClassic) {
                throw new Error('Not supported for the network');
            }
            return this.c
                .get(`/terra/oracle/v1beta1/validators/${validator}/feeder`, params)
                .then(d => d.feeder_addr);
        });
    }
    /**
     * Gets the number of missed oracle votes for the validator over the current slash window.
     * @param validator validator's operator address
     */
    misses(validator, params = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.lcd.config.isClassic) {
                throw new Error('Not supported for the network');
            }
            return this.c
                .get(`/terra/oracle/v1beta1/validators/${validator}/miss`, params)
                .then(d => Number.parseInt(d.miss_counter));
        });
    }
    /**
     * Gets the validator's current submitted aggregate prevote
     * @param validator validator's operator address
     */
    aggregatePrevote(validator, params = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.lcd.config.isClassic) {
                throw new Error('Not supported for the network');
            }
            return this.c
                .get(`/terra/oracle/v1beta1/validators/${validator}/aggregate_prevote`, params)
                .then(d => core_1.AggregateExchangeRatePrevote.fromData(d.aggregate_prevote));
        });
    }
    /**
     * Gets the validator's current submitted aggregate vote
     * @param validator validator's operator address
     */
    aggregateVote(validator, params = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.lcd.config.isClassic) {
                throw new Error('Not supported for the network');
            }
            return this.c
                .get(`/terra/oracle/v1beta1/validators/${validator}/aggregate_vote`, params)
                .then(d => core_1.AggregateExchangeRateVote.fromData(d.aggregate_vote));
        });
    }
    /**
     * Gets the current Oracle module's parameters.
     */
    parameters(params = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.lcd.config.isClassic) {
                throw new Error('Not supported for the network');
            }
            return this.c
                .get(`/terra/oracle/v1beta1/params`, params)
                .then(({ params: d }) => ({
                vote_period: Number.parseInt(d.vote_period),
                vote_threshold: new core_1.Dec(d.vote_threshold),
                reward_band: new core_1.Dec(d.reward_band),
                reward_distribution_window: Number.parseInt(d.reward_distribution_window),
                whitelist: d.whitelist.map(x => ({
                    name: x.name,
                    tobin_tax: new core_1.Dec(x.tobin_tax),
                })),
                slash_fraction: new core_1.Dec(d.slash_fraction),
                slash_window: Number.parseInt(d.slash_window),
                min_valid_per_window: new core_1.Dec(d.min_valid_per_window),
            }));
        });
    }
}
exports.OracleAPI = OracleAPI;
//# sourceMappingURL=OracleAPI.js.map