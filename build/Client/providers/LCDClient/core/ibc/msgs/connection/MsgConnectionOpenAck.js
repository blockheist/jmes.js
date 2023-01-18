"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MsgConnectionOpenAck = void 0;
const json_1 = require("../../../../util/json");
const any_1 = require("@terra-money/terra.proto/google/protobuf/any");
const Version_1 = require("../../core/connection/Version");
const tx_1 = require("@terra-money/terra.proto/ibc/core/connection/v1/tx");
const Height_1 = require("../../core/client/Height");
/**
 * MsgConnectionOpenAck defines a msg sent by a Relayer to Chain A to
 * acknowledge the change of connection state to TRYOPEN on Chain B.
 */
class MsgConnectionOpenAck extends json_1.JSONSerializable {
    /**
     * @param connection_id
     * @param counterparty_connection_id
     * @param version
     * @param client_state
     * @param proof_height proof of the initialization the connection on Chain B: `UNITIALIZED -> TRYOPEN`
     * @param proof_try proof of client state included in message
     * @param proof_client proof of client consensus state
     * @param proof_consensus
     * @param consenesus_height
     * @param signer signer address
     */
    constructor(connection_id, counterparty_connection_id, version, client_state, proof_height, proof_try, proof_client, proof_consensus, consensus_height, signer) {
        super();
        this.connection_id = connection_id;
        this.counterparty_connection_id = counterparty_connection_id;
        this.version = version;
        this.client_state = client_state;
        this.proof_height = proof_height;
        this.proof_try = proof_try;
        this.proof_client = proof_client;
        this.proof_consensus = proof_consensus;
        this.consensus_height = consensus_height;
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
        const { connection_id, counterparty_connection_id, version, client_state, proof_height, proof_try, proof_client, proof_consensus, consensus_height, signer, } = data;
        return new MsgConnectionOpenAck(connection_id, counterparty_connection_id, version ? Version_1.Version.fromData(version) : undefined, client_state, proof_height ? Height_1.Height.fromData(proof_height) : undefined, proof_try, proof_client, proof_consensus, consensus_height ? Height_1.Height.fromData(consensus_height) : undefined, signer);
    }
    toData(_) {
        _;
        const { connection_id, counterparty_connection_id, version, client_state, proof_height, proof_try, proof_client, proof_consensus, consensus_height, signer, } = this;
        return {
            '@type': '/ibc.core.connection.v1.MsgConnectionOpenAck',
            connection_id,
            counterparty_connection_id,
            version: version ? version.toData() : undefined,
            client_state,
            proof_height: proof_height ? proof_height.toData() : undefined,
            proof_try,
            proof_client,
            proof_consensus,
            consensus_height: consensus_height
                ? consensus_height.toData()
                : undefined,
            signer,
        };
    }
    static fromProto(proto, _) {
        _;
        return new MsgConnectionOpenAck(proto.connectionId, proto.counterpartyConnectionId, proto.version ? Version_1.Version.fromProto(proto.version) : undefined, proto.clientState, proto.proofHeight ? Height_1.Height.fromProto(proto.proofHeight) : undefined, Buffer.from(proto.proofTry).toString('base64'), Buffer.from(proto.proofClient).toString('base64'), Buffer.from(proto.proofConsensus).toString('base64'), proto.consensusHeight
            ? Height_1.Height.fromProto(proto.consensusHeight)
            : undefined, proto.signer);
    }
    toProto(_) {
        _;
        const { connection_id, counterparty_connection_id, version, client_state, proof_height, proof_try, proof_client, proof_consensus, consensus_height, signer, } = this;
        return tx_1.MsgConnectionOpenAck.fromPartial({
            connectionId: connection_id,
            counterpartyConnectionId: counterparty_connection_id,
            version: version ? version.toProto() : undefined,
            clientState: client_state,
            proofHeight: proof_height ? proof_height.toProto() : undefined,
            proofTry: Buffer.from(proof_try, 'base64'),
            proofClient: Buffer.from(proof_client, 'base64'),
            proofConsensus: Buffer.from(proof_consensus, 'base64'),
            consensusHeight: consensus_height
                ? consensus_height.toProto()
                : undefined,
            signer,
        });
    }
    packAny(_) {
        _;
        return any_1.Any.fromPartial({
            typeUrl: '/ibc.core.connection.v1.MsgConnectionOpenAck',
            value: tx_1.MsgConnectionOpenAck.encode(this.toProto()).finish(),
        });
    }
    static unpackAny(msgAny, _) {
        _;
        return MsgConnectionOpenAck.fromProto(tx_1.MsgConnectionOpenAck.decode(msgAny.value));
    }
}
exports.MsgConnectionOpenAck = MsgConnectionOpenAck;
//# sourceMappingURL=MsgConnectionOpenAck.js.map