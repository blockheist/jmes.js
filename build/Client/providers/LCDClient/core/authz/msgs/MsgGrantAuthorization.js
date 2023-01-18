"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MsgGrantAuthorization = void 0;
const json_1 = require("../../../util/json");
const authorizations_1 = require("../authorizations");
const tx_1 = require("@terra-money/terra.proto/cosmos/authz/v1beta1/tx");
const any_1 = require("@terra-money/terra.proto/google/protobuf/any");
class MsgGrantAuthorization extends json_1.JSONSerializable {
    /**
     * @param depositor depositor's account address
     * @param amount coins to fund the community pool
     */
    constructor(granter, grantee, grant) {
        super();
        this.granter = granter;
        this.grantee = grantee;
        this.grant = grant;
    }
    static fromAmino(data, isClassic) {
        const { value: { granter, grantee, grant }, } = data;
        return new MsgGrantAuthorization(granter, grantee, authorizations_1.AuthorizationGrant.fromAmino(grant, isClassic));
    }
    toAmino(isClassic) {
        const { granter, grantee, grant } = this;
        return {
            type: isClassic ? 'msgauth/MsgGrantAuthorization' : 'cosmos-sdk/MsgGrant',
            value: {
                granter,
                grantee,
                grant: grant.toAmino(isClassic),
            },
        };
    }
    static fromData(data, isClassic) {
        const { granter, grantee, grant } = data;
        return new MsgGrantAuthorization(granter, grantee, authorizations_1.AuthorizationGrant.fromData(grant, isClassic));
    }
    toData(isClassic) {
        const { granter, grantee, grant } = this;
        return {
            '@type': '/cosmos.authz.v1beta1.MsgGrant',
            granter,
            grantee,
            grant: grant.toData(isClassic),
        };
    }
    static fromProto(data, isClassic) {
        return new MsgGrantAuthorization(data.granter, data.grantee, authorizations_1.AuthorizationGrant.fromProto(data.grant, isClassic));
    }
    toProto(isClassic) {
        const { grant, granter, grantee } = this;
        return tx_1.MsgGrant.fromPartial({
            grant: grant.toProto(isClassic),
            grantee,
            granter,
        });
    }
    packAny(isClassic) {
        return any_1.Any.fromPartial({
            typeUrl: '/cosmos.authz.v1beta1.MsgGrant',
            value: tx_1.MsgGrant.encode(this.toProto(isClassic)).finish(),
        });
    }
    static unpackAny(msgAny, isClassic) {
        return MsgGrantAuthorization.fromProto(tx_1.MsgGrant.decode(msgAny.value), isClassic);
    }
}
exports.MsgGrantAuthorization = MsgGrantAuthorization;
//# sourceMappingURL=MsgGrantAuthorization.js.map