"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Params = void 0;
const host_1 = require("@terra-money/terra.proto/ibc/applications/interchain_accounts/host/v1/host");
const json_1 = require("../../../../../util/json");
/**
 *  Params defines the set of on-chain interchain accounts parameters.
 *  The following parameters may be used to disable the host submodule.
 */
class Params extends json_1.JSONSerializable {
    /**
     * @param host_enabled host_enabled enables or disables the host submodule.
     */
    constructor(host_enabled, allowed_messages) {
        super();
        this.host_enabled = host_enabled;
        this.allowed_messages = allowed_messages;
    }
    static fromAmino(data) {
        const { host_enabled, allowed_messages } = data;
        return new Params(host_enabled, allowed_messages);
    }
    toAmino() {
        const { host_enabled, allowed_messages } = this;
        const res = {
            host_enabled: host_enabled,
            allowed_messages: allowed_messages,
        };
        return res;
    }
    static fromData(data) {
        const { host_enabled, allowed_messages } = data;
        return new Params(host_enabled, allowed_messages);
    }
    toData() {
        const { host_enabled, allowed_messages } = this;
        const res = {
            host_enabled,
            allowed_messages,
        };
        return res;
    }
    static fromProto(proto) {
        return new Params(proto.hostEnabled, proto.allowMessages);
    }
    toProto() {
        const { host_enabled, allowed_messages } = this;
        return host_1.Params.fromPartial({
            hostEnabled: host_enabled,
            allowMessages: allowed_messages,
        });
    }
}
exports.Params = Params;
//# sourceMappingURL=Params.js.map