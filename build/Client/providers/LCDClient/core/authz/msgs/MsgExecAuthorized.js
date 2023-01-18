"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MsgExecAuthorized = void 0;
const json_1 = require("../../../util/json");
const Msg_1 = require("../../Msg");
const tx_1 = require("@terra-money/terra.proto/cosmos/authz/v1beta1/tx");
const any_1 = require("@terra-money/terra.proto/google/protobuf/any");
class MsgExecAuthorized extends json_1.JSONSerializable {
    /**
     * @param grantee authorization grantee
     * @param msgs list of messages to execute
     */
    constructor(grantee, msgs) {
        super();
        this.grantee = grantee;
        this.msgs = msgs;
    }
    static fromAmino(data, isClassic) {
        const { value: { grantee, msgs }, } = data;
        return new MsgExecAuthorized(grantee, msgs.map(x => Msg_1.Msg.fromAmino(x, isClassic)));
    }
    toAmino(isClassic) {
        const { grantee, msgs } = this;
        return {
            type: isClassic ? 'msgauth/MsgExecAuthorized' : 'cosmos-sdk/MsgExec',
            value: {
                grantee,
                msgs: msgs.map(msg => {
                    return msg.toAmino(isClassic);
                }),
            },
        };
    }
    static fromData(proto, isClassic) {
        const { grantee, msgs } = proto;
        return new MsgExecAuthorized(grantee, msgs.map(x => Msg_1.Msg.fromData(x, isClassic)));
    }
    toData(isClassic) {
        const { grantee, msgs } = this;
        return {
            '@type': '/cosmos.authz.v1beta1.MsgExec',
            grantee,
            msgs: msgs.map(msg => msg.toData(isClassic)),
        };
    }
    static fromProto(proto, isClassic) {
        return new MsgExecAuthorized(proto.grantee, proto.msgs.map(x => Msg_1.Msg.fromProto(x, isClassic)));
    }
    toProto(isClassic) {
        const { grantee, msgs } = this;
        return tx_1.MsgExec.fromPartial({
            grantee,
            msgs: msgs.map(m => m.packAny(isClassic)),
        });
    }
    packAny(isClassic) {
        return any_1.Any.fromPartial({
            typeUrl: '/cosmos.authz.v1beta1.MsgExec',
            value: tx_1.MsgExec.encode(this.toProto(isClassic)).finish(),
        });
    }
    static unpackAny(msgAny, isClassic) {
        return MsgExecAuthorized.fromProto(tx_1.MsgExec.decode(msgAny.value), isClassic);
    }
}
exports.MsgExecAuthorized = MsgExecAuthorized;
//# sourceMappingURL=MsgExecAuthorized.js.map