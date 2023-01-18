"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConsensusStateWithHeight = void 0;
const client_1 = require("@terra-money/terra.proto/ibc/core/client/v1/client");
const Height_1 = require("./Height");
const json_1 = require("../../../../util/json");
/**
 * ConsensusStateWithHeight defines a consensus state with an additional height field.
 */
class ConsensusStateWithHeight extends json_1.JSONSerializable {
    /**
     * @param height consensus state height
     * @param consensus_state consensus state
     */
    constructor(height, consensus_state) {
        super();
        this.height = height;
        this.consensus_state = consensus_state;
    }
    static fromAmino(data) {
        const { height, consensus_state } = data;
        return new ConsensusStateWithHeight(height ? Height_1.Height.fromAmino(height) : undefined, consensus_state);
    }
    toAmino() {
        const { height, consensus_state } = this;
        const res = {
            height: height ? height.toAmino() : undefined,
            consensus_state: consensus_state,
        };
        return res;
    }
    static fromData(data) {
        const { height, consensus_state } = data;
        return new ConsensusStateWithHeight(height ? Height_1.Height.fromData(height) : undefined, consensus_state);
    }
    toData() {
        const { height, consensus_state } = this;
        const res = {
            height: height ? height.toData() : undefined,
            consensus_state,
        };
        return res;
    }
    static fromProto(proto) {
        return new ConsensusStateWithHeight(proto.height ? Height_1.Height.fromProto(proto.height) : undefined, proto.consensusState);
    }
    toProto() {
        const { height, consensus_state } = this;
        return client_1.ConsensusStateWithHeight.fromPartial({
            height: height ? height.toProto() : undefined,
            consensusState: consensus_state,
        });
    }
}
exports.ConsensusStateWithHeight = ConsensusStateWithHeight;
//# sourceMappingURL=ConsensusStateWithHeight.js.map