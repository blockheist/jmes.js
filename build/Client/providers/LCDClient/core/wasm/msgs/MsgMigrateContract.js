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
exports.MsgMigrateContract = void 0;
const json_1 = require("../../../util/json");
const any_1 = require("@jmesworld/jmes.proto/src/google/protobuf/any");
const tx_1 = require("@terra-money/legacy.proto/terra/wasm/v1beta1/tx");
const tx_2 = require("@jmesworld/jmes.proto/cosmwasm/wasm/v1/tx");
const Long = __importStar(require("long"));
class MsgMigrateContract extends json_1.JSONSerializable {
    /**
     * @param admin contract admin
     * @param contract contract address to be migrated from
     * @param new_code_id reference to the new code on the blockchain
     * @param migrate_msg JSON message to configure the migrate state of the contract
     */
    constructor(admin, contract, new_code_id, migrate_msg // json object or string
    ) {
        super();
        this.admin = admin;
        this.contract = contract;
        this.new_code_id = new_code_id;
        this.migrate_msg = migrate_msg;
    }
    static fromAmino(data, isClassic) {
        if (isClassic) {
            const { value: { admin, contract, new_code_id, migrate_msg }, } = data;
            return new MsgMigrateContract(admin, contract, Number.parseInt(new_code_id), migrate_msg);
        }
        else {
            const { value: { sender, contract, code_id, msg }, } = data;
            return new MsgMigrateContract(sender, contract, Number.parseInt(code_id), msg);
        }
    }
    toAmino(isClassic) {
        if (isClassic) {
            const { admin, contract, new_code_id, migrate_msg } = this;
            return {
                type: 'wasm/MsgMigrateContract',
                value: {
                    admin,
                    contract,
                    new_code_id: new_code_id.toFixed(),
                    migrate_msg: (0, json_1.removeNull)(migrate_msg),
                },
            };
        }
        else {
            const { admin, contract, new_code_id, migrate_msg } = this;
            return {
                type: 'wasm/MsgMigrateContract',
                value: {
                    sender: admin,
                    contract,
                    code_id: new_code_id.toFixed(),
                    msg: (0, json_1.removeNull)(migrate_msg),
                },
            };
        }
    }
    static fromProto(proto, isClassic) {
        if (isClassic) {
            const p = proto;
            return new MsgMigrateContract(p.admin, p.contract, p.newCodeId.toNumber(), JSON.parse(Buffer.from(p.migrateMsg).toString('utf-8')));
        }
        else {
            const p = proto;
            return new MsgMigrateContract(p.sender, p.contract, p.codeId.toNumber(), JSON.parse(Buffer.from(p.msg).toString('utf-8')));
        }
    }
    toProto(isClassic) {
        const { admin, contract, new_code_id, migrate_msg } = this;
        if (isClassic) {
            return tx_1.MsgMigrateContract.fromPartial({
                admin,
                contract,
                newCodeId: Long.fromNumber(new_code_id),
                migrateMsg: Buffer.from(JSON.stringify(migrate_msg), 'utf-8'),
            });
        }
        else {
            return tx_2.MsgMigrateContract.fromPartial({
                sender: admin,
                contract,
                codeId: Long.fromNumber(new_code_id),
                msg: Buffer.from(JSON.stringify(migrate_msg), 'utf-8'),
            });
        }
    }
    packAny(isClassic) {
        if (isClassic) {
            return any_1.Any.fromPartial({
                typeUrl: '/jmes.wasm.v1beta1.MsgMigrateContract',
                value: tx_1.MsgMigrateContract.encode(this.toProto(isClassic)).finish(),
            });
        }
        else {
            return any_1.Any.fromPartial({
                typeUrl: '/cosmwasm.wasm.v1.MsgMigrateContract',
                value: tx_2.MsgMigrateContract.encode(this.toProto(isClassic)).finish(),
            });
        }
    }
    static unpackAny(msgAny, isClassic) {
        return MsgMigrateContract.fromProto(isClassic
            ? tx_1.MsgMigrateContract.decode(msgAny.value)
            : tx_2.MsgMigrateContract.decode(msgAny.value), isClassic);
    }
    static fromData(data, isClassic) {
        if (isClassic) {
            const { admin, contract, new_code_id, migrate_msg } = data;
            return new MsgMigrateContract(admin, contract, Number.parseInt(new_code_id), migrate_msg);
        }
        else {
            const { sender, contract, code_id, msg } = data;
            return new MsgMigrateContract(sender, contract, Number.parseInt(code_id), msg);
        }
    }
    toData(isClassic) {
        const { admin, contract, new_code_id, migrate_msg } = this;
        if (isClassic) {
            return {
                '@type': '/jmes.wasm.v1beta1.MsgMigrateContract',
                admin,
                contract,
                new_code_id: new_code_id.toFixed(),
                migrate_msg: (0, json_1.removeNull)(migrate_msg),
            };
        }
        else {
            return {
                '@type': '/cosmwasm.wasm.v1.MsgMigrateContract',
                sender: admin,
                contract,
                code_id: new_code_id.toFixed(),
                msg: (0, json_1.removeNull)(migrate_msg),
            };
        }
    }
}
exports.MsgMigrateContract = MsgMigrateContract;
//# sourceMappingURL=MsgMigrateContract.js.map