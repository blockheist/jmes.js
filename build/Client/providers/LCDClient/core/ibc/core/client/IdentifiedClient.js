"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IdentifiedClientState = void 0;
const client_1 = require("@terra-money/terra.proto/ibc/core/client/v1/client");
const json_1 = require("../../../../util/json");
/**
 * IdentifiedClientState defines a client state with an additional client identifier field
 */
class IdentifiedClientState extends json_1.JSONSerializable {
    /**
     * @param client_id client identifier
     * @param client_state client state
     */
    constructor(client_id, client_state) {
        super();
        this.client_id = client_id;
        this.client_state = client_state;
    }
    static fromAmino(data) {
        const { client_id, client_state } = data;
        return new IdentifiedClientState(client_id, client_state);
    }
    toAmino() {
        const { client_id, client_state } = this;
        const res = {
            client_id: client_id,
            client_state: client_state,
        };
        return res;
    }
    static fromData(data) {
        const { client_id, client_state } = data;
        return new IdentifiedClientState(client_id, client_state);
    }
    toData() {
        const { client_id, client_state } = this;
        const res = {
            client_id,
            client_state,
        };
        return res;
    }
    static fromProto(proto) {
        return new IdentifiedClientState(proto.clientId, proto.clientState);
    }
    toProto() {
        const { client_id, client_state } = this;
        return client_1.IdentifiedClientState.fromPartial({
            clientId: client_id,
            clientState: client_state,
        });
    }
}
exports.IdentifiedClientState = IdentifiedClientState;
//# sourceMappingURL=IdentifiedClient.js.map