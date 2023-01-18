"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MsgAcknowledgement = void 0;
const json_1 = require("../../../../util/json");
const any_1 = require("@terra-money/terra.proto/google/protobuf/any");
const Height_1 = require("../../core/client/Height");
const Packet_1 = require("../../core/channel/Packet");
const tx_1 = require("@terra-money/terra.proto/ibc/core/channel/v1/tx");
/**
 * MsgAcknowledgement receives incoming IBC acknowledgement
 */
class MsgAcknowledgement extends json_1.JSONSerializable {
    /**
     * @param packet
     * @param acknowledgement
     * @param proof_acked
     * @param proof_height
     * @param signer signer address
     */
    constructor(packet, acknowledgement, proof_acked, proof_height, signer) {
        super();
        this.packet = packet;
        this.acknowledgement = acknowledgement;
        this.proof_acked = proof_acked;
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
        const { packet, acknowledgement, proof_acked, proof_height, signer } = data;
        return new MsgAcknowledgement(packet ? Packet_1.Packet.fromData(packet) : undefined, proof_acked, acknowledgement, proof_height ? Height_1.Height.fromData(proof_height) : undefined, signer);
    }
    toData(_) {
        _;
        const { packet, acknowledgement, proof_acked, proof_height, signer } = this;
        return {
            '@type': '/ibc.core.channel.v1.MsgAcknowledgement',
            packet: packet ? packet.toData() : undefined,
            acknowledgement,
            proof_acked,
            proof_height: proof_height ? proof_height.toData() : undefined,
            signer,
        };
    }
    static fromProto(proto, _) {
        _;
        return new MsgAcknowledgement(proto.packet ? Packet_1.Packet.fromProto(proto.packet) : undefined, Buffer.from(proto.acknowledgement).toString('base64'), Buffer.from(proto.proofAcked).toString('base64'), proto.proofHeight ? Height_1.Height.fromProto(proto.proofHeight) : undefined, proto.signer);
    }
    toProto(_) {
        _;
        const { packet, acknowledgement, proof_acked, proof_height, signer } = this;
        return tx_1.MsgAcknowledgement.fromPartial({
            packet: packet ? packet.toProto() : undefined,
            acknowledgement: Buffer.from(acknowledgement, 'base64'),
            proofAcked: Buffer.from(proof_acked, 'base64'),
            proofHeight: proof_height ? proof_height.toProto() : undefined,
            signer,
        });
    }
    packAny(_) {
        _;
        return any_1.Any.fromPartial({
            typeUrl: '/ibc.core.channel.v1.MsgAcknowledgement',
            value: tx_1.MsgAcknowledgement.encode(this.toProto()).finish(),
        });
    }
    static unpackAny(msgAny, _) {
        _;
        return MsgAcknowledgement.fromProto(tx_1.MsgAcknowledgement.decode(msgAny.value));
    }
}
exports.MsgAcknowledgement = MsgAcknowledgement;
//# sourceMappingURL=MsgRecvAcknowledgement.js.map