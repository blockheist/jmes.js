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
exports.InstantiateContractProposal = void 0;
const json_1 = require("../../../util/json");
const Coins_1 = require("../../Coins");
const any_1 = require("@jmesworld/jmes.proto/src/google/protobuf/any");
const proposal_1 = require("@jmesworld/jmes.proto/cosmwasm/wasm/v1/proposal");
const Long = __importStar(require("long"));
/**
 * InstantiateContractProposal gov proposal content type to instantiate a
 * contract.
 */
class InstantiateContractProposal extends json_1.JSONSerializable {
    /**
     * @param title a short summary
     * @param description a human readable text
     * @param run_as is a run_as address
     * @param admin is an optional contract admin address who can migrate the contract, put empty string to disable migration
     * @param code_id is the reference to the stored WASM code
     * @param init_msg json encoded message to be passed to the contract on instantiation
     * @param init_coins are transferred to the contract on execution
     * @param label label for the contract. v2 supported only
     */
    constructor(title, description, run_as, admin, code_id, init_msg, init_coins = {}, label) {
        super();
        this.title = title;
        this.description = description;
        this.run_as = run_as;
        this.admin = admin;
        this.code_id = code_id;
        this.init_msg = init_msg;
        this.label = label;
        this.init_coins = new Coins_1.Coins(init_coins);
    }
    static fromAmino(data, isClassic) {
        if (isClassic) {
            throw new Error('Not supported for the network');
        }
        const { value: { title, description, run_as, admin, code_id, msg, funds, label }, } = data;
        return new InstantiateContractProposal(title, description, run_as, admin, Number.parseInt(code_id), msg, Coins_1.Coins.fromAmino(funds), label);
    }
    toAmino(isClassic) {
        const { title, description, run_as, admin, code_id, init_msg, init_coins, label, } = this;
        if (isClassic) {
            throw new Error('Not supported for the network');
        }
        return {
            type: 'wasm/InstantiateContractProposal',
            value: {
                title,
                description,
                run_as,
                admin,
                code_id: code_id.toFixed(),
                label,
                msg: (0, json_1.removeNull)(init_msg),
                funds: init_coins.toAmino(),
            },
        };
    }
    static fromProto(proto, isClassic) {
        if (isClassic) {
            throw new Error('Not supported for the network');
        }
        return new InstantiateContractProposal(proto.title, proto.description, proto.runAs, proto.admin !== '' ? proto.admin : undefined, proto.codeId.toNumber(), JSON.parse(Buffer.from(proto.msg).toString('utf-8')), Coins_1.Coins.fromProto(proto.funds), proto.label);
    }
    toProto(isClassic) {
        const { title, description, run_as, admin, code_id, init_msg, init_coins, label, } = this;
        if (isClassic) {
            throw new Error('Not supported for the network');
        }
        return proposal_1.InstantiateContractProposal.fromPartial({
            title,
            description,
            runAs: run_as,
            admin,
            codeId: Long.fromNumber(code_id),
            funds: init_coins.toProto(),
            msg: Buffer.from(JSON.stringify(init_msg), 'utf-8'),
            label,
        });
    }
    packAny(isClassic) {
        if (isClassic) {
            throw new Error('Not supported for the network');
        }
        return any_1.Any.fromPartial({
            typeUrl: '/cosmwasm.wasm.v1.InstantiateContractProposal',
            value: proposal_1.InstantiateContractProposal.encode(this.toProto(isClassic)).finish(),
        });
    }
    static unpackAny(msgAny, isClassic) {
        if (isClassic) {
            throw new Error('Not supported for the network');
        }
        return InstantiateContractProposal.fromProto(proposal_1.InstantiateContractProposal.decode(msgAny.value), isClassic);
    }
    static fromData(data, isClassic) {
        if (isClassic) {
            throw new Error('Not supported for the network');
        }
        const { title, description, run_as, admin, code_id, label, msg, funds } = data;
        return new InstantiateContractProposal(title, description, run_as, admin !== '' ? admin : undefined, Number.parseInt(code_id), msg, Coins_1.Coins.fromData(funds), label);
    }
    toData(isClassic) {
        const { title, description, run_as, admin, code_id, label, init_msg, init_coins, } = this;
        if (isClassic) {
            throw new Error('Not supported for the network');
        }
        return {
            '@type': '/cosmwasm.wasm.v1.InstantiateContractProposal',
            title,
            description,
            run_as,
            admin: admin || '',
            code_id: code_id.toFixed(),
            label,
            msg: (0, json_1.removeNull)(init_msg),
            funds: init_coins.toData(),
        };
    }
}
exports.InstantiateContractProposal = InstantiateContractProposal;
//# sourceMappingURL=InstantiateContractProposal.js.map