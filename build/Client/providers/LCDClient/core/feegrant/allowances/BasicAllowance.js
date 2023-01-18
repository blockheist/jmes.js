"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BasicAllowance = void 0;
const json_1 = require("../../../util/json");
const Coins_1 = require("../../Coins");
const any_1 = require("@terra-money/terra.proto/google/protobuf/any");
const feegrant_1 = require("@terra-money/terra.proto/cosmos/feegrant/v1beta1/feegrant");
/**
 * BasicAllowance implements Allowance with a one-time grant of tokens
 * that optionally expires. The grantee can use up to SpendLimit to cover fees.
 */
class BasicAllowance extends json_1.JSONSerializable {
    /**
     * @param spend_limit spend_limit allowed to be spent as fee
     * @param expiration allowance's expiration
     */
    constructor(spend_limit, expiration) {
        super();
        this.expiration = expiration;
        let hasNotPositive = false;
        if (spend_limit) {
            this.spend_limit = new Coins_1.Coins(spend_limit);
            this.spend_limit.map(c => {
                // isPositive() from decimal.js returns true when the amount is 0.
                // but Coins.IsAllPositive() from cosmos-sdk will return false in same case.
                // so we use lessThanorEquenTo(0) instead of isPositive() == false
                if (c.amount.lessThanOrEqualTo(0)) {
                    hasNotPositive = true;
                }
            });
        }
        if (spend_limit && hasNotPositive) {
            throw Error('spend_limit must be positive');
        }
    }
    static fromAmino(data, _) {
        _;
        const { value: { spend_limit, expiration }, } = data;
        return new BasicAllowance(spend_limit ? Coins_1.Coins.fromAmino(spend_limit) : undefined, expiration ? new Date(expiration) : undefined);
        new BasicAllowance('');
    }
    toAmino(isClassic) {
        const { spend_limit, expiration } = this;
        return {
            type: isClassic ? 'feegrant/BasicAllowance' : 'cosmos-sdk/BasicAllowance',
            value: {
                spend_limit: (spend_limit === null || spend_limit === void 0 ? void 0 : spend_limit.toAmino()) || undefined,
                expiration: (expiration === null || expiration === void 0 ? void 0 : expiration.toISOString().replace(/\.000Z$/, 'Z')) || undefined,
            },
        };
    }
    static fromData(proto, _) {
        _;
        const { spend_limit, expiration } = proto;
        return new BasicAllowance(spend_limit ? Coins_1.Coins.fromData(spend_limit) : undefined, expiration ? new Date(expiration) : undefined);
    }
    toData(_) {
        _;
        const { spend_limit, expiration } = this;
        return {
            '@type': '/cosmos.feegrant.v1beta1.BasicAllowance',
            spend_limit: (spend_limit === null || spend_limit === void 0 ? void 0 : spend_limit.toData()) || undefined,
            expiration: (expiration === null || expiration === void 0 ? void 0 : expiration.toISOString().replace(/\.000Z$/, 'Z')) || undefined,
        };
    }
    static fromProto(proto, _) {
        _;
        return new BasicAllowance(Coins_1.Coins.fromProto(proto.spendLimit), proto.expiration ? proto.expiration : undefined);
    }
    toProto(_) {
        _;
        const { spend_limit, expiration } = this;
        return feegrant_1.BasicAllowance.fromPartial({
            expiration,
            spendLimit: (spend_limit === null || spend_limit === void 0 ? void 0 : spend_limit.toProto()) || undefined,
        });
    }
    packAny(isClassic) {
        return any_1.Any.fromPartial({
            typeUrl: '/cosmos.feegrant.v1beta1.BasicAllowance',
            value: feegrant_1.BasicAllowance.encode(this.toProto(isClassic)).finish(),
        });
    }
    static unpackAny(msgAny, isClassic) {
        return BasicAllowance.fromProto(feegrant_1.BasicAllowance.decode(msgAny.value), isClassic);
    }
}
exports.BasicAllowance = BasicAllowance;
//# sourceMappingURL=BasicAllowance.js.map