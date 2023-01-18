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
exports.TreasuryAPI = void 0;
const BaseAPI_1 = require("./BaseAPI");
const core_1 = require("../../core");
class TreasuryAPI extends BaseAPI_1.BaseAPI {
    constructor(lcd) {
        super(lcd.apiRequester);
        this.lcd = lcd;
    }
    /**
     * Gets the current registered Tax caps for all denomination
     * @returns Coin[]
     */
    taxCaps(params = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.lcd.config.isClassic) {
                throw new Error('Not supported for the network');
            }
            return this.c
                .get(`/terra/treasury/v1beta1/tax_caps`, params)
                .then(d => new core_1.Coins(d.tax_caps.map(c => new core_1.Coin(c.denom, c.tax_cap))));
        });
    }
    /**
     * Gets the current registered Tax Cap for a specified denomination.
     * @param denom denomination desired for Tax Cap query.
     */
    taxCap(denom, params = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.lcd.config.isClassic) {
                throw new Error('Not supported for the network');
            }
            return this.c
                .get(`/terra/treasury/v1beta1/tax_caps/${denom}`, params)
                .then(d => new core_1.Coin(denom, d.tax_cap));
        });
    }
    /**
     * Gets the current registered Tax Rate.
     */
    taxRate(height, _params = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.lcd.config.isClassic) {
                throw new Error('Not supported for the network');
            }
            const params = Object.assign({}, _params);
            if (height) {
                params.height = height;
            }
            return this.c
                .get(`/terra/treasury/v1beta1/tax_rate`, params)
                .then(d => new core_1.Dec(d.tax_rate));
        });
    }
    /**
     * Gets the current registered Reward Weight monetary policy lever.
     */
    rewardWeight(params = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.lcd.config.isClassic) {
                throw new Error('Not supported for the network');
            }
            return this.c
                .get(`/terra/treasury/v1beta1/reward_weight`, params)
                .then(d => new core_1.Dec(d.reward_weight));
        });
    }
    /**
     * Gets the tax proceeds for the epoch.
     */
    taxProceeds(params = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.lcd.config.isClassic) {
                throw new Error('Not supported for the network');
            }
            return this.c
                .get(`/terra/treasury/v1beta1/tax_proceeds`, params)
                .then(d => core_1.Coins.fromData(d.tax_proceeds));
        });
    }
    /**
     * Gets the seigniorage proceeds for the epoch.
     */
    seigniorageProceeds(params = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.lcd.config.isClassic) {
                throw new Error('Not supported for the network');
            }
            return this.c
                .get(`/terra/treasury/v1beta1/seigniorage_proceeds`, params)
                .then(d => new core_1.Coin('ujmes', d.seigniorage_proceeds));
        });
    }
    /**
     * Gets the current Treasury module's parameters.
     */
    parameters(params = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.lcd.config.isClassic) {
                throw new Error('Not supported for the network');
            }
            return this.c
                .get(`/terra/treasury/v1beta1/params`, params)
                .then(({ params: d }) => ({
                tax_policy: core_1.PolicyConstraints.fromData(d.tax_policy),
                reward_policy: core_1.PolicyConstraints.fromData(d.reward_policy),
                mining_increment: new core_1.Dec(d.mining_increment),
                seigniorage_burden_target: new core_1.Dec(d.seigniorage_burden_target),
                window_long: Number.parseInt(d.window_long),
                window_short: Number.parseInt(d.window_short),
                window_probation: Number.parseInt(d.window_probation),
            }));
        });
    }
}
exports.TreasuryAPI = TreasuryAPI;
//# sourceMappingURL=TreasuryAPI.js.map