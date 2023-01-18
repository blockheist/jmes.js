"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MsgRecvPacket = void 0;
const json_1 = require("../../../../util/json");
const any_1 = require("@terra-money/terra.proto/google/protobuf/any");
const Height_1 = require("../../core/client/Height");
const Packet_1 = require("../../core/channel/Packet");
const tx_1 = require("@terra-money/terra.proto/ibc/core/channel/v1/tx");
/**
 * MsgRecvPacket receives incoming IBC packet
 */
class MsgRecvPacket extends json_1.JSONSerializable {
    /**
     * @param packet
     * @param proof_commitment
     * @param proof_height
     * @param signer signer address
     */
    constructor(packet, proof_commitment, proof_height, signer) {
        super();
        this.packet = packet;
        this.proof_commitment = proof_commitment;
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
        const { packet, proof_commitment, proof_height, signer } = data;
        return new MsgRecvPacket(packet ? Packet_1.Packet.fromData(packet) : undefined, proof_commitment, proof_height ? Height_1.Height.fromData(proof_height) : undefined, signer);
    }
    toData(_) {
        _;
        const { packet, proof_commitment, proof_height, signer } = this;
        return {
            '@type': '/ibc.core.channel.v1.MsgRecvPacket',
            packet: packet ? packet.toData() : undefined,
            proof_commitment,
            proof_height: proof_height ? proof_height.toData() : undefined,
            signer,
        };
    }
    static fromProto(proto, _) {
        _;
        return new MsgRecvPacket(proto.packet ? Packet_1.Packet.fromProto(proto.packet) : undefined, Buffer.from(proto.proofCommitment).toString('base64'), proto.proofHeight ? Height_1.Height.fromProto(proto.proofHeight) : undefined, proto.signer);
    }
    toProto(_) {
        _;
        const { packet, proof_commitment, proof_height, signer } = this;
        return tx_1.MsgRecvPacket.fromPartial({
            packet: packet ? packet.toProto() : undefined,
            proofCommitment: Buffer.from(proof_commitment, 'base64'),
            proofHeight: proof_height ? proof_height.toProto() : undefined,
            signer,
        });
    }
    packAny(_) {
        _;
        return any_1.Any.fromPartial({
            typeUrl: '/ibc.core.channel.v1.MsgRecvPacket',
            value: tx_1.MsgRecvPacket.encode(this.toProto()).finish(),
        });
    }
    static unpackAny(msgAny, _) {
        _;
        return MsgRecvPacket.fromProto(tx_1.MsgRecvPacket.decode(msgAny.value));
    }
}
exports.MsgRecvPacket = MsgRecvPacket;
//# sourceMappingURL=MsgRecvPacket.js.map