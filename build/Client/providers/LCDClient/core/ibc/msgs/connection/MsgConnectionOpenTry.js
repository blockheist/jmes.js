"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MsgConnectionOpenTry = void 0;
const json_1 = require("../../../../util/json");
const any_1 = require("@terra-money/terra.proto/google/protobuf/any");
const Counterparty_1 = require("../../core/connection/Counterparty");
const Version_1 = require("../../core/connection/Version");
const tx_1 = require("@terra-money/terra.proto/ibc/core/connection/v1/tx");
const long_1 = __importDefault(require("long"));
const Height_1 = require("../../core/client/Height");
/**
 *  MsgConnectionOpenTry defines a msg sent by a Relayer to try to open a connection on Chain B.
 */
class MsgConnectionOpenTry extends json_1.JSONSerializable {
    /**
     * @param client_id in the case of crossing hello's, when both chains call OpenInit, we need the connection identifier of the previous connection in state INIT
     * @param previous_connection_id
     * @param client_state
     * @param counterparty
     * @param delay_period
     * @param counterparty_versions
     * @param proof_height proof of the initialization the connection on Chain A: `UNITIALIZED -> INIT`
     * @param proof_init proof of client state included in message
     * @param proof_client proof of client consensus state
     * @param proof_consensus
     * @param consensus_height
     * @param signer signer address
     */
    constructor(client_id, previous_connection_id, client_state, counterparty, delay_period, counterparty_versions, proof_height, proof_init, proof_client, proof_consensus, consensus_height, signer) {
        super();
        this.client_id = client_id;
        this.previous_connection_id = previous_connection_id;
        this.client_state = client_state;
        this.counterparty = counterparty;
        this.delay_period = delay_period;
        this.counterparty_versions = counterparty_versions;
        this.proof_height = proof_height;
        this.proof_init = proof_init;
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
        const { client_id, previous_connection_id, client_state, counterparty, delay_period, counterparty_versions, proof_height, proof_init, proof_client, proof_consensus, consensus_height, signer, } = data;
        return new MsgConnectionOpenTry(client_id, previous_connection_id, client_state, counterparty ? Counterparty_1.Counterparty.fromData(counterparty) : undefined, Number.parseInt(delay_period), counterparty_versions.length > 0
            ? counterparty_versions.map(cv => Version_1.Version.fromData(cv))
            : [], proof_height ? Height_1.Height.fromData(proof_height) : undefined, Buffer.from(proof_init).toString('base64'), Buffer.from(proof_client).toString('base64'), Buffer.from(proof_consensus).toString('base64'), consensus_height ? Height_1.Height.fromData(consensus_height) : undefined, signer);
    }
    toData(_) {
        _;
        const { client_id, previous_connection_id, client_state, counterparty, delay_period, counterparty_versions, proof_height, proof_init, proof_client, proof_consensus, consensus_height, signer, } = this;
        return {
            '@type': '/ibc.core.connection.v1.MsgConnectionOpenTry',
            client_id,
            previous_connection_id,
            client_state,
            counterparty: counterparty ? counterparty.toData() : undefined,
            delay_period: delay_period.toFixed(),
            counterparty_versions: counterparty_versions.length > 0
                ? counterparty_versions.map(cv => cv.toData())
                : [],
            proof_height: proof_height ? proof_height.toData() : undefined,
            proof_init,
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
        return new MsgConnectionOpenTry(proto.clientId, proto.previousConnectionId, proto.clientState, proto.counterparty
            ? Counterparty_1.Counterparty.fromProto(proto.counterparty)
            : undefined, proto.delayPeriod.toNumber(), proto.counterpartyVersions.length > 0
            ? proto.counterpartyVersions.map(cv => Version_1.Version.fromProto(cv))
            : [], proto.proofHeight ? Height_1.Height.fromProto(proto.proofHeight) : undefined, Buffer.from(proto.proofInit).toString('base64'), Buffer.from(proto.proofClient).toString('base64'), Buffer.from(proto.proofConsensus).toString('base64'), proto.consensusHeight
            ? Height_1.Height.fromProto(proto.consensusHeight)
            : undefined, proto.signer);
    }
    toProto(_) {
        _;
        const { client_id, previous_connection_id, client_state, counterparty, delay_period, counterparty_versions, proof_height, proof_init, proof_client, proof_consensus, consensus_height, signer, } = this;
        return tx_1.MsgConnectionOpenTry.fromPartial({
            clientId: client_id,
            previousConnectionId: previous_connection_id,
            clientState: client_state.toProto(),
            counterparty: counterparty ? counterparty.toProto() : undefined,
            delayPeriod: long_1.default.fromNumber(delay_period),
            counterpartyVersions: counterparty_versions.length > 0
                ? counterparty_versions.map(cv => cv.toProto())
                : [],
            proofHeight: proof_height ? proof_height.toProto() : undefined,
            proofInit: Buffer.from(proof_init, 'base64'),
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
            typeUrl: '/ibc.core.connection.v1.MsgConnectionOpenTry',
            value: tx_1.MsgConnectionOpenTry.encode(this.toProto()).finish(),
        });
    }
    static unpackAny(msgAny, _) {
        _;
        return MsgConnectionOpenTry.fromProto(tx_1.MsgConnectionOpenTry.decode(msgAny.value));
    }
}
exports.MsgConnectionOpenTry = MsgConnectionOpenTry;
//# sourceMappingURL=MsgConnectionOpenTry.js.map