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
exports.AuthzAPI = void 0;
const BaseAPI_1 = require("./BaseAPI");
const authorizations_1 = require("../../core/authz/authorizations");
class AuthzAPI extends BaseAPI_1.BaseAPI {
    constructor(lcd) {
        super(lcd.apiRequester);
        this.lcd = lcd;
    }
    /**
     * Get the message authorization grants for a specific granter and grantee
     */
    grants(granter, grantee, msgTypeUrl, params = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.c
                .get(`/cosmos/authz/v1beta1/grants`, Object.assign({
                granter,
                grantee,
                msg_type_url: msgTypeUrl,
            }, params))
                .then(d => [
                d.grants.map(grant => authorizations_1.AuthorizationGrant.fromData(grant, this.lcd.config.isClassic)),
                d.pagination,
            ]);
        });
    }
    /**
     * get list of `GrantAuthorization`, granted by granter.
     */
    granter(granter, params = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.lcd.config.isClassic) {
                throw new Error('Not supported for the network');
            }
            return this.c
                .get(`/cosmos/authz/v1beta1/grants/granter/${granter}`, params)
                .then(d => [
                d.grants.map(g => authorizations_1.AuthorizationGrant.fromData(g, this.lcd.config.isClassic)),
                d.pagination,
            ]);
        });
    }
    /**
     * get list of `GrantAuthorization`, by grantee.
     */
    grantee(grantee, params = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.lcd.config.isClassic) {
                throw new Error('Not supported for the network');
            }
            return this.c
                .get(`/cosmos/authz/v1beta1/grants/grantee/${grantee}`, params)
                .then(d => [
                d.grants.map(g => authorizations_1.AuthorizationGrant.fromData(g, this.lcd.config.isClassic)),
                d.pagination,
            ]);
        });
    }
}
exports.AuthzAPI = AuthzAPI;
//# sourceMappingURL=AuthzAPI.js.map