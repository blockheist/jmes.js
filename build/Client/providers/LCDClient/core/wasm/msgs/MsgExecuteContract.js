"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MsgExecuteContract = void 0;
const json_1 = require("../../../util/json");
const Coins_1 = require("../../Coins");
const any_1 = require("@jmesworld/jmes.proto/src/google/protobuf/any");
const tx_1 = require("@terra-money/legacy.proto/terra/wasm/v1beta1/tx");
const tx_2 = require("@jmesworld/jmes.proto/cosmwasm/wasm/v1/tx");
class MsgExecuteContract extends json_1.JSONSerializable {
    /**
     * @param sender contract user
     * @param contract contract address
     * @param execute_msg HandleMsg to pass as arguments for contract invocation
     * @param coins coins to be sent to contract
     */
    constructor(sender, contract, execute_msg, coins = {}) {
        super();
        this.sender = sender;
        this.contract = contract;
        this.execute_msg = execute_msg;
        this.coins = new Coins_1.Coins(coins);
    }
    static fromAmino(data, isClassic) {
        if (isClassic) {
            const { value: { sender, contract, execute_msg, coins }, } = data;
            return new MsgExecuteContract(sender, contract, execute_msg, Coins_1.Coins.fromAmino(coins));
        }
        else {
            const { value: { sender, contract, msg, funds }, } = data;
            return new MsgExecuteContract(sender, contract, msg, Coins_1.Coins.fromAmino(funds));
        }
    }
    toAmino(isClassic) {
        const { sender, contract, execute_msg, coins } = this;
        if (isClassic) {
            return {
                type: 'wasm/MsgExecuteContract',
                value: {
                    sender,
                    contract,
                    execute_msg: (0, json_1.removeNull)(execute_msg),
                    coins: coins.toAmino(),
                },
            };
        }
        else {
            return {
                type: 'wasm/MsgExecuteContract',
                value: {
                    sender,
                    contract,
                    msg: (0, json_1.removeNull)(execute_msg),
                    funds: coins.toAmino(),
                },
            };
        }
    }
    static fromProto(proto, isClassic) {
        if (isClassic) {
            const p = proto;
            return new MsgExecuteContract(p.sender, p.contract, JSON.parse(Buffer.from(p.executeMsg).toString('utf-8')), Coins_1.Coins.fromProto(p.coins));
        }
        else {
            const p = proto;
            return new MsgExecuteContract(p.sender, p.contract, JSON.parse(Buffer.from(p.msg).toString('utf-8')), Coins_1.Coins.fromProto(p.funds));
        }
    }
    toProto(isClassic) {
        const { sender, contract, execute_msg, coins } = this;
        if (isClassic) {
            return tx_1.MsgExecuteContract.fromPartial({
                coins: coins.toProto(),
                contract,
                sender,
                executeMsg: Buffer.from(JSON.stringify((0, json_1.removeNull)(execute_msg)), 'utf-8'),
            });
        }
        else {
            return tx_2.MsgExecuteContract.fromPartial({
                funds: coins.toProto(),
                contract,
                sender,
                msg: Buffer.from(JSON.stringify((0, json_1.removeNull)(execute_msg)), 'utf-8'),
            });
        }
    }
    packAny(isClassic) {
        if (isClassic) {
            return any_1.Any.fromPartial({
                typeUrl: '/jmes.wasm.v1beta1.MsgExecuteContract',
                value: tx_1.MsgExecuteContract.encode(this.toProto(isClassic)).finish(),
            });
        }
        else {
            return any_1.Any.fromPartial({
                typeUrl: '/cosmwasm.wasm.v1.MsgExecuteContract',
                value: tx_2.MsgExecuteContract.encode(this.toProto(isClassic)).finish(),
            });
        }
    }
    static unpackAny(msgAny, isClassic) {
        return MsgExecuteContract.fromProto(isClassic
            ? tx_1.MsgExecuteContract.decode(msgAny.value)
            : tx_2.MsgExecuteContract.decode(msgAny.value), isClassic);
    }
    static fromData(data, isClassic) {
        if (isClassic) {
            const { sender, contract, execute_msg, coins } = data;
            return new MsgExecuteContract(sender, contract, execute_msg, Coins_1.Coins.fromData(coins));
        }
        else {
            const { sender, contract, msg, funds } = data;
            return new MsgExecuteContract(sender, contract, msg, Coins_1.Coins.fromData(funds));
        }
    }
    toData(isClassic) {
        const { sender, contract, execute_msg, coins } = this;
        if (isClassic) {
            return {
                '@type': '/jmes.wasm.v1beta1.MsgExecuteContract',
                sender,
                contract,
                execute_msg,
                coins: coins.toData(),
            };
        }
        else {
            return {
                '@type': '/cosmwasm.wasm.v1.MsgExecuteContract',
                sender,
                contract,
                msg: execute_msg,
                funds: coins.toData(),
            };
        }
    }
}
exports.MsgExecuteContract = MsgExecuteContract;
//# sourceMappingURL=MsgExecuteContract.js.map