"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MsgConnectionOpenConfirm = void 0;
const json_1 = require("../../../../util/json");
const any_1 = require("@terra-money/terra.proto/google/protobuf/any");
const tx_1 = require("@terra-money/terra.proto/ibc/core/connection/v1/tx");
const Height_1 = require("../../core/client/Height");
/**
 * MsgConnectionOpenConfirm defines a msg sent by a Relayer to Chain B to
 * acknowledge the change of connection state to OPEN on Chain A.
 */
class MsgConnectionOpenConfirm extends json_1.JSONSerializable {
    /**
     * @param connection_id
     * @param proof_ack proof for the change of the connection state on Chain A: `INIT -> OPEN`
     * @param proof_height
     * @param signer signer address
     */
    constructor(connection_id, proof_ack, proof_height, signer) {
        super();
        this.connection_id = connection_id;
        this.proof_ack = proof_ack;
        this.proof_height = proof_height;
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
        const { connection_id, proof_ack, proof_height, signer } = data;
        return new MsgConnectionOpenConfirm(connection_id, proof_ack, proof_height ? Height_1.Height.fromData(proof_height) : undefined, signer);
    }
    toData(_) {
        _;
        const { connection_id, proof_ack, proof_height, signer } = this;
        return {
            '@type': '/ibc.core.connection.v1.MsgConnectionOpenConfirm',
            connection_id,
            proof_ack,
            proof_height: proof_height ? proof_height.toData() : undefined,
            signer,
        };
    }
    static fromProto(proto, _) {
        _;
        return new MsgConnectionOpenConfirm(proto.connectionId, Buffer.from(proto.proofAck).toString('base64'), proto.proofHeight ? Height_1.Height.fromProto(proto.proofHeight) : undefined, proto.signer);
    }
    toProto(_) {
        _;
        const { connection_id, proof_ack, proof_height, signer } = this;
        return tx_1.MsgConnectionOpenConfirm.fromPartial({
            connectionId: connection_id,
            proofAck: Buffer.from(proof_ack, 'base64'),
            proofHeight: proof_height ? proof_height.toProto() : undefined,
            signer,
        });
    }
    packAny(_) {
        _;
        return any_1.Any.fromPartial({
            typeUrl: '/ibc.core.connection.v1.MsgConnectionOpenConfirm',
            value: tx_1.MsgConnectionOpenConfirm.encode(this.toProto()).finish(),
        });
    }
    static unpackAny(msgAny, _) {
        _;
        return MsgConnectionOpenConfirm.fromProto(tx_1.MsgConnectionOpenConfirm.decode(msgAny.value));
    }
}
exports.MsgConnectionOpenConfirm = MsgConnectionOpenConfirm;
//# sourceMappingURL=MsgConnectionOpenConfirm.js.map