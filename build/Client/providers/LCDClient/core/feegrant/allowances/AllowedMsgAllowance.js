"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AllowedMsgAllowance = void 0;
const json_1 = require("../../../util/json");
const BasicAllowance_1 = require("./BasicAllowance");
const PeriodicAllowance_1 = require("./PeriodicAllowance");
const any_1 = require("@terra-money/terra.proto/google/protobuf/any");
const feegrant_1 = require("@terra-money/terra.proto/cosmos/feegrant/v1beta1/feegrant");
/**
 * AllowedMsgAllowance creates allowance only for specified message types.
 */
class AllowedMsgAllowance extends json_1.JSONSerializable {
    /**
     * @param allowance any of basic and periodic fee allowance.
     * @param allowed_messages the messages for which the grantee has the access.
     */
    constructor(allowance, allowed_messages) {
        super();
        this.allowance = allowance;
        this.allowed_messages = allowed_messages;
    }
    static fromAmino(data, isClassic) {
        const { value: { allowance, allowed_messages }, } = data;
        return new AllowedMsgAllowance(allowance.type === 'feegrant/BasicAllowance' ||
            allowance.type === 'cosmos-sdk/BasicAllowance'
            ? BasicAllowance_1.BasicAllowance.fromAmino(allowance, isClassic)
            : PeriodicAllowance_1.PeriodicAllowance.fromAmino(allowance, isClassic), allowed_messages);
    }
    toAmino(isClassic) {
        const { allowance, allowed_messages } = this;
        return {
            type: isClassic
                ? 'feegrant/AllowedMsgAllowance'
                : 'cosmos-sdk/AllowedMsgAllowance',
            value: {
                allowance: allowance.toAmino(isClassic),
                allowed_messages,
            },
        };
    }
    static fromData(proto, _) {
        _;
        const { allowance, allowed_messages } = proto;
        return new AllowedMsgAllowance(allowance['@type'] === '/cosmos.feegrant.v1beta1.BasicAllowance'
            ? BasicAllowance_1.BasicAllowance.fromData(allowance)
            : PeriodicAllowance_1.PeriodicAllowance.fromData(allowance), allowed_messages);
    }
    toData(_) {
        _;
        const { allowance, allowed_messages } = this;
        return {
            '@type': '/cosmos.feegrant.v1beta1.AllowedMsgAllowance',
            allowance: allowance.toData(),
            allowed_messages,
        };
    }
    static fromProto(proto, isClassic) {
        const allowance = proto.allowance;
        return new AllowedMsgAllowance((allowance === null || allowance === void 0 ? void 0 : allowance.typeUrl) === '/cosmos.feegrant.v1beta1.BasicAllowance'
            ? BasicAllowance_1.BasicAllowance.unpackAny(allowance, isClassic)
            : PeriodicAllowance_1.PeriodicAllowance.unpackAny(allowance, isClassic), proto.allowedMessages);
    }
    toProto(isClassic) {
        const { allowance, allowed_messages } = this;
        return feegrant_1.AllowedMsgAllowance.fromPartial({
            allowance: allowance.packAny(isClassic),
            allowedMessages: allowed_messages,
        });
    }
    packAny(isClassic) {
        return any_1.Any.fromPartial({
            typeUrl: '/cosmos.feegrant.v1beta1.AllowedMsgAllowance',
            value: feegrant_1.AllowedMsgAllowance.encode(this.toProto(isClassic)).finish(),
        });
    }
    static unpackAny(msgAny, isClassic) {
        return AllowedMsgAllowance.fromProto(feegrant_1.AllowedMsgAllowance.decode(msgAny.value), isClassic);
    }
}
exports.AllowedMsgAllowance = AllowedMsgAllowance;
//# sourceMappingURL=AllowedMsgAllowance.js.map