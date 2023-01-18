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
exports.FeeGrantAPI = void 0;
const BaseAPI_1 = require("./BaseAPI");
const allowances_1 = require("../../core/feegrant/allowances");
class FeeGrantAPI extends BaseAPI_1.BaseAPI {
    constructor(lcd) {
        super(lcd.apiRequester);
        this.lcd = lcd;
    }
    allowances(grantee, params = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.c
                .get(`/cosmos/feegrant/v1beta1/allowances/${grantee}`, params)
                .then(d => ({
                allowances: d.allowances.map(allowance => ({
                    granter: allowance.granter,
                    grantee: allowance.grantee,
                    allowance: allowances_1.Allowance.fromData(allowance.allowance),
                })),
                pagination: d.pagination,
            }));
        });
    }
    allowance(granter, grantee) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.c
                .get(`/cosmos/feegrant/v1beta1/allowance/${granter}/${grantee}`)
                .then(d => allowances_1.Allowance.fromData(d.allowance.allowance));
        });
    }
    allowancesByGranter(granter, params = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.lcd.config.isClassic) {
                throw new Error('Not supported for the network');
            }
            return this.c
                .get(`/cosmos/feegrant/v1beta1/issued/${granter}`, params)
                .then(d => ({
                allowances: d.allowances.map(allowance => ({
                    granter: allowance.granter,
                    grantee: allowance.grantee,
                    allowance: allowances_1.Allowance.fromData(allowance.allowance),
                })),
                pagination: d.pagination,
            }));
        });
    }
}
exports.FeeGrantAPI = FeeGrantAPI;
//# sourceMappingURL=FeeGrantAPI.js.map