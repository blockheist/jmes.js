"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Channel = void 0;
const channel_1 = require("@terra-money/terra.proto/ibc/core/channel/v1/channel");
const json_1 = require("../../../../util/json");
const Counterparty_1 = require("./Counterparty");
/**
 * Channel is a monotonically increasing data type
 * that can be compared against another Channel for the purposes of updating and
 * freezing clients
 *
 * Normally the RevisionChannel is incremented at each height while keeping
 * RevisionNumber the same. However some consensus algorithms may choose to
 * reset the height in certain conditions e.g. hard forks, state-machine
 * breaking changes In these cases, the RevisionNumber is incremented so that
 * height continues to be monitonically increasing even as the RevisionChannel
 * gets reset
 */
class Channel extends json_1.JSONSerializable {
    /**
     * @param state current state of the channel end
     * @param ordering  whether the channel is ordered or unordered
     * @param counterparty counterparty channel end
     * @param connection_hops list of connection identifiers, in order, along which packets sent on this channel will travel
     * @param version opaque channel version, which is agreed upon during the handshake
     */
    constructor(state, ordering, counterparty, connection_hops, version) {
        super();
        this.state = state;
        this.ordering = ordering;
        this.counterparty = counterparty;
        this.connection_hops = connection_hops;
        this.version = version;
    }
    static fromAmino(data) {
        const { state, ordering, counterparty, connection_hops, version } = data;
        return new Channel(state, ordering, counterparty ? Counterparty_1.Counterparty.fromAmino(counterparty) : undefined, connection_hops, version);
    }
    toAmino() {
        const { state, ordering, counterparty, connection_hops, version } = this;
        const res = {
            state,
            ordering,
            counterparty: counterparty ? counterparty.toAmino() : undefined,
            connection_hops,
            version,
        };
        return res;
    }
    static fromData(data) {
        const { state, ordering, counterparty, connection_hops, version } = data;
        return new Channel(state, ordering, counterparty ? Counterparty_1.Counterparty.fromData(counterparty) : undefined, connection_hops, version);
    }
    toData() {
        const { state, ordering, counterparty, connection_hops, version } = this;
        const res = {
            state,
            ordering,
            counterparty: counterparty ? counterparty.toData() : undefined,
            connection_hops,
            version,
        };
        return res;
    }
    static fromProto(proto) {
        return new Channel(proto.state, proto.ordering, proto.counterparty
            ? Counterparty_1.Counterparty.fromProto(proto.counterparty)
            : undefined, proto.connectionHops, proto.version);
    }
    toProto() {
        const { state, ordering, counterparty, connection_hops, version } = this;
        return channel_1.Channel.fromPartial({
            state,
            ordering,
            counterparty: counterparty ? counterparty.toProto() : undefined,
            connectionHops: connection_hops,
            version,
        });
    }
}
exports.Channel = Channel;
//# sourceMappingURL=Channel.js.map