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
exports.MintAPI = void 0;
const core_1 = require("../../core");
const BaseAPI_1 = require("./BaseAPI");
class MintAPI extends BaseAPI_1.BaseAPI {
    constructor(lcd) {
        super(lcd.apiRequester);
        this.lcd = lcd;
    }
    /**
     * Gets the current minting inflation value
     */
    inflation(params = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.c
                .get(`/cosmos/mint/v1beta1/inflation`, params)
                .then(d => new core_1.Dec(d.inflation));
        });
    }
    /**
     * Gets the current minting annual provisions value
     */
    annualProvisions(params = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.c
                .get(`cosmos/mint/v1beta1/annual_provisions`, params)
                .then(d => new core_1.Dec(d.annual_provisions));
        });
    }
    /**
     * Gets the current minting module's parameters.
     */
    parameters(params = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.c
                .get(`/cosmos/mint/v1beta1/params`, params)
                .then(({ params: d }) => ({
                mint_denom: d.mint_denom,
                inflation_rate_change: new core_1.Dec(d.inflation_rate_change),
                inflation_max: new core_1.Dec(d.inflation_max),
                inflation_min: new core_1.Dec(d.inflation_min),
                goal_bonded: new core_1.Dec(d.goal_bonded),
                blocks_per_year: Number.parseInt(d.blocks_per_year),
            }));
        });
    }
}
exports.MintAPI = MintAPI;
//# sourceMappingURL=MintAPI.js.map