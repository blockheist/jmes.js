"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Packet = void 0;
const channel_1 = require("@terra-money/terra.proto/ibc/core/channel/v1/channel");
const long_1 = __importDefault(require("long"));
const json_1 = require("../../../../util/json");
const Height_1 = require("../client/Height");
/** Packet defines a type that carries data across different chains through IBC */
class Packet extends json_1.JSONSerializable {
    /**
     * @param port_id port on the counterparty chain which owns the other end of the channel.
     * @param channel_id channel end on the counterparty chain
     */
    constructor(sequence, source_port, source_channel, destination_port, destination_channel, data, timeout_height, timeout_timestamp) {
        super();
        this.sequence = sequence;
        this.source_port = source_port;
        this.source_channel = source_channel;
        this.destination_port = destination_port;
        this.destination_channel = destination_channel;
        this.data = data;
        this.timeout_height = timeout_height;
        this.timeout_timestamp = timeout_timestamp;
    }
    static fromAmino(_data) {
        const { sequence, source_port, source_channel, destination_port, destination_channel, data, timeout_height, timeout_timestamp, } = _data;
        return new Packet(sequence, source_port, source_channel, destination_port, destination_channel, data, timeout_height ? Height_1.Height.fromAmino(timeout_height) : undefined, timeout_timestamp);
    }
    toAmino() {
        const { sequence, source_port, source_channel, destination_port, destination_channel, data, timeout_height, timeout_timestamp, } = this;
        const res = {
            sequence,
            source_port,
            source_channel,
            destination_port,
            destination_channel,
            data,
            timeout_height: timeout_height ? timeout_height.toAmino() : undefined,
            timeout_timestamp,
        };
        return res;
    }
    static fromData(_data) {
        const { sequence, source_port, source_channel, destination_port, destination_channel, data, timeout_height, timeout_timestamp, } = _data;
        return new Packet(sequence, source_port, source_channel, destination_port, destination_channel, data, timeout_height ? Height_1.Height.fromData(timeout_height) : undefined, Number.parseInt(timeout_timestamp));
    }
    toData() {
        const { sequence, source_port, source_channel, destination_port, destination_channel, data, timeout_height, timeout_timestamp, } = this;
        const res = {
            sequence,
            source_port,
            source_channel,
            destination_port,
            destination_channel,
            data,
            timeout_height: timeout_height ? timeout_height.toData() : undefined,
            timeout_timestamp: timeout_timestamp.toFixed(),
        };
        return res;
    }
    static fromProto(proto) {
        return new Packet(proto.sequence.toNumber(), proto.sourcePort, proto.sourceChannel, proto.destinationPort, proto.destinationChannel, Buffer.from(proto.data).toString('base64'), proto.timeoutHeight ? Height_1.Height.fromProto(proto.timeoutHeight) : undefined, proto.timeoutTimestamp.toNumber());
    }
    toProto() {
        const { sequence, source_port, source_channel, destination_port, destination_channel, data, timeout_height, timeout_timestamp, } = this;
        return channel_1.Packet.fromPartial({
            sequence: long_1.default.fromNumber(sequence),
            sourcePort: source_port,
            sourceChannel: source_channel,
            destinationPort: destination_port,
            destinationChannel: destination_channel,
            data: Buffer.from(data, 'base64'),
            timeoutHeight: timeout_height ? timeout_height.toProto() : undefined,
            timeoutTimestamp: long_1.default.fromNumber(timeout_timestamp),
        });
    }
}
exports.Packet = Packet;
//# sourceMappingURL=Packet.js.map