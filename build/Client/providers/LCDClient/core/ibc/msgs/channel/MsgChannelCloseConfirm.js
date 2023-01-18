"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MsgChannelCloseConfirm = void 0;
const json_1 = require("../../../../util/json");
const any_1 = require("@terra-money/terra.proto/google/protobuf/any");
const Height_1 = require("../../core/client/Height");
const tx_1 = require("@terra-money/terra.proto/ibc/core/channel/v1/tx");
/**
 * MsgChannelCloseConfirm defines a msg sent by a Relayer to Chain B to acknowledge the change of channel state to CLOSED on Chain A.
 */
class MsgChannelCloseConfirm extends json_1.JSONSerializable {
    /**
     * @param port_id identifier of the port to use
     * @param channel_id
     * @param proof_init
     * @param proof_height
     * @param signer signer address
     */
    constructor(port_id, channel_id, proof_init, proof_height, signer) {
        super();
        this.port_id = port_id;
        this.channel_id = channel_id;
        this.proof_init = proof_init;
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
        const { port_id, channel_id, proof_init, proof_height, signer } = data;
        return new MsgChannelCloseConfirm(port_id, channel_id, proof_init, proof_height ? Height_1.Height.fromData(proof_height) : undefined, signer);
    }
    toData(_) {
        _;
        const { port_id, channel_id, proof_init, proof_height, signer } = this;
        return {
            '@type': '/ibc.core.channel.v1.MsgChannelCloseConfirm',
            port_id,
            channel_id,
            proof_init,
            proof_height: proof_height ? proof_height.toData() : undefined,
            signer,
        };
    }
    static fromProto(proto, _) {
        _;
        return new MsgChannelCloseConfirm(proto.portId, proto.channelId, Buffer.from(proto.proofInit).toString('base64'), proto.proofHeight ? Height_1.Height.fromProto(proto.proofHeight) : undefined, proto.signer);
    }
    toProto(_) {
        _;
        const { port_id, channel_id, proof_init, proof_height, signer } = this;
        return tx_1.MsgChannelCloseConfirm.fromPartial({
            portId: port_id,
            channelId: channel_id,
            proofInit: Buffer.from(proof_init, 'base64'),
            proofHeight: proof_height ? proof_height.toProto() : undefined,
            signer,
        });
    }
    packAny(_) {
        _;
        return any_1.Any.fromPartial({
            typeUrl: '/ibc.core.channel.v1.MsgChannelCloseConfirm',
            value: tx_1.MsgChannelCloseConfirm.encode(this.toProto()).finish(),
        });
    }
    static unpackAny(msgAny, _) {
        _;
        return MsgChannelCloseConfirm.fromProto(tx_1.MsgChannelCloseConfirm.decode(msgAny.value));
    }
}
exports.MsgChannelCloseConfirm = MsgChannelCloseConfirm;
//# sourceMappingURL=MsgChannelCloseConfirm.js.map