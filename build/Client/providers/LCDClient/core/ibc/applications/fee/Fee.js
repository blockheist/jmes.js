"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Fee = void 0;
const fee_1 = require("@terra-money/terra.proto/ibc/applications/fee/v1/fee");
const Coins_1 = require("../../../Coins");
const json_1 = require("../../../../util/json");
/**
 *  Fee defines the ICS29 receive, acknowledgement and timeout fees
 */
class Fee extends json_1.JSONSerializable {
    /**
     * @param recv_fee the packet receive fee
     * @param ack_fee the packet acknowledgement fee
     * @param timeout_fee the packet timeout fee
     */
    constructor(recv_fee, ack_fee, timeout_fee) {
        super();
        this.recv_fee = new Coins_1.Coins(recv_fee);
        this.ack_fee = new Coins_1.Coins(ack_fee);
        this.timeout_fee = new Coins_1.Coins(timeout_fee);
    }
    static fromAmino(data) {
        const { recv_fee, ack_fee, timeout_fee } = data;
        return new Fee(Coins_1.Coins.fromAmino(recv_fee), Coins_1.Coins.fromAmino(ack_fee), Coins_1.Coins.fromAmino(timeout_fee));
    }
    toAmino() {
        const { recv_fee, ack_fee, timeout_fee } = this;
        const res = {
            recv_fee: recv_fee.toAmino(),
            ack_fee: ack_fee.toAmino(),
            timeout_fee: timeout_fee.toAmino()
        };
        return res;
    }
    static fromData(data) {
        const { recv_fee, ack_fee, timeout_fee } = data;
        return new Fee(Coins_1.Coins.fromData(recv_fee), Coins_1.Coins.fromData(ack_fee), Coins_1.Coins.fromData(timeout_fee));
    }
    toData() {
        const { recv_fee, ack_fee, timeout_fee } = this;
        const res = {
            recv_fee: recv_fee.toData(),
            ack_fee: ack_fee.toData(),
            timeout_fee: timeout_fee.toData()
        };
        return res;
    }
    static fromProto(proto) {
        return new Fee(Coins_1.Coins.fromProto(proto.recvFee), Coins_1.Coins.fromProto(proto.ackFee), Coins_1.Coins.fromProto(proto.timeoutFee));
    }
    toProto() {
        const { recv_fee, ack_fee, timeout_fee } = this;
        return fee_1.Fee.fromPartial({
            recvFee: recv_fee.toProto(),
            ackFee: ack_fee.toProto(),
            timeoutFee: timeout_fee.toProto(),
        });
    }
}
exports.Fee = Fee;
//# sourceMappingURL=Fee.js.map