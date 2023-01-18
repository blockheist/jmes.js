"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MsgCreateVestingAccount = void 0;
const Coins_1 = require("../../Coins");
const json_1 = require("../../../util/json");
const any_1 = require("@terra-money/terra.proto/google/protobuf/any");
const tx_1 = require("@terra-money/terra.proto/cosmos/vesting/v1beta1/tx");
const long_1 = __importDefault(require("long"));
/**
 * MsgCreateVestingAccount defines a message that enables creating a vesting account.
 */
class MsgCreateVestingAccount extends json_1.JSONSerializable {
    /**
     * @param from_address sender's address
     * @param to_address recipient's address
     * @param amount value of the transaction
     */
    constructor(from_address, to_address, amount, end_time, delayed) {
        super();
        this.from_address = from_address;
        this.to_address = to_address;
        this.end_time = end_time;
        this.delayed = delayed;
        this.amount = new Coins_1.Coins(amount);
    }
    static fromAmino(data, isClassic) {
        if (isClassic) {
            throw new Error('Not supported for the network');
        }
        const { value: { from_address, to_address, amount, end_time, delayed }, } = data;
        return new MsgCreateVestingAccount(from_address, to_address, Coins_1.Coins.fromAmino(amount), Number.parseInt(end_time), delayed);
    }
    toAmino(isClassic) {
        if (isClassic) {
            throw new Error('Not supported for the network');
        }
        const { from_address, to_address, amount, end_time, delayed } = this;
        return {
            type: 'cosmos-sdk/MsgCreateVestingAccount',
            value: {
                from_address,
                to_address,
                amount: amount.toAmino(),
                end_time: end_time.toFixed(),
                delayed,
            },
        };
    }
    static fromData(data, isClassic) {
        if (isClassic) {
            throw new Error('Not supported for the network');
        }
        const { from_address, to_address, amount, end_time, delayed } = data;
        return new MsgCreateVestingAccount(from_address, to_address, Coins_1.Coins.fromData(amount), Number.parseInt(end_time), delayed);
    }
    toData(isClassic) {
        if (isClassic) {
            throw new Error('Not supported for the network');
        }
        const { from_address, to_address, amount, end_time, delayed } = this;
        return {
            '@type': '/cosmos.vesting.v1beta1.MsgCreateVestingAccount',
            from_address,
            to_address,
            amount: amount.toData(),
            end_time: end_time.toFixed(),
            delayed,
        };
    }
    static fromProto(proto, isClassic) {
        if (isClassic) {
            throw new Error('Not supported for the network');
        }
        return new MsgCreateVestingAccount(proto.fromAddress, proto.toAddress, Coins_1.Coins.fromProto(proto.amount), proto.endTime.toNumber(), proto.delayed);
    }
    toProto(isClassic) {
        if (isClassic) {
            throw new Error('Not supported for the network');
        }
        const { from_address, to_address, amount, end_time, delayed } = this;
        return tx_1.MsgCreateVestingAccount.fromPartial({
            fromAddress: from_address,
            toAddress: to_address,
            amount: amount.toProto(),
            endTime: long_1.default.fromNumber(end_time),
            delayed,
        });
    }
    packAny(isClassic) {
        if (isClassic) {
            throw new Error('Not supported for the network');
        }
        return any_1.Any.fromPartial({
            typeUrl: '/cosmos.vesting.v1beta1.MsgCreateVestingAccount',
            value: tx_1.MsgCreateVestingAccount.encode(this.toProto(isClassic)).finish(),
        });
    }
    static unpackAny(msgAny, isClassic) {
        if (isClassic) {
            throw new Error('Not supported for the network');
        }
        return MsgCreateVestingAccount.fromProto(tx_1.MsgCreateVestingAccount.decode(msgAny.value), isClassic);
    }
}
exports.MsgCreateVestingAccount = MsgCreateVestingAccount;
//# sourceMappingURL=MsgCreateVestingAccount.js.map