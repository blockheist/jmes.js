"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientConsensusStates = void 0;
const client_1 = require("@terra-money/terra.proto/ibc/core/client/v1/client");
const json_1 = require("../../../../util/json");
const ConsensusStateWithHeight_1 = require("./ConsensusStateWithHeight");
/**
 * ClientConsensusStates defines all the stored consensus states for a given client/
 */
class ClientConsensusStates extends json_1.JSONSerializable {
    /**
     * @param client_id client identifier
     * @param consensus_states consensus states and their heights associated with the client
     */
    constructor(client_id, consensus_states) {
        super();
        this.client_id = client_id;
        this.consensus_states = consensus_states;
    }
    static fromAmino(data) {
        const { client_id, consensus_states } = data;
        return new ClientConsensusStates(client_id, consensus_states.map(state => ConsensusStateWithHeight_1.ConsensusStateWithHeight.fromAmino(state)));
    }
    toAmino() {
        const { client_id, consensus_states } = this;
        const res = {
            client_id: client_id,
            consensus_states: consensus_states.map(state => state.toAmino()),
        };
        return res;
    }
    static fromData(data) {
        const { client_id, consensus_states } = data;
        return new ClientConsensusStates(client_id, consensus_states.map(state => ConsensusStateWithHeight_1.ConsensusStateWithHeight.fromData(state)));
    }
    toData() {
        const { client_id, consensus_states } = this;
        const res = {
            client_id,
            consensus_states: consensus_states.map(state => state.toData()),
        };
        return res;
    }
    static fromProto(proto) {
        return new ClientConsensusStates(proto.clientId, proto.consensusStates.map(state => ConsensusStateWithHeight_1.ConsensusStateWithHeight.fromProto(state)));
    }
    toProto() {
        const { client_id, consensus_states } = this;
        return client_1.ClientConsensusStates.fromPartial({
            clientId: client_id,
            consensusStates: consensus_states.map(state => state.toProto()),
        });
    }
}
exports.ClientConsensusStates = ClientConsensusStates;
//# sourceMappingURL=ClientConsensusStates.js.map