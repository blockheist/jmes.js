"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Counterparty = void 0;
const channel_1 = require("@terra-money/terra.proto/ibc/core/channel/v1/channel");
const json_1 = require("../../../../util/json");
/** Counterparty defines a channel end counterparty */
class Counterparty extends json_1.JSONSerializable {
    /**
     * @param port_id port on the counterparty chain which owns the other end of the channel.
     * @param channel_id channel end on the counterparty chain
     */
    constructor(port_id, channel_id) {
        super();
        this.port_id = port_id;
        this.channel_id = channel_id;
    }
    static fromAmino(data) {
        const { port_id, channel_id } = data;
        return new Counterparty(port_id, channel_id);
    }
    toAmino() {
        const { port_id, channel_id } = this;
        const res = {
            port_id,
            channel_id,
        };
        return res;
    }
    static fromData(data) {
        const { port_id, channel_id } = data;
        return new Counterparty(port_id, channel_id);
    }
    toData() {
        const { port_id, channel_id } = this;
        const res = {
            port_id,
            channel_id,
        };
        return res;
    }
    static fromProto(proto) {
        return new Counterparty(proto.portId, proto.channelId);
    }
    toProto() {
        const { port_id, channel_id } = this;
        return channel_1.Counterparty.fromPartial({
            portId: port_id,
            channelId: channel_id,
        });
    }
}
exports.Counterparty = Counterparty;
//# sourceMappingURL=Counterparty.js.map