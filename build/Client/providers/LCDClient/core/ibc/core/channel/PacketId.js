"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PacketId = void 0;
const channel_1 = require("@terra-money/terra.proto/ibc/core/channel/v1/channel");
const json_1 = require("../../../../util/json");
const Long = __importStar(require("long"));
/**
 * PacketId is an identifer for a unique Packet
 * Source chains refer to packets by source port/channel
 * Destination chains refer to packets by destination port/channel
 */
class PacketId extends json_1.JSONSerializable {
    /**
     * @param port_id  channel port identifier
     * @param channel_id channel unique identifier
     * @param sequence packet sequence
     */
    constructor(port_id, channel_id, sequence) {
        super();
        this.port_id = port_id;
        this.channel_id = channel_id;
        this.sequence = sequence;
    }
    static fromAmino(data) {
        const { port_id, channel_id, sequence } = data;
        return new PacketId(port_id, channel_id, Number.parseInt(sequence));
    }
    toAmino() {
        const { port_id, channel_id, sequence } = this;
        const res = {
            port_id,
            channel_id,
            sequence: sequence.toFixed(),
        };
        return res;
    }
    static fromData(data) {
        const { port_id, channel_id, sequence } = data;
        return new PacketId(port_id, channel_id, Number.parseInt(sequence));
    }
    toData() {
        const { port_id, channel_id, sequence } = this;
        const res = {
            port_id,
            channel_id,
            sequence: sequence.toFixed(),
        };
        return res;
    }
    static fromProto(proto) {
        return new PacketId(proto.portId, proto.channelId, proto.sequence.toNumber());
    }
    toProto() {
        const { port_id, channel_id, sequence } = this;
        return channel_1.PacketId.fromPartial({
            portId: port_id,
            channelId: channel_id,
            sequence: Long.fromNumber(sequence),
        });
    }
}
exports.PacketId = PacketId;
//# sourceMappingURL=PacketId.js.map