"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MsgRevokeAllowance = void 0;
const json_1 = require("../../../util/json");
const any_1 = require("@terra-money/terra.proto/google/protobuf/any");
const tx_1 = require("@terra-money/terra.proto/cosmos/feegrant/v1beta1/tx");
/**
 * MsgRevokeAllowance remove permission any existing Allowance from Granter to Grantee.
 */
class MsgRevokeAllowance extends json_1.JSONSerializable {
    /**
     *
     * @param granter granter's account address
     * @param grantee grantee's account address
     */
    constructor(granter, grantee) {
        super();
        this.granter = granter;
        this.grantee = grantee;
    }
    static fromAmino(data, _) {
        _;
        const { value: { granter, grantee }, } = data;
        return new MsgRevokeAllowance(granter, grantee);
    }
    toAmino(isClassic) {
        const { granter, grantee } = this;
        return {
            type: isClassic
                ? 'feegrant/MsgRevokeAllowance'
                : 'cosmos-sdk/MsgRevokeAllowance',
            value: {
                granter,
                grantee,
            },
        };
    }
    static fromData(proto, _) {
        _;
        const { granter, grantee } = proto;
        return new MsgRevokeAllowance(granter, grantee);
    }
    toData(_) {
        _;
        const { granter, grantee } = this;
        return {
            '@type': '/cosmos.feegrant.v1beta1.MsgRevokeAllowance',
            granter,
            grantee,
        };
    }
    static fromProto(proto, _) {
        _;
        return new MsgRevokeAllowance(proto.granter, proto.grantee);
    }
    toProto(_) {
        _;
        const { granter, grantee } = this;
        return tx_1.MsgRevokeAllowance.fromPartial({
            grantee,
            granter,
        });
    }
    packAny(isClassic) {
        return any_1.Any.fromPartial({
            typeUrl: '/cosmos.feegrant.v1beta1.MsgRevokeAllowance',
            value: tx_1.MsgRevokeAllowance.encode(this.toProto(isClassic)).finish(),
        });
    }
    static unpackAny(msgAny, isClassic) {
        return MsgRevokeAllowance.fromProto(tx_1.MsgRevokeAllowance.decode(msgAny.value), isClassic);
    }
}
exports.MsgRevokeAllowance = MsgRevokeAllowance;
//# sourceMappingURL=MsgRevokeAllowance.js.map