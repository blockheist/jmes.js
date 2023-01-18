"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MsgSend = void 0;
const Coins_1 = require("../../Coins");
const json_1 = require("../../../util/json");
const any_1 = require("@terra-money/legacy.proto/google/protobuf/any");
// there's no difference between two protos
//import { MsgSend as MsgSend_legacy_pb } from '@terra-money/legacy.proto/cosmos/bank/v1beta1/tx';
const tx_1 = require("@terra-money/terra.proto/cosmos/bank/v1beta1/tx");
/**
 * A basic message for sending [[Coins]] between Terra accounts.
 */
class MsgSend extends json_1.JSONSerializable {
    /**
     * @param from_address sender's address
     * @param to_address recipient's address
     * @param amount value of the transaction
     */
    constructor(from_address, to_address, amount) {
        super();
        this.from_address = from_address;
        this.to_address = to_address;
        this.amount = new Coins_1.Coins(amount);
    }
    static fromAmino(data, _) {
        _;
        const { value: { from_address, to_address, amount }, } = data;
        return new MsgSend(from_address, to_address, Coins_1.Coins.fromAmino(amount));
    }
    toAmino(isClassic) {
        const { from_address, to_address, amount } = this;
        return {
            type: isClassic ? 'bank/MsgSend' : 'cosmos-sdk/MsgSend',
            value: {
                from_address,
                to_address,
                amount: amount.toAmino(),
            },
        };
    }
    static fromData(data, isClassic) {
        isClassic;
        const { from_address, to_address, amount } = data;
        return new MsgSend(from_address, to_address, Coins_1.Coins.fromData(amount));
    }
    toData(_) {
        _;
        const { from_address, to_address, amount } = this;
        return {
            '@type': '/cosmos.bank.v1beta1.MsgSend',
            from_address,
            to_address,
            amount: amount.toData(),
        };
    }
    static fromProto(proto, _) {
        _;
        return new MsgSend(proto.fromAddress, proto.toAddress, Coins_1.Coins.fromProto(proto.amount));
    }
    toProto(_) {
        _;
        const { from_address, to_address, amount } = this;
        return tx_1.MsgSend.fromPartial({
            fromAddress: from_address,
            toAddress: to_address,
            amount: amount.toProto(),
        });
    }
    packAny(isClassic) {
        return any_1.Any.fromPartial({
            typeUrl: '/cosmos.bank.v1beta1.MsgSend',
            value: tx_1.MsgSend.encode(this.toProto(isClassic)).finish(),
        });
    }
    static unpackAny(msgAny, isClassic) {
        return MsgSend.fromProto(tx_1.MsgSend.decode(msgAny.value), isClassic);
    }
}
exports.MsgSend = MsgSend;
//# sourceMappingURL=MsgSend.js.map