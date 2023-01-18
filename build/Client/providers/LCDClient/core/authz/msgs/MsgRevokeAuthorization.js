"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MsgRevokeAuthorization = void 0;
const json_1 = require("../../../util/json");
const tx_1 = require("@terra-money/terra.proto/cosmos/authz/v1beta1/tx");
const any_1 = require("@terra-money/terra.proto/google/protobuf/any");
class MsgRevokeAuthorization extends json_1.JSONSerializable {
    /**
     * @param granter authorization granter
     * @param grantee authorization grantee
     * @param authorization_msg_type type of message to revoke
     */
    constructor(granter, grantee, msg_type_url) {
        super();
        this.granter = granter;
        this.grantee = grantee;
        this.msg_type_url = msg_type_url;
    }
    static fromAmino(data, _) {
        _;
        const { value: { granter, grantee, msg_type_url }, } = data;
        return new MsgRevokeAuthorization(granter, grantee, msg_type_url);
    }
    toAmino(isClassic) {
        const { granter, grantee, msg_type_url } = this;
        return {
            type: isClassic
                ? 'msgauth/MsgRevokeAuthorization'
                : 'cosmos-sdk/MsgRevoke',
            value: {
                granter,
                grantee,
                msg_type_url,
            },
        };
    }
    static fromData(data, _) {
        _;
        const { granter, grantee, msg_type_url } = data;
        return new MsgRevokeAuthorization(granter, grantee, msg_type_url);
    }
    toData(_) {
        _;
        const { granter, grantee, msg_type_url } = this;
        return {
            '@type': '/cosmos.authz.v1beta1.MsgRevoke',
            granter,
            grantee,
            msg_type_url,
        };
    }
    static fromProto(proto, _) {
        _;
        return new MsgRevokeAuthorization(proto.granter, proto.grantee, proto.msgTypeUrl);
    }
    toProto(_) {
        _;
        const { granter, grantee, msg_type_url } = this;
        return tx_1.MsgRevoke.fromPartial({
            grantee,
            granter,
            msgTypeUrl: msg_type_url,
        });
    }
    packAny(isClassic) {
        return any_1.Any.fromPartial({
            typeUrl: '/cosmos.authz.v1beta1.MsgRevoke',
            value: tx_1.MsgRevoke.encode(this.toProto(isClassic)).finish(),
        });
    }
    static unpackAny(msgAny, isClassic) {
        return MsgRevokeAuthorization.fromProto(tx_1.MsgRevoke.decode(msgAny.value), isClassic);
    }
}
exports.MsgRevokeAuthorization = MsgRevokeAuthorization;
//# sourceMappingURL=MsgRevokeAuthorization.js.map