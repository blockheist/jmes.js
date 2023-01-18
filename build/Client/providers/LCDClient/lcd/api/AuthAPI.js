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
exports.AuthAPI = void 0;
const core_1 = require("../../core");
const BaseAPI_1 = require("./BaseAPI");
class AuthAPI extends BaseAPI_1.BaseAPI {
    constructor(lcd) {
        super(lcd.apiRequester);
        this.lcd = lcd;
    }
    /**
     * Looks up the account information using its Terra account address. If the account has
     * vesting, it will be one of [LazyGradedVestingAccount, DelayedVestingAccount, PeriodicVestingAccount, ContinuousVestingAccount]
     *
     * @param address address of account to look up
     */
    accountInfo(address, params = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const { account } = yield this.c.get(`/cosmos/auth/v1beta1/accounts/${address}`, params);
            return core_1.Account.fromData(account, this.lcd.config.isClassic);
        });
    }
    parameters(params = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.lcd.config.isClassic) {
                throw new Error('Not supported for the network');
            }
            return this.c
                .get(`/cosmos/auth/v1beta1/params`, params)
                .then(({ params: d }) => ({
                max_memo_characters: Number.parseInt(d.max_memo_characters),
                tx_sig_limit: Number.parseInt(d.tx_sig_limit),
                tx_size_cost_per_byte: Number.parseInt(d.tx_size_cost_per_byte),
                sig_verify_cost_ed25519: Number.parseInt(d.sig_verify_cost_ed25519),
                sig_verify_cost_secp256k1: Number.parseInt(d.sig_verify_cost_secp256k1),
            }));
        });
    }
}
exports.AuthAPI = AuthAPI;
//# sourceMappingURL=AuthAPI.js.map