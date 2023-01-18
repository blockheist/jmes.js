"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MsgChannelOpenTry = void 0;
const json_1 = require("../../../../util/json");
const any_1 = require("@terra-money/terra.proto/google/protobuf/any");
const Channel_1 = require("../../core/channel/Channel");
const Height_1 = require("../../core/client/Height");
const tx_1 = require("@terra-money/terra.proto/ibc/core/channel/v1/tx");
/**
 * MsgChannelOpenTry defines a msg sent by a Relayer to try to open a channel on Chain B
 */
class MsgChannelOpenTry extends json_1.JSONSerializable {
    /**
     * @param port_id identifier of the port to use
     * @param previous_channel_id
     * @param channel channel info
     * @param counterparty_version
     * @param proof_init
     * @param proof_height
     * @param signer signer address
     */
    constructor(port_id, previous_channel_id, channel, counterparty_version, proof_init, proof_height, signer) {
        super();
        this.port_id = port_id;
        this.previous_channel_id = previous_channel_id;
        this.channel = channel;
        this.counterparty_version = counterparty_version;
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
        const { port_id, previous_channel_id, channel, counterparty_version, proof_init, proof_height, signer, } = data;
        return new MsgChannelOpenTry(port_id, previous_channel_id, channel ? Channel_1.Channel.fromData(channel) : undefined, counterparty_version, proof_init, proof_height ? Height_1.Height.fromData(proof_height) : undefined, signer);
    }
    toData(_) {
        _;
        const { port_id, previous_channel_id, channel, counterparty_version, proof_init, proof_height, signer, } = this;
        return {
            '@type': '/ibc.core.channel.v1.MsgChannelOpenTry',
            port_id,
            previous_channel_id,
            channel: channel ? channel.toData() : undefined,
            counterparty_version,
            proof_init,
            proof_height: proof_height ? proof_height.toData() : undefined,
            signer,
        };
    }
    static fromProto(proto, _) {
        _;
        return new MsgChannelOpenTry(proto.portId, proto.previousChannelId, proto.channel ? Channel_1.Channel.fromProto(proto.channel) : undefined, proto.counterpartyVersion, Buffer.from(proto.proofInit).toString('base64'), proto.proofHeight ? Height_1.Height.fromProto(proto.proofHeight) : undefined, proto.signer);
    }
    toProto(_) {
        _;
        const { port_id, previous_channel_id, channel, counterparty_version, proof_init, proof_height, signer, } = this;
        return tx_1.MsgChannelOpenTry.fromPartial({
            portId: port_id,
            previousChannelId: previous_channel_id,
            channel: channel ? channel.toProto() : undefined,
            counterpartyVersion: counterparty_version,
            proofInit: Buffer.from(proof_init, 'base64'),
            proofHeight: proof_height ? proof_height.toProto() : undefined,
            signer,
        });
    }
    packAny(_) {
        _;
        return any_1.Any.fromPartial({
            typeUrl: '/ibc.core.channel.v1.MsgChannelOpenTry',
            value: tx_1.MsgChannelOpenTry.encode(this.toProto()).finish(),
        });
    }
    static unpackAny(msgAny, _) {
        _;
        return MsgChannelOpenTry.fromProto(tx_1.MsgChannelOpenTry.decode(msgAny.value));
    }
}
exports.MsgChannelOpenTry = MsgChannelOpenTry;
//# sourceMappingURL=MsgChannelOpenTry.js.map