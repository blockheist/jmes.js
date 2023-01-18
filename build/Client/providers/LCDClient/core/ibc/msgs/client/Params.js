"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Params = void 0;
const client_1 = require("@terra-money/terra.proto/ibc/core/client/v1/client");
const json_1 = require("../../../../util/json");
/**
 * Params defines the set of IBC light client parameters.
 */
class Params extends json_1.JSONSerializable {
    /**
     * @param allowed_clients allowed_clients defines the list of allowed client state types.
     */
    constructor(allowed_clients) {
        super();
        this.allowed_clients = allowed_clients;
    }
    static fromAmino(data) {
        const { allowed_clients } = data;
        return new Params(allowed_clients);
    }
    toAmino() {
        const { allowed_clients } = this;
        const res = {
            allowed_clients: allowed_clients,
        };
        return res;
    }
    static fromData(data) {
        const { allowed_clients } = data;
        return new Params(allowed_clients);
    }
    toData() {
        const { allowed_clients } = this;
        const res = {
            allowed_clients,
        };
        return res;
    }
    static fromProto(proto) {
        return new Params(proto.allowedClients);
    }
    toProto() {
        const { allowed_clients } = this;
        return client_1.Params.fromPartial({
            allowedClients: allowed_clients,
        });
    }
}
exports.Params = Params;
//# sourceMappingURL=Params.js.map