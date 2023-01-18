"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MsgChannelOpenAck = void 0;
const json_1 = require("../../../../util/json");
const any_1 = require("@terra-money/terra.proto/google/protobuf/any");
const Height_1 = require("../../core/client/Height");
const tx_1 = require("@terra-money/terra.proto/ibc/core/channel/v1/tx");
/**
 * MsgChannelOpenAck defines a msg sent by a Relayer to Chain A to acknowledge the change of channel state to TRYOPEN on Chain B.
 */
class MsgChannelOpenAck extends json_1.JSONSerializable {
    /**
     * @param port_id identifier of the port to use
     * @param channel_id
     * @param counterparty_channel_id
     * @param counterparty_version
     * @param proof_try
     * @param proof_height
     * @param signer signer address
     */
    constructor(port_id, channel_id, counterparty_channel_id, counterparty_version, proof_try, proof_height, signer) {
        super();
        this.port_id = port_id;
        this.channel_id = channel_id;
        this.counterparty_channel_id = counterparty_channel_id;
        this.counterparty_version = counterparty_version;
        this.proof_try = proof_try;
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
        const { port_id, channel_id, counterparty_channel_id, counterparty_version, proof_try, proof_height, signer, } = data;
        return new MsgChannelOpenAck(port_id, channel_id, counterparty_channel_id, counterparty_version, proof_try, proof_height ? Height_1.Height.fromData(proof_height) : undefined, signer);
    }
    toData(_) {
        _;
        const { port_id, channel_id, counterparty_channel_id, counterparty_version, proof_try, proof_height, signer, } = this;
        return {
            '@type': '/ibc.core.channel.v1.MsgChannelOpenAck',
            port_id,
            channel_id,
            counterparty_channel_id,
            counterparty_version,
            proof_try,
            proof_height: proof_height ? proof_height.toData() : undefined,
            signer,
        };
    }
    static fromProto(proto, _) {
        _;
        return new MsgChannelOpenAck(proto.portId, proto.channelId, proto.counterpartyChannelId, proto.counterpartyVersion, Buffer.from(proto.proofTry).toString('base64'), proto.proofHeight ? Height_1.Height.fromProto(proto.proofHeight) : undefined, proto.signer);
    }
    toProto(_) {
        _;
        const { port_id, channel_id, counterparty_channel_id, counterparty_version, proof_try, proof_height, signer, } = this;
        return tx_1.MsgChannelOpenAck.fromPartial({
            portId: port_id,
            channelId: channel_id,
            counterpartyChannelId: counterparty_channel_id,
            counterpartyVersion: counterparty_version,
            proofTry: Buffer.from(proof_try, 'base64'),
            proofHeight: proof_height ? proof_height.toProto() : undefined,
            signer,
        });
    }
    packAny(_) {
        _;
        return any_1.Any.fromPartial({
            typeUrl: '/ibc.core.channel.v1.MsgChannelOpenAck',
            value: tx_1.MsgChannelOpenAck.encode(this.toProto()).finish(),
        });
    }
    static unpackAny(msgAny, _) {
        _;
        return MsgChannelOpenAck.fromProto(tx_1.MsgChannelOpenAck.decode(msgAny.value));
    }
}
exports.MsgChannelOpenAck = MsgChannelOpenAck;
//# sourceMappingURL=MsgChannelOpenAck.js.map