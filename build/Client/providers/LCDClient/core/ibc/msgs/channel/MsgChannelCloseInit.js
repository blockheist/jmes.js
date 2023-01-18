"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MsgChannelCloseInit = void 0;
const json_1 = require("../../../../util/json");
const any_1 = require("@terra-money/terra.proto/google/protobuf/any");
const tx_1 = require("@terra-money/terra.proto/ibc/core/channel/v1/tx");
/**
 * MsgChannelCloseInit defines a msg sent by a Relayer to Chain A to close a channel with Chain B.
 */
class MsgChannelCloseInit extends json_1.JSONSerializable {
    /**
     * @param port_id identifier of the port to use
     * @param channel channel info
     * @param signer signer address
     */
    constructor(port_id, channel_id, signer) {
        super();
        this.port_id = port_id;
        this.channel_id = channel_id;
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
        const { port_id, channel_id, signer } = data;
        return new MsgChannelCloseInit(port_id, channel_id, signer);
    }
    toData(_) {
        _;
        const { port_id, channel_id, signer } = this;
        return {
            '@type': '/ibc.core.channel.v1.MsgChannelCloseInit',
            port_id,
            channel_id,
            signer,
        };
    }
    static fromProto(proto, _) {
        _;
        return new MsgChannelCloseInit(proto.portId, proto.channelId, proto.signer);
    }
    toProto(_) {
        _;
        const { port_id, channel_id, signer } = this;
        return tx_1.MsgChannelCloseInit.fromPartial({
            portId: port_id,
            channelId: channel_id,
            signer,
        });
    }
    packAny(_) {
        _;
        return any_1.Any.fromPartial({
            typeUrl: '/ibc.core.channel.v1.MsgChannelCloseInit',
            value: tx_1.MsgChannelCloseInit.encode(this.toProto()).finish(),
        });
    }
    static unpackAny(msgAny, _) {
        _;
        return MsgChannelCloseInit.fromProto(tx_1.MsgChannelCloseInit.decode(msgAny.value));
    }
}
exports.MsgChannelCloseInit = MsgChannelCloseInit;
//# sourceMappingURL=MsgChannelCloseInit.js.map