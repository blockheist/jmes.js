"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MsgTimeout = void 0;
const json_1 = require("../../../../util/json");
const any_1 = require("@terra-money/terra.proto/google/protobuf/any");
const Height_1 = require("../../core/client/Height");
const Packet_1 = require("../../core/channel/Packet");
const tx_1 = require("@terra-money/terra.proto/ibc/core/channel/v1/tx");
const long_1 = __importDefault(require("long"));
/**
 * MsgTimeout receives timed-out packet
 */
class MsgTimeout extends json_1.JSONSerializable {
    /**
     * @param packet
     * @param proof_unreceived
     * @param proof_height
     * @param next_seuqnce_recv
     * @param signer signer address
     */
    constructor(packet, proof_unreceived, proof_height, next_sequence_recv, signer) {
        super();
        this.packet = packet;
        this.proof_unreceived = proof_unreceived;
        this.proof_height = proof_height;
        this.next_sequence_recv = next_sequence_recv;
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
        const { packet, proof_unreceived, proof_height, next_sequence_recv, signer, } = data;
        return new MsgTimeout(packet ? Packet_1.Packet.fromData(packet) : undefined, proof_unreceived, proof_height ? Height_1.Height.fromData(proof_height) : undefined, Number.parseInt(next_sequence_recv), signer);
    }
    toData(_) {
        _;
        const { packet, proof_unreceived, proof_height, next_sequence_recv, signer, } = this;
        return {
            '@type': '/ibc.core.channel.v1.MsgTimeout',
            packet: packet ? packet.toData() : undefined,
            proof_unreceived,
            proof_height: proof_height ? proof_height.toData() : undefined,
            next_sequence_recv: next_sequence_recv.toFixed(),
            signer,
        };
    }
    static fromProto(proto, _) {
        _;
        return new MsgTimeout(proto.packet ? Packet_1.Packet.fromProto(proto.packet) : undefined, Buffer.from(proto.proofUnreceived).toString('base64'), proto.proofHeight ? Height_1.Height.fromProto(proto.proofHeight) : undefined, proto.nextSequenceRecv.toNumber(), proto.signer);
    }
    toProto(_) {
        _;
        const { packet, proof_unreceived, proof_height, next_sequence_recv, signer, } = this;
        return tx_1.MsgTimeout.fromPartial({
            packet: packet ? packet.toProto() : undefined,
            proofUnreceived: Buffer.from(proof_unreceived, 'base64'),
            proofHeight: proof_height ? proof_height.toProto() : undefined,
            nextSequenceRecv: long_1.default.fromNumber(next_sequence_recv),
            signer,
        });
    }
    packAny(_) {
        _;
        return any_1.Any.fromPartial({
            typeUrl: '/ibc.core.channel.v1.MsgTimeout',
            value: tx_1.MsgTimeout.encode(this.toProto()).finish(),
        });
    }
    static unpackAny(msgAny, _) {
        _;
        return MsgTimeout.fromProto(tx_1.MsgTimeout.decode(msgAny.value));
    }
}
exports.MsgTimeout = MsgTimeout;
//# sourceMappingURL=MsgTimeout.js.map