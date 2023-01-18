"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MsgCreateClient = void 0;
const json_1 = require("../../../../util/json");
const any_1 = require("@terra-money/terra.proto/google/protobuf/any");
const tx_1 = require("@terra-money/terra.proto/ibc/core/client/v1/tx");
/**
 * MsgCreateClient defines a message to create an IBC client
 */
class MsgCreateClient extends json_1.JSONSerializable {
    /**
     * @param client_state light client state
     * @param consensus_state consensus state associated with the client that corresponds to a given
     * @param signer signer address
     */
    constructor(client_state, consensus_state, signer) {
        super();
        this.client_state = client_state;
        this.consensus_state = consensus_state;
        this.signer = signer;
    }
    static fromAmino(_, isClassic) {
        _;
        isClassic;
        throw new Error('Amino not supported');
    }
    toAmino(_) {
        _;
        throw new Error('Amino not supported');
    }
    static fromData(data, _) {
        _;
        const { client_state, consensus_state, signer } = data;
        return new MsgCreateClient(client_state, consensus_state, signer);
    }
    toData(_) {
        _;
        const { client_state, consensus_state, signer } = this;
        return {
            '@type': '/ibc.core.client.v1.MsgCreateClient',
            client_state,
            consensus_state,
            signer,
        };
    }
    static fromProto(proto, _) {
        _;
        return new MsgCreateClient(proto.clientState, proto.consensusState, proto.signer);
    }
    toProto(_) {
        _;
        const { client_state, consensus_state, signer } = this;
        return tx_1.MsgCreateClient.fromPartial({
            clientState: client_state,
            consensusState: consensus_state,
            signer,
        });
    }
    packAny(_) {
        _;
        return any_1.Any.fromPartial({
            typeUrl: '/ibc.core.client.v1.MsgCreateClient',
            value: tx_1.MsgCreateClient.encode(this.toProto()).finish(),
        });
    }
    static unpackAny(msgAny, _) {
        _;
        return MsgCreateClient.fromProto(tx_1.MsgCreateClient.decode(msgAny.value));
    }
}
exports.MsgCreateClient = MsgCreateClient;
//# sourceMappingURL=MsgCreateClient.js.map