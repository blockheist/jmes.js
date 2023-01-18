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
exports.MsgTransfer = void 0;
const json_1 = require("../../../../../../util/json");
const Coin_1 = require("../../../../../Coin");
const Long = __importStar(require("long"));
const any_1 = require("@terra-money/terra.proto/google/protobuf/any");
const tx_1 = require("@terra-money/terra.proto/ibc/applications/transfer/v1/tx");
const Height_1 = require("../../../../core/client/Height");
const numeric_1 = require("../../../../../numeric");
/**
 * A basic message for transfer [[Coin]] via IBC.
 */
class MsgTransfer extends json_1.JSONSerializable {
    /**
     * @param source_port the port on which the packet will be sent
     * @param source_channel  the channel by which the packet will be sent
     * @param token the tokens to be transferred
     * @param sender the sender address
     * @param receiver the recipient address on the destination chain
     * @param timeout_height Timeout height relative to the current block height. (0 to disable)
     * @param timeout_timestamp Timeout timestamp (in nanoseconds) relative to the current block timestamp. (0 to disable)
     */
    constructor(source_port, source_channel, token, sender, receiver, timeout_height, timeout_timestamp) {
        super();
        if (!timeout_height && !timeout_timestamp) {
            throw 'both of timeout_height and timeout_timestamp are undefined';
        }
        this.source_port = source_port;
        this.source_channel = source_channel;
        this.token = token;
        this.sender = sender;
        this.receiver = receiver;
        this.timeout_height = timeout_height;
        this.timeout_timestamp = timeout_timestamp
            ? numeric_1.Numeric.parse(timeout_timestamp)
            : undefined;
    }
    static fromAmino(data, _) {
        _;
        const { value: { source_port, source_channel, token, sender, receiver, timeout_height, timeout_timestamp, }, } = data;
        if (!timeout_height && !timeout_timestamp) {
            throw 'both of timeout_height and timeout_timestamp are undefined';
        }
        return new MsgTransfer(source_port, source_channel, token ? Coin_1.Coin.fromAmino(token) : undefined, sender, receiver, timeout_height ? Height_1.Height.fromAmino(timeout_height) : undefined, timeout_timestamp ? numeric_1.Numeric.parse(timeout_timestamp) : undefined);
    }
    toAmino(_) {
        _;
        const { source_port, source_channel, token, sender, receiver, timeout_height, timeout_timestamp, } = this;
        return {
            type: 'cosmos-sdk/MsgTransfer',
            value: {
                source_port,
                source_channel,
                token: token ? token.toAmino() : undefined,
                sender,
                receiver,
                timeout_height: (timeout_height === null || timeout_height === void 0 ? void 0 : timeout_height.toAmino()) || {},
                timeout_timestamp: (timeout_timestamp === null || timeout_timestamp === void 0 ? void 0 : timeout_timestamp.toFixed()) || undefined,
            },
        };
    }
    static fromData(data, _) {
        _;
        const { source_port, source_channel, token, sender, receiver, timeout_timestamp, timeout_height, } = data;
        if (!timeout_height && !timeout_timestamp) {
            throw 'both of timeout_height and timeout_timestamp are undefined';
        }
        return new MsgTransfer(source_port, source_channel, token ? Coin_1.Coin.fromData(token) : undefined, sender, receiver, timeout_height ? Height_1.Height.fromData(timeout_height) : undefined, timeout_timestamp ? Number.parseInt(timeout_timestamp) : undefined);
    }
    toData(_) {
        _;
        const { source_port, source_channel, token, sender, receiver, timeout_height, timeout_timestamp, } = this;
        return {
            '@type': '/ibc.applications.transfer.v1.MsgTransfer',
            source_port,
            source_channel,
            token: token ? token.toData() : undefined,
            sender,
            receiver,
            timeout_height: timeout_height
                ? timeout_height.toData()
                : new Height_1.Height(0, 0).toData(),
            timeout_timestamp: (timeout_timestamp === null || timeout_timestamp === void 0 ? void 0 : timeout_timestamp.toFixed()) || '0',
        };
    }
    static fromProto(proto, _) {
        _;
        if (!proto.timeoutHeight && proto.timeoutTimestamp.toNumber() == 0) {
            throw 'both of timeout_height and timeout_timestamp are empty';
        }
        return new MsgTransfer(proto.sourcePort, proto.sourceChannel, proto.token ? Coin_1.Coin.fromProto(proto.token) : undefined, proto.sender, proto.receiver, proto.timeoutHeight ? Height_1.Height.fromProto(proto.timeoutHeight) : undefined, proto.timeoutTimestamp.toNumber());
    }
    toProto(_) {
        _;
        const { source_port, source_channel, token, sender, receiver, timeout_height, timeout_timestamp, } = this;
        return tx_1.MsgTransfer.fromPartial({
            sourcePort: source_port,
            sourceChannel: source_channel,
            token: token ? token.toProto() : undefined,
            sender,
            receiver,
            timeoutHeight: timeout_height ? timeout_height.toProto() : undefined,
            timeoutTimestamp: Long.fromString((timeout_timestamp === null || timeout_timestamp === void 0 ? void 0 : timeout_timestamp.toFixed()) || '0'),
        });
    }
    packAny(isClassic) {
        return any_1.Any.fromPartial({
            typeUrl: '/ibc.applications.transfer.v1.MsgTransfer',
            value: tx_1.MsgTransfer.encode(this.toProto(isClassic)).finish(),
        });
    }
    static unpackAny(msgAny, isClassic) {
        return MsgTransfer.fromProto(tx_1.MsgTransfer.decode(msgAny.value), isClassic);
    }
}
exports.MsgTransfer = MsgTransfer;
//# sourceMappingURL=MsgTransfer.js.map