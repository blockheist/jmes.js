"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FungibleTokenPacketData = void 0;
const packet_1 = require("@terra-money/terra.proto/ibc/applications/transfer/v2/packet");
const json_1 = require("../../../../../util/json");
/**
 *  FungibleTokenPacketData defines a struct for the packet payload
 * See FungibleTokenPacketData spec:
 * https://github.com/cosmos/ibc/tree/master/spec/app/ics-020-fungible-token-transfer#data-structures
 */
class FungibleTokenPacketData extends json_1.JSONSerializable {
    /**
     * @param denom the token denomination to be transferred
     * @param amount the token amount to be transferred
     * @param sender the sender address
     * @param receiver the recipient address on the destination chain
     */
    constructor(denom, amount, sender, receiver) {
        super();
        this.denom = denom;
        this.amount = amount;
        this.sender = sender;
        this.receiver = receiver;
    }
    static fromAmino(data) {
        const { denom, amount, sender, receiver } = data;
        return new FungibleTokenPacketData(denom, amount, sender, receiver);
    }
    toAmino() {
        const { denom, amount, sender, receiver } = this;
        const res = {
            denom,
            amount,
            sender,
            receiver,
        };
        return res;
    }
    static fromData(data) {
        const { denom, amount, sender, receiver } = data;
        return new FungibleTokenPacketData(denom, amount, sender, receiver);
    }
    toData() {
        const { denom, amount, sender, receiver } = this;
        const res = {
            denom,
            amount,
            sender,
            receiver
        };
        return res;
    }
    static fromProto(proto) {
        return new FungibleTokenPacketData(proto.denom, proto.amount, proto.sender, proto.receiver);
    }
    toProto() {
        const { denom, amount, sender, receiver } = this;
        return packet_1.FungibleTokenPacketData.fromPartial({
            denom,
            amount,
            sender,
            receiver
        });
    }
}
exports.FungibleTokenPacketData = FungibleTokenPacketData;
//# sourceMappingURL=FungibleTokenPacketData.js.map