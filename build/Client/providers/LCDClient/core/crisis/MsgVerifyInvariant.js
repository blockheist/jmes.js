"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MsgVerifyInvariant = void 0;
const json_1 = require("../../util/json");
const any_1 = require("@terra-money/legacy.proto/google/protobuf/any");
//import { MsgVerifyInvariant as MsgVerifyInvariant_pb } from '@terra-money/legacy.proto/cosmos/crisis/v1beta1/tx';
const tx_1 = require("@terra-money/terra.proto/cosmos/crisis/v1beta1/tx");
/**
 * MsgVerifyInvariant represents a message to verify a particular invariance.
 */
class MsgVerifyInvariant extends json_1.JSONSerializable {
    /**
     * @param sender sender's address
     * @param invariantModuleName module name to verify invariant
     * @param invariantRoute route to verify
     */
    constructor(sender, invariantModuleName, invariantRoute) {
        super();
        this.sender = sender;
        this.invariantModuleName = invariantModuleName;
        this.invariantRoute = invariantRoute;
    }
    static fromAmino(data, _) {
        _;
        const { value: { sender, invariantModuleName, invariantRoute }, } = data;
        return new MsgVerifyInvariant(sender, invariantModuleName, invariantRoute);
    }
    toAmino(_) {
        _;
        throw new Error('MsgVerifyInvarant is not allowed to send');
    }
    static fromData(data, _) {
        _;
        const { sender, invariantModuleName, invariantRoute } = data;
        return new MsgVerifyInvariant(sender, invariantModuleName, invariantRoute);
    }
    toData(_) {
        _;
        const { sender, invariantModuleName, invariantRoute } = this;
        return {
            '@type': '/cosmos.crisis.v1beta1.MsgVerifyInvariant',
            sender,
            invariantModuleName,
            invariantRoute,
        };
    }
    static fromProto(proto, _) {
        _;
        return new MsgVerifyInvariant(proto.sender, proto.invariantModuleName, proto.invariantRoute);
    }
    toProto(_) {
        _;
        throw new Error('MsgVerifyInvarant is not allowed to send');
    }
    packAny(isClassic) {
        return any_1.Any.fromPartial({
            typeUrl: '/cosmos.crisis.v1beta1.MsgVerifyInvariant',
            value: tx_1.MsgVerifyInvariant.encode(this.toProto(isClassic)).finish(),
        });
    }
    static unpackAny(msgAny, isClassic) {
        return MsgVerifyInvariant.fromProto(tx_1.MsgVerifyInvariant.decode(msgAny.value), isClassic);
    }
}
exports.MsgVerifyInvariant = MsgVerifyInvariant;
//# sourceMappingURL=MsgVerifyInvariant.js.map