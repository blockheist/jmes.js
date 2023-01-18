"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MsgUpgradeClient = void 0;
const json_1 = require("../../../../util/json");
const any_1 = require("@terra-money/terra.proto/google/protobuf/any");
const tx_1 = require("@terra-money/terra.proto/ibc/core/client/v1/tx");
/**
 * MsgUpgradeClient defines an sdk.Msg to upgrade an IBC client to a new client state
 */
class MsgUpgradeClient extends json_1.JSONSerializable {
    /**
     * @param client_id client unique identifier
     * @param client_state  upgraded client state
     * @param consensus_state upgraded consensus state, only contains enough information to serve as a basis of trust in update logic
     * @param proof_upgrade_client proof that old chain committed to new client
     * @param proof_upgrade_consensus_state  proof that old chain committed to new consensus state
     * @param signer signer address
     */
    constructor(client_id, client_state, consensus_state, proof_upgrade_client, proof_upgrade_consensus_state, signer) {
        super();
        this.client_id = client_id;
        this.client_state = client_state;
        this.consensus_state = consensus_state;
        this.proof_upgrade_client = proof_upgrade_client;
        this.proof_upgrade_consensus_state = proof_upgrade_consensus_state;
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
        const { client_id, client_state, consensus_state, proof_upgrade_client, proof_upgrade_consensus_state, signer, } = data;
        return new MsgUpgradeClient(client_id, client_state, consensus_state, proof_upgrade_client, proof_upgrade_consensus_state, signer);
    }
    toData(_) {
        _;
        const { client_id, client_state, consensus_state, proof_upgrade_client, proof_upgrade_consensus_state, signer, } = this;
        return {
            '@type': '/ibc.core.client.v1.MsgUpgradeClient',
            client_id,
            client_state,
            consensus_state,
            proof_upgrade_client,
            proof_upgrade_consensus_state,
            signer,
        };
    }
    static fromProto(proto, _) {
        _;
        return new MsgUpgradeClient(proto.clientId, proto.clientState, proto.consensusState, Buffer.from(proto.proofUpgradeClient).toString('base64'), Buffer.from(proto.proofUpgradeConsensusState).toString('base64'), proto.signer);
    }
    toProto(_) {
        _;
        const { client_id, client_state, consensus_state, proof_upgrade_client, proof_upgrade_consensus_state, signer, } = this;
        return tx_1.MsgUpgradeClient.fromPartial({
            clientId: client_id,
            clientState: client_state,
            consensusState: consensus_state,
            proofUpgradeClient: Buffer.from(proof_upgrade_client, 'base64'),
            proofUpgradeConsensusState: Buffer.from(proof_upgrade_consensus_state, 'base64'),
            signer: signer,
        });
    }
    packAny(_) {
        _;
        return any_1.Any.fromPartial({
            typeUrl: '/ibc.core.client.v1.MsgUpgradeClient',
            value: tx_1.MsgUpgradeClient.encode(this.toProto()).finish(),
        });
    }
    static unpackAny(msgAny, _) {
        _;
        return MsgUpgradeClient.fromProto(tx_1.MsgUpgradeClient.decode(msgAny.value));
    }
}
exports.MsgUpgradeClient = MsgUpgradeClient;
//# sourceMappingURL=MsgUpgradeClient.js.map