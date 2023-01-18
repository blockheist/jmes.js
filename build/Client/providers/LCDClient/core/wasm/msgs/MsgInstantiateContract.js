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
exports.MsgInstantiateContract = void 0;
const json_1 = require("../../../util/json");
const Coins_1 = require("../../Coins");
const any_1 = require("@jmesworld/jmes.proto/src/google/protobuf/any");
const tx_1 = require("@terra-money/legacy.proto/terra/wasm/v1beta1/tx");
const tx_2 = require("@jmesworld/jmes.proto/cosmwasm/wasm/v1/tx");
const Long = __importStar(require("long"));
class MsgInstantiateContract extends json_1.JSONSerializable {
    /**
     * @param sender is a sender address
     * @param admin is an optional contract admin address who can migrate the contract, put empty string to disable migration
     * @param code_id is the reference to the stored WASM code
     * @param init_msg json encoded message to be passed to the contract on instantiation
     * @param init_coins are transferred to the contract on execution
     * @param label label for the contract. v2 supported only
     */
    constructor(sender, admin, code_id, init_msg, init_coins = {}, label) {
        super();
        this.sender = sender;
        this.admin = admin;
        this.code_id = code_id;
        this.init_msg = init_msg;
        this.label = label;
        this.init_coins = new Coins_1.Coins(init_coins);
    }
    static fromAmino(data, isClassic) {
        if (isClassic) {
            const { value: { sender, admin, code_id, init_msg, init_coins }, } = data;
            return new MsgInstantiateContract(sender, admin, Number.parseInt(code_id), init_msg, Coins_1.Coins.fromAmino(init_coins));
        }
        {
            const { value: { sender, admin, code_id, msg, funds, label }, } = data;
            return new MsgInstantiateContract(sender, admin, Number.parseInt(code_id), msg, Coins_1.Coins.fromAmino(funds), label);
        }
    }
    toAmino(isClassic) {
        const { sender, admin, code_id, init_msg, init_coins, label } = this;
        if (isClassic) {
            return {
                type: 'wasm/MsgInstantiateContract',
                value: {
                    sender,
                    admin,
                    code_id: code_id.toFixed(),
                    init_msg: (0, json_1.removeNull)(init_msg),
                    init_coins: init_coins.toAmino(),
                },
            };
        }
        else {
            return {
                type: 'wasm/MsgInstantiateContract',
                value: {
                    sender,
                    admin,
                    code_id: code_id.toFixed(),
                    label,
                    msg: (0, json_1.removeNull)(init_msg),
                    funds: init_coins.toAmino(),
                },
            };
        }
    }
    static fromProto(proto, isClassic) {
        if (isClassic) {
            const p = proto;
            return new MsgInstantiateContract(p.sender, p.admin !== '' ? p.admin : undefined, p.codeId.toNumber(), JSON.parse(Buffer.from(p.initMsg).toString('utf-8')), Coins_1.Coins.fromProto(p.initCoins));
        }
        else {
            const p = proto;
            return new MsgInstantiateContract(p.sender, p.admin !== '' ? p.admin : undefined, p.codeId.toNumber(), JSON.parse(Buffer.from(p.msg).toString('utf-8')), Coins_1.Coins.fromProto(p.funds), p.label !== '' ? p.label : undefined);
        }
    }
    toProto(isClassic) {
        const { sender, admin, code_id, init_msg, init_coins, label } = this;
        if (isClassic) {
            return tx_1.MsgInstantiateContract.fromPartial({
                admin,
                codeId: Long.fromNumber(code_id),
                initCoins: init_coins.toProto(),
                initMsg: Buffer.from(JSON.stringify(init_msg), 'utf-8'),
                sender,
            });
        }
        else {
            return tx_2.MsgInstantiateContract.fromPartial({
                admin,
                codeId: Long.fromNumber(code_id),
                funds: init_coins.toProto(),
                msg: Buffer.from(JSON.stringify(init_msg), 'utf-8'),
                sender,
                label,
            });
        }
    }
    packAny(isClassic) {
        if (isClassic) {
            return any_1.Any.fromPartial({
                typeUrl: '/jmes.wasm.v1beta1.MsgInstantiateContract',
                value: tx_1.MsgInstantiateContract.encode(this.toProto(isClassic)).finish(),
            });
        }
        else {
            return any_1.Any.fromPartial({
                typeUrl: '/cosmwasm.wasm.v1.MsgInstantiateContract',
                value: tx_2.MsgInstantiateContract.encode(this.toProto(isClassic)).finish(),
            });
        }
    }
    static unpackAny(msgAny, isClassic) {
        if (isClassic) {
            return MsgInstantiateContract.fromProto(tx_1.MsgInstantiateContract.decode(msgAny.value), isClassic);
        }
        else {
            return MsgInstantiateContract.fromProto(tx_2.MsgInstantiateContract.decode(msgAny.value), isClassic);
        }
    }
    static fromData(data, isClassic) {
        if (isClassic) {
            const { sender, admin, code_id, init_msg, init_coins } = data;
            return new MsgInstantiateContract(sender, admin !== '' ? admin : undefined, Number.parseInt(code_id), init_msg, Coins_1.Coins.fromData(init_coins));
        }
        else {
            const { sender, admin, code_id, label, msg, funds } = data;
            return new MsgInstantiateContract(sender, admin !== '' ? admin : undefined, Number.parseInt(code_id), msg, Coins_1.Coins.fromData(funds), label);
        }
    }
    toData(isClassic) {
        const { sender, admin, code_id, label, init_msg, init_coins } = this;
        if (isClassic) {
            return {
                '@type': '/jmes.wasm.v1beta1.MsgInstantiateContract',
                sender,
                admin: admin || '',
                code_id: code_id.toFixed(),
                init_msg: (0, json_1.removeNull)(init_msg),
                init_coins: init_coins.toData(),
            };
        }
        else {
            return {
                '@type': '/cosmwasm.wasm.v1.MsgInstantiateContract',
                sender,
                admin: admin || '',
                code_id: code_id.toFixed(),
                label,
                msg: (0, json_1.removeNull)(init_msg),
                funds: init_coins.toData(),
            };
        }
    }
}
exports.MsgInstantiateContract = MsgInstantiateContract;
//# sourceMappingURL=MsgInstantiateContract.js.map