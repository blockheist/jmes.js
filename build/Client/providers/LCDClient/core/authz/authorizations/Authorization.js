"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Authorization = exports.AuthorizationGrant = void 0;
const json_1 = require("../../../util/json");
const GenericAuthorization_1 = require("./GenericAuthorization");
const SendAuthorization_1 = require("./SendAuthorization");
const StakeAuthorization_1 = require("./StakeAuthorization");
const authz_1 = require("@terra-money/terra.proto/cosmos/authz/v1beta1/authz");
class AuthorizationGrant extends json_1.JSONSerializable {
    constructor(authorization, expiration) {
        super();
        this.authorization = authorization;
        this.expiration = expiration;
    }
    static fromAmino(amino, isClassic) {
        const { authorization, expiration } = amino;
        return new AuthorizationGrant(Authorization.fromAmino(authorization, isClassic), new Date(expiration));
    }
    toAmino(isClassic) {
        const { authorization, expiration } = this;
        return {
            authorization: authorization.toAmino(isClassic),
            expiration: expiration.toISOString().replace(/\.000Z$/, 'Z'),
        };
    }
    static fromData(data, isClassic) {
        const { authorization, expiration } = data;
        return new AuthorizationGrant(Authorization.fromData(authorization, isClassic), new Date(expiration));
    }
    toData(isClassic) {
        const { authorization, expiration } = this;
        return {
            authorization: authorization.toData(isClassic),
            expiration: expiration.toISOString().replace(/\.000Z$/, 'Z'),
        };
    }
    static fromProto(proto, isClassic) {
        return new AuthorizationGrant(Authorization.fromProto(proto.authorization, isClassic), proto.expiration);
    }
    toProto(isClassic) {
        const { authorization, expiration } = this;
        return authz_1.Grant.fromPartial({
            authorization: authorization.packAny(isClassic),
            expiration,
        });
    }
}
exports.AuthorizationGrant = AuthorizationGrant;
var Authorization;
(function (Authorization) {
    function fromAmino(data, isClassic) {
        switch (data.type) {
            case 'msgauth/SendAuthorization':
            case 'cosmos-sdk/SendAuthorization':
                return SendAuthorization_1.SendAuthorization.fromAmino(data, isClassic);
            case 'msgauth/GenericAuthorization':
            case 'cosmos-sdk/GenericAuthorization':
                return GenericAuthorization_1.GenericAuthorization.fromAmino(data, isClassic);
        }
    }
    Authorization.fromAmino = fromAmino;
    function fromData(data, isClassic) {
        switch (data['@type']) {
            case '/cosmos.authz.v1beta1.GenericAuthorization':
                return GenericAuthorization_1.GenericAuthorization.fromData(data, isClassic);
            case '/cosmos.bank.v1beta1.SendAuthorization':
                return SendAuthorization_1.SendAuthorization.fromData(data, isClassic);
            case '/cosmos.staking.v1beta1.StakeAuthorization':
                return StakeAuthorization_1.StakeAuthorization.fromData(data, isClassic);
        }
    }
    Authorization.fromData = fromData;
    function fromProto(proto, isClassic) {
        const typeUrl = proto.typeUrl;
        switch (typeUrl) {
            case '/cosmos.authz.v1beta1.GenericAuthorization':
                return GenericAuthorization_1.GenericAuthorization.unpackAny(proto, isClassic);
            case '/cosmos.bank.v1beta1.SendAuthorization':
                return SendAuthorization_1.SendAuthorization.unpackAny(proto, isClassic);
            case '/cosmos.staking.v1beta1.StakeAuthorization':
                return StakeAuthorization_1.StakeAuthorization.unpackAny(proto, isClassic);
        }
        throw new Error(`Authorization type ${typeUrl} not recognized`);
    }
    Authorization.fromProto = fromProto;
})(Authorization = exports.Authorization || (exports.Authorization = {}));
//# sourceMappingURL=Authorization.js.map