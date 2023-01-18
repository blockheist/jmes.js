"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MsgGrantAllowance = void 0;
const json_1 = require("../../../util/json");
const allowances_1 = require("../allowances");
const any_1 = require("@terra-money/terra.proto/google/protobuf/any");
const tx_1 = require("@terra-money/terra.proto/cosmos/feegrant/v1beta1/tx");
/**
 * MsgGrantAllowance adds permission for Grantee to spend up to Allowance
 * of fees from the account of Granter.
 */
class MsgGrantAllowance extends json_1.JSONSerializable {
    /**
     *
     * @param granter granter's account address
     * @param grantee grantee's account address
     * @param allowance allowance willing to grant
     */
    constructor(granter, grantee, allowance) {
        super();
        this.granter = granter;
        this.grantee = grantee;
        this.allowance = allowance;
    }
    static fromAmino(data, isClassic) {
        const { value: { granter, grantee, allowance }, } = data;
        return new MsgGrantAllowance(granter, grantee, allowances_1.Allowance.fromAmino(allowance, isClassic));
    }
    toAmino(isClassic) {
        const { granter, grantee, allowance } = this;
        return {
            type: isClassic
                ? 'feegrant/MsgGrantAllowance'
                : 'cosmos-sdk/MsgGrantAllowance',
            value: {
                granter,
                grantee,
                allowance: allowance.toAmino(isClassic),
            },
        };
    }
    static fromData(data, isClassic) {
        const { granter, grantee, allowance } = data;
        return new MsgGrantAllowance(granter, grantee, allowances_1.Allowance.fromData(allowance, isClassic));
    }
    toData(isClassic) {
        const { granter, grantee, allowance } = this;
        return {
            '@type': '/cosmos.feegrant.v1beta1.MsgGrantAllowance',
            granter,
            grantee,
            allowance: allowance.toData(isClassic),
        };
    }
    static fromProto(proto, isClassic) {
        return new MsgGrantAllowance(proto.granter, proto.grantee, allowances_1.Allowance.fromProto(proto.allowance, isClassic));
    }
    toProto(isClassic) {
        const { granter, grantee, allowance } = this;
        return tx_1.MsgGrantAllowance.fromPartial({
            allowance: allowance.packAny(isClassic),
            grantee,
            granter,
        });
    }
    packAny(isClassic) {
        return any_1.Any.fromPartial({
            typeUrl: '/cosmos.feegrant.v1beta1.MsgGrantAllowance',
            value: tx_1.MsgGrantAllowance.encode(this.toProto(isClassic)).finish(),
        });
    }
    static unpackAny(msgAny, isClassic) {
        return MsgGrantAllowance.fromProto(tx_1.MsgGrantAllowance.decode(msgAny.value), isClassic);
    }
}
exports.MsgGrantAllowance = MsgGrantAllowance;
//# sourceMappingURL=MsgGrantAllowance.js.map