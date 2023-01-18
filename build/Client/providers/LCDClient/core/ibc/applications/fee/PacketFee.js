"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PacketFee = void 0;
const fee_1 = require("@terra-money/terra.proto/ibc/applications/fee/v1/fee");
const json_1 = require("../../../../util/json");
const Fee_1 = require("./Fee");
/**
 *  PacketFee contains ICS29 relayer fees, refund address and optional list of permitted relayers
 */
class PacketFee extends json_1.JSONSerializable {
    /**
     * @param fee fee encapsulates the recv, ack and timeout fees associated with an IBC packet
     * @param refund_address the refund address for unspent fees
     * @param relayers  optional list of relayers permitted to receive fees
     */
    constructor(fee, refund_address, relayers = []) {
        super();
        this.fee = fee;
        this.refund_address = refund_address;
        this.relayers = relayers;
    }
    static fromAmino(data) {
        const { fee, refund_address, relayers } = data;
        return new PacketFee(fee ? Fee_1.Fee.fromAmino(fee) : undefined, refund_address, relayers);
    }
    toAmino() {
        const { fee, refund_address, relayers } = this;
        const res = {
            fee: fee === null || fee === void 0 ? void 0 : fee.toAmino(),
            refund_address,
            relayers
        };
        return res;
    }
    static fromData(data) {
        const { fee, refund_address, relayers } = data;
        return new PacketFee(fee ? Fee_1.Fee.fromData(fee) : undefined, refund_address, relayers);
    }
    toData() {
        const { fee, refund_address, relayers } = this;
        const res = {
            fee: fee === null || fee === void 0 ? void 0 : fee.toData(),
            refund_address,
            relayers
        };
        return res;
    }
    static fromProto(proto) {
        return new PacketFee(proto.fee ? Fee_1.Fee.fromProto(proto.fee) : undefined, proto.refundAddress, proto.relayers);
    }
    toProto() {
        const { fee, refund_address, relayers } = this;
        return fee_1.PacketFee.fromPartial({
            fee: fee === null || fee === void 0 ? void 0 : fee.toProto(),
            refundAddress: refund_address,
            relayers: relayers
        });
    }
}
exports.PacketFee = PacketFee;
//# sourceMappingURL=PacketFee.js.map