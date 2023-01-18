"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MsgPayPacketFeeAsync = void 0;
const json_1 = require("../../../../../util/json");
const any_1 = require("@terra-money/terra.proto/google/protobuf/any");
const tx_1 = require("@terra-money/terra.proto/ibc/applications/fee/v1/tx");
const PacketId_1 = require("../../../core/channel/PacketId");
const PacketFee_1 = require("../PacketFee");
/**
 * MsgPayPacketFeeAsync defines the request type for the PayPacketFeeAsync rpc
 * This Msg can be used to pay for a packet at a specified sequence (instead of the next sequence send)
 */
class MsgPayPacketFeeAsync extends json_1.JSONSerializable {
    /**
     * @param packet_id packet identifier comprised of the channel ID, port ID and sequence
     * @param packet_fee the packet fee associated with a particular IBC packet
     */
    constructor(packet_id, packet_fee) {
        super();
        this.packet_id = packet_id;
        this.packet_fee = packet_fee;
    }
    static fromAmino(_, isClassic) {
        if (isClassic) {
            throw new Error('Not supported for the network');
        }
        _;
        throw new Error('Amino not supported');
    }
    toAmino(isClassic) {
        if (isClassic) {
            throw new Error('Not supported for the network');
        }
        throw new Error('Amino not supported');
    }
    static fromData(data, isClassic) {
        if (isClassic) {
            throw new Error('Not supported for the network');
        }
        const { packet_id, packet_fee } = data;
        return new MsgPayPacketFeeAsync(packet_id ? PacketId_1.PacketId.fromData(packet_id) : undefined, packet_fee ? PacketFee_1.PacketFee.fromData(packet_fee) : undefined);
    }
    toData(isClassic) {
        if (isClassic) {
            throw new Error('Not supported for the network');
        }
        const { packet_id, packet_fee } = this;
        return {
            '@type': '/ibc.applications.fee.v1.MsgPayPacketFeeAsync',
            packet_id: packet_id === null || packet_id === void 0 ? void 0 : packet_id.toData(),
            packet_fee: packet_fee === null || packet_fee === void 0 ? void 0 : packet_fee.toData(),
        };
    }
    static fromProto(proto, isClassic) {
        if (isClassic) {
            throw new Error('Not supported for the network');
        }
        return new MsgPayPacketFeeAsync(proto.packetId ? PacketId_1.PacketId.fromProto(proto.packetId) : undefined, proto.packetFee ? PacketFee_1.PacketFee.fromProto(proto.packetFee) : undefined);
    }
    toProto(isClassic) {
        if (isClassic) {
            throw new Error('Not supported for the network');
        }
        const { packet_id, packet_fee } = this;
        return tx_1.MsgPayPacketFeeAsync.fromPartial({
            packetId: packet_id === null || packet_id === void 0 ? void 0 : packet_id.toProto(),
            packetFee: packet_fee === null || packet_fee === void 0 ? void 0 : packet_fee.toProto(),
        });
    }
    packAny(isClassic) {
        if (isClassic) {
            throw new Error('Not supported for the network');
        }
        return any_1.Any.fromPartial({
            typeUrl: '/ibc.applications.fee.v1.MsgPayPacketFeeAsync',
            value: tx_1.MsgPayPacketFeeAsync.encode(this.toProto(isClassic)).finish(),
        });
    }
    static unpackAny(msgAny, isClassic) {
        if (isClassic) {
            throw new Error('Not supported for the network');
        }
        return MsgPayPacketFeeAsync.fromProto(tx_1.MsgPayPacketFeeAsync.decode(msgAny.value), isClassic);
    }
}
exports.MsgPayPacketFeeAsync = MsgPayPacketFeeAsync;
//# sourceMappingURL=MsgPayPacketFeeAsync.js.map