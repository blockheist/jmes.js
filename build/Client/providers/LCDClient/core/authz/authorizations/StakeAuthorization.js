"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StakeAuthorizationValidators = exports.StakeAuthorization = void 0;
const json_1 = require("../../../util/json");
const Coin_1 = require("../../Coin");
const authz_1 = require("@terra-money/terra.proto/cosmos/staking/v1beta1/authz");
const any_1 = require("@terra-money/terra.proto/google/protobuf/any");
class StakeAuthorization extends json_1.JSONSerializable {
    constructor(authorization_type, max_tokens, allow_list, deny_list) {
        super();
        this.authorization_type = authorization_type;
        this.max_tokens = max_tokens;
        this.allow_list = allow_list;
        this.deny_list = deny_list;
    }
    static fromAmino(_, isClassic) {
        _;
        isClassic;
        throw new Error('Amino not supported');
    }
    toAmino(_) {
        _;
        throw new Error('Amino not supported');
    }
    static fromData(data, isClassic) {
        return new StakeAuthorization((0, authz_1.authorizationTypeFromJSON)(data.authorization_type), data.max_tokens ? Coin_1.Coin.fromProto(data.max_tokens) : undefined, data.allow_list
            ? StakeAuthorizationValidators.fromData(data.allow_list, isClassic)
            : undefined, data.deny_list
            ? StakeAuthorizationValidators.fromData(data.deny_list, isClassic)
            : undefined);
    }
    toData(isClassic) {
        const { max_tokens, allow_list, deny_list, authorization_type } = this;
        return {
            '@type': '/cosmos.staking.v1beta1.StakeAuthorization',
            authorization_type: (0, authz_1.authorizationTypeToJSON)(authorization_type),
            max_tokens: max_tokens === null || max_tokens === void 0 ? void 0 : max_tokens.toData(),
            allow_list: allow_list === null || allow_list === void 0 ? void 0 : allow_list.toData(isClassic),
            deny_list: deny_list === null || deny_list === void 0 ? void 0 : deny_list.toData(isClassic),
        };
    }
    static fromProto(proto, isClassic) {
        return new StakeAuthorization(proto.authorizationType, proto.maxTokens ? Coin_1.Coin.fromProto(proto.maxTokens) : undefined, proto.allowList
            ? StakeAuthorizationValidators.fromProto(proto.allowList, isClassic)
            : undefined, proto.denyList
            ? StakeAuthorizationValidators.fromProto(proto.denyList, isClassic)
            : undefined);
    }
    toProto(isClassic) {
        const { max_tokens, allow_list, deny_list, authorization_type } = this;
        return authz_1.StakeAuthorization.fromPartial({
            allowList: allow_list === null || allow_list === void 0 ? void 0 : allow_list.toProto(isClassic),
            authorizationType: authorization_type,
            denyList: deny_list === null || deny_list === void 0 ? void 0 : deny_list.toProto(isClassic),
            maxTokens: max_tokens === null || max_tokens === void 0 ? void 0 : max_tokens.toProto(),
        });
    }
    packAny(isClassic) {
        return any_1.Any.fromPartial({
            typeUrl: '/cosmos.staking.v1beta1.StakeAuthorization',
            value: authz_1.StakeAuthorization.encode(this.toProto(isClassic)).finish(),
        });
    }
    static unpackAny(msgAny, isClassic) {
        return StakeAuthorization.fromProto(authz_1.StakeAuthorization.decode(msgAny.value), isClassic);
    }
}
exports.StakeAuthorization = StakeAuthorization;
class StakeAuthorizationValidators extends json_1.JSONSerializable {
    constructor(address) {
        super();
        this.address = address;
    }
    static fromAmino(_, isClassic) {
        _;
        isClassic;
        throw new Error('Amino not supported');
    }
    toAmino(_) {
        _;
        throw new Error('Amino not supported');
    }
    static fromData(data, _) {
        _;
        return new StakeAuthorizationValidators(data.address);
    }
    toData(_) {
        _;
        return {
            address: this.address,
        };
    }
    static fromProto(proto, _) {
        _;
        return new StakeAuthorizationValidators(proto.address);
    }
    toProto(_) {
        _;
        return authz_1.StakeAuthorization_Validators.fromPartial({
            address: this.address,
        });
    }
}
exports.StakeAuthorizationValidators = StakeAuthorizationValidators;
(function (StakeAuthorization) {
    StakeAuthorization.Type = authz_1.AuthorizationType;
})(StakeAuthorization = exports.StakeAuthorization || (exports.StakeAuthorization = {}));
//# sourceMappingURL=StakeAuthorization.js.map