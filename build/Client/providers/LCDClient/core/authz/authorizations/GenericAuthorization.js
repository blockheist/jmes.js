"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenericAuthorization = void 0;
const json_1 = require("../../../util/json");
const authz_1 = require("@terra-money/terra.proto/cosmos/authz/v1beta1/authz");
const any_1 = require("@terra-money/terra.proto/google/protobuf/any");
class GenericAuthorization extends json_1.JSONSerializable {
    constructor(msg) {
        super();
        this.msg = msg;
    }
    static fromAmino(data, _) {
        _;
        return new GenericAuthorization(data.value.msg);
    }
    toAmino(isClassic) {
        const { msg } = this;
        return {
            type: isClassic
                ? 'msgauth/GenericAuthorization'
                : 'cosmos-sdk/GenericAuthorization',
            value: {
                msg,
            },
        };
    }
    static fromData(data, _) {
        _;
        return new GenericAuthorization(data.msg);
    }
    toData(_) {
        _;
        const { msg } = this;
        return {
            '@type': '/cosmos.authz.v1beta1.GenericAuthorization',
            msg,
        };
    }
    static fromProto(data, _) {
        _;
        return new GenericAuthorization(data.msg);
    }
    toProto(_) {
        _;
        return authz_1.GenericAuthorization.fromPartial({
            msg: this.msg,
        });
    }
    packAny(isClassic) {
        return any_1.Any.fromPartial({
            typeUrl: '/cosmos.authz.v1beta1.GenericAuthorization',
            value: authz_1.GenericAuthorization.encode(this.toProto(isClassic)).finish(),
        });
    }
    static unpackAny(msgAny, isClassic) {
        return GenericAuthorization.fromProto(authz_1.GenericAuthorization.decode(msgAny.value), isClassic);
    }
}
exports.GenericAuthorization = GenericAuthorization;
//# sourceMappingURL=GenericAuthorization.js.map