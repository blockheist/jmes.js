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
exports.BankAPI = void 0;
const BaseAPI_1 = require("./BaseAPI");
const core_1 = require("../../core");
class BankAPI extends BaseAPI_1.BaseAPI {
    constructor(lcd) {
        super(lcd.apiRequester);
        this.lcd = lcd;
    }
    /**
     * Look up the balance of an account by its address.
     * @param address address of account to look up.
     */
    balance(address, params = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.c
                .get(`/cosmos/bank/v1beta1/balances/${address}`, params)
                .then(d => [core_1.Coins.fromData(d.balances), d.pagination]);
        });
    }
    /**
     * Get the total supply of tokens in circulation for all denominations.
     */
    total(params = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.c
                .get(`/cosmos/bank/v1beta1/supply`, params)
                .then(d => [core_1.Coins.fromData(d.supply), d.pagination]);
        });
    }
    /**
     * Lqueries the spenable balance of all coins for a single account.
     * @param address address of account to look up.
     */
    spendableBalances(address, params = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.lcd.config.isClassic) {
                throw new Error('Not supported for the network');
            }
            return this.c
                .get(`/cosmos/bank/v1beta1/spendable_balances/${address}`, params)
                .then(d => [core_1.Coins.fromData(d.balances), d.pagination]);
        });
    }
    parameters(params = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.lcd.config.isClassic) {
                throw new Error('Not supported for the network');
            }
            return this.c
                .get(`/cosmos/bank/v1beta1/params`, params)
                .then(({ params: d }) => ({
                send_enabled: d.send_enabled,
                default_send_enabled: d.default_send_enabled,
            }));
        });
    }
}
exports.BankAPI = BankAPI;
//# sourceMappingURL=BankAPI.js.map