"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MsgChannelOpenInit = void 0;
const json_1 = require("../../../../util/json");
const any_1 = require("@terra-money/terra.proto/google/protobuf/any");
const Channel_1 = require("../../core/channel/Channel");
const tx_1 = require("@terra-money/terra.proto/ibc/core/channel/v1/tx");
/**
 * MsgChannelOpenInit defines an sdk.Msg to initialize a channel handshake. It is called by a relayer on Chain A.
 */
class MsgChannelOpenInit extends json_1.JSONSerializable {
    /**
     * @param port_id identifier of the port to use
     * @param channel channel info
     * @param signer signer address
     */
    constructor(port_id, channel, signer) {
        super();
        this.port_id = port_id;
        this.channel = channel;
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
        const { port_id, channel, signer } = data;
        return new MsgChannelOpenInit(port_id, channel ? Channel_1.Channel.fromData(channel) : undefined, signer);
    }
    toData(_) {
        _;
        const { port_id, channel, signer } = this;
        return {
            '@type': '/ibc.core.channel.v1.MsgChannelOpenInit',
            port_id,
            channel: channel ? channel.toData() : undefined,
            signer,
        };
    }
    static fromProto(proto, _) {
        _;
        return new MsgChannelOpenInit(proto.portId, proto.channel ? Channel_1.Channel.fromProto(proto.channel) : undefined, proto.signer);
    }
    toProto(_) {
        _;
        const { port_id, channel, signer } = this;
        return tx_1.MsgChannelOpenInit.fromPartial({
            portId: port_id,
            channel: channel ? channel.toProto() : undefined,
            signer,
        });
    }
    packAny(_) {
        _;
        return any_1.Any.fromPartial({
            typeUrl: '/ibc.core.channel.v1.MsgChannelOpenInit',
            value: tx_1.MsgChannelOpenInit.encode(this.toProto()).finish(),
        });
    }
    static unpackAny(msgAny, _) {
        _;
        return MsgChannelOpenInit.fromProto(tx_1.MsgChannelOpenInit.decode(msgAny.value));
    }
}
exports.MsgChannelOpenInit = MsgChannelOpenInit;
//# sourceMappingURL=MsgChannelOpenInit.js.map