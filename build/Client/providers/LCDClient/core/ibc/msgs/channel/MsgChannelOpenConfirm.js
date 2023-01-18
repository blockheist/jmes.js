"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MsgChannelOpenConfirm = void 0;
const json_1 = require("../../../../util/json");
const any_1 = require("@terra-money/terra.proto/google/protobuf/any");
const Height_1 = require("../../core/client/Height");
const tx_1 = require("@terra-money/terra.proto/ibc/core/channel/v1/tx");
/**
 *  MsgChannelOpenConfirm defines a msg sent by a Relayer to Chain B to acknowledge the change of channel state to OPEN on Chain A.
 */
class MsgChannelOpenConfirm extends json_1.JSONSerializable {
    /**
     * @param port_id identifier of the port to use
     * @param channel_id
     * @param proof_ack
     * @param proof_height
     * @param signer signer address
     */
    constructor(port_id, channel_id, proof_ack, proof_height, signer) {
        super();
        this.port_id = port_id;
        this.channel_id = channel_id;
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
        const { port_id, channel_id, proof_ack, proof_height, signer } = data;
        return new MsgChannelOpenConfirm(port_id, channel_id, proof_ack, proof_height ? Height_1.Height.fromData(proof_height) : undefined, signer);
    }
    toData(_) {
        _;
        const { port_id, channel_id, proof_ack, proof_height, signer } = this;
        return {
            '@type': '/ibc.core.channel.v1.MsgChannelOpenConfirm',
            port_id,
            channel_id,
            proof_ack,
            proof_height: proof_height ? proof_height.toData() : undefined,
            signer,
        };
    }
    static fromProto(proto, _) {
        _;
        return new MsgChannelOpenConfirm(proto.portId, proto.channelId, Buffer.from(proto.proofAck).toString('base64'), proto.proofHeight ? Height_1.Height.fromProto(proto.proofHeight) : undefined, proto.signer);
    }
    toProto(_) {
        _;
        const { port_id, channel_id, proof_ack, proof_height, signer } = this;
        return tx_1.MsgChannelOpenConfirm.fromPartial({
            portId: port_id,
            channelId: channel_id,
            proofAck: Buffer.from(proof_ack, 'base64'),
            proofHeight: proof_height ? proof_height.toProto() : undefined,
            signer,
        });
    }
    packAny(_) {
        _;
        return any_1.Any.fromPartial({
            typeUrl: '/ibc.core.channel.v1.MsgChannelOpenConfirm',
            value: tx_1.MsgChannelOpenConfirm.encode(this.toProto()).finish(),
        });
    }
    static unpackAny(msgAny, _) {
        _;
        return MsgChannelOpenConfirm.fromProto(tx_1.MsgChannelOpenConfirm.decode(msgAny.value));
    }
}
exports.MsgChannelOpenConfirm = MsgChannelOpenConfirm;
//# sourceMappingURL=MsgChannelOpenConfirm.js.map