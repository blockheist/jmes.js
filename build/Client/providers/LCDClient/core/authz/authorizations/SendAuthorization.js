"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendAuthorization = void 0;
const json_1 = require("../../../util/json");
const Coins_1 = require("../../Coins");
const authz_1 = require("@terra-money/terra.proto/cosmos/bank/v1beta1/authz");
const any_1 = require("@terra-money/terra.proto/google/protobuf/any");
class SendAuthorization extends json_1.JSONSerializable {
    constructor(spend_limit) {
        super();
        this.spend_limit = new Coins_1.Coins(spend_limit);
    }
    static fromAmino(data, _) {
        _;
        return new SendAuthorization(Coins_1.Coins.fromAmino(data.value.spend_limit));
    }
    toAmino(isClassic) {
        const { spend_limit } = this;
        return {
            type: isClassic
                ? 'msgauth/SendAuthorization'
                : 'cosmos-sdk/SendAuthorization',
            value: {
                spend_limit: spend_limit.toAmino(),
            },
        };
    }
    static fromData(data, _) {
        _;
        return new SendAuthorization(Coins_1.Coins.fromData(data.spend_limit));
    }
    toData(_) {
        _;
        const { spend_limit } = this;
        return {
            '@type': '/cosmos.bank.v1beta1.SendAuthorization',
            spend_limit: spend_limit.toAmino(),
        };
    }
    static fromProto(proto, _) {
        _;
        return new SendAuthorization(Coins_1.Coins.fromProto(proto.spendLimit));
    }
    toProto(_) {
        _;
        return authz_1.SendAuthorization.fromPartial({
            spendLimit: this.spend_limit.toProto(),
        });
    }
    packAny(isClassic) {
        return any_1.Any.fromPartial({
            typeUrl: '/cosmos.bank.v1beta1.SendAuthorization',
            value: authz_1.SendAuthorization.encode(this.toProto(isClassic)).finish(),
        });
    }
    static unpackAny(msgAny, isClassic) {
        return SendAuthorization.fromProto(authz_1.SendAuthorization.decode(msgAny.value), isClassic);
    }
}
exports.SendAuthorization = SendAuthorization;
//# sourceMappingURL=SendAuthorization.js.map