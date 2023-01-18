"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MsgPayPacketFee = void 0;
const json_1 = require("../../../../../util/json");
const any_1 = require("@terra-money/terra.proto/google/protobuf/any");
const tx_1 = require("@terra-money/terra.proto/ibc/applications/fee/v1/tx");
const Fee_1 = require("../Fee");
/**
 * MsgPayPacketFee defines the request type for the PayPacketFee rpc
 * This Msg can be used to pay for a packet at the next sequence send & should be combined with the Msg that will be paid for
 */
class MsgPayPacketFee extends json_1.JSONSerializable {
    /**
     * @param fee encapsulates the recv, ack and timeout fees associated with an IBC packet
     * @param source_port_id the source port unique identifier
     * @param source_channel_id the source channel unique identifer
     * @param signer account address to refund fee if necessary
     * @param relayers optional list of relayers permitted to the receive packet fees
     */
    constructor(fee, source_port_id, source_channel_id, signer, relayers) {
        super();
        this.fee = fee;
        this.source_port_id = source_port_id;
        this.source_channel_id = source_channel_id;
        this.signer = signer;
        this.relayers = relayers;
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
        const { fee, source_port_id, source_channel_id, signer, relayers } = data;
        return new MsgPayPacketFee(fee ? Fee_1.Fee.fromData(fee) : undefined, source_port_id, source_channel_id, signer, relayers);
    }
    toData(isClassic) {
        if (isClassic) {
            throw new Error('Not supported for the network');
        }
        const { fee, source_port_id, source_channel_id, signer, relayers } = this;
        return {
            '@type': '/ibc.applications.fee.v1.MsgPayPacketFee',
            fee: fee === null || fee === void 0 ? void 0 : fee.toData(),
            source_port_id,
            source_channel_id,
            signer,
            relayers,
        };
    }
    static fromProto(proto, isClassic) {
        if (isClassic) {
            throw new Error('Not supported for the network');
        }
        return new MsgPayPacketFee(proto.fee ? Fee_1.Fee.fromProto(proto.fee) : undefined, proto.sourcePortId, proto.sourceChannelId, proto.signer, proto.relayers);
    }
    toProto(isClassic) {
        if (isClassic) {
            throw new Error('Not supported for the network');
        }
        const { fee, source_port_id, source_channel_id, signer, relayers } = this;
        return tx_1.MsgPayPacketFee.fromPartial({
            fee: fee === null || fee === void 0 ? void 0 : fee.toProto(),
            sourcePortId: source_port_id,
            sourceChannelId: source_channel_id,
            signer,
            relayers,
        });
    }
    packAny(isClassic) {
        if (isClassic) {
            throw new Error('Not supported for the network');
        }
        return any_1.Any.fromPartial({
            typeUrl: '/ibc.applications.fee.v1.MsgPayPacketFee',
            value: tx_1.MsgPayPacketFee.encode(this.toProto(isClassic)).finish(),
        });
    }
    static unpackAny(msgAny, isClassic) {
        if (isClassic) {
            throw new Error('Not supported for the network');
        }
        return MsgPayPacketFee.fromProto(tx_1.MsgPayPacketFee.decode(msgAny.value), isClassic);
    }
}
exports.MsgPayPacketFee = MsgPayPacketFee;
//# sourceMappingURL=MsgPayPacketFee.js.map