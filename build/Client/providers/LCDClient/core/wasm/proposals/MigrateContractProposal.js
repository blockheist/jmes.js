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
exports.MigrateContractProposal = void 0;
const json_1 = require("../../../util/json");
const any_1 = require("@jmesworld/jmes.proto/src/google/protobuf/any");
const proposal_1 = require("@jmesworld/jmes.proto/cosmwasm/wasm/v1/proposal");
const Long = __importStar(require("long"));
/** MigrateContractProposal gov proposal content type to migrate a contract. */
class MigrateContractProposal extends json_1.JSONSerializable {
    /**
     * @param title a short summary
     * @param description a human readable text
     * @param contract contract address to be migrated from
     * @param new_code_id reference to the new code on the blockchain
     * @param migrate_msg JSON message to configure the migrate state of the contract
     */
    constructor(title, description, contract, new_code_id, migrate_msg // json object or string
    ) {
        super();
        this.title = title;
        this.description = description;
        this.contract = contract;
        this.new_code_id = new_code_id;
        this.migrate_msg = migrate_msg;
    }
    static fromAmino(data, isClassic) {
        if (isClassic) {
            throw new Error('Not supported for the network');
        }
        const { value: { title, description, contract, code_id, msg }, } = data;
        return new MigrateContractProposal(title, description, contract, Number.parseInt(code_id), msg);
    }
    toAmino(isClassic) {
        if (isClassic) {
            throw new Error('Not supported for the network');
        }
        const { title, description, contract, new_code_id, migrate_msg } = this;
        return {
            type: 'wasm/MigrateContractProposal',
            value: {
                title,
                description,
                contract,
                code_id: new_code_id.toFixed(),
                msg: (0, json_1.removeNull)(migrate_msg),
            },
        };
    }
    static fromProto(proto, isClassic) {
        if (isClassic) {
            throw new Error('Not supported for the network');
        }
        return new MigrateContractProposal(proto.title, proto.description, proto.contract, proto.codeId.toNumber(), JSON.parse(Buffer.from(proto.msg).toString('utf-8')));
    }
    toProto(isClassic) {
        if (isClassic) {
            throw new Error('Not supported for the network');
        }
        const { title, description, contract, new_code_id, migrate_msg } = this;
        return proposal_1.MigrateContractProposal.fromPartial({
            title,
            description,
            contract,
            codeId: Long.fromNumber(new_code_id),
            msg: Buffer.from(JSON.stringify(migrate_msg), 'utf-8'),
        });
    }
    packAny(isClassic) {
        if (isClassic) {
            throw new Error('Not supported for the network');
        }
        return any_1.Any.fromPartial({
            typeUrl: '/cosmwasm.wasm.v1.MigrateContractProposal',
            value: proposal_1.MigrateContractProposal.encode(this.toProto(isClassic)).finish(),
        });
    }
    static unpackAny(msgAny, isClassic) {
        if (isClassic) {
            throw new Error('Not supported for the network');
        }
        return MigrateContractProposal.fromProto(proposal_1.MigrateContractProposal.decode(msgAny.value), isClassic);
    }
    static fromData(data, isClassic) {
        if (isClassic) {
            throw new Error('Not supported for the network');
        }
        const { title, description, contract, code_id, msg } = data;
        return new MigrateContractProposal(title, description, contract, Number.parseInt(code_id), msg);
    }
    toData(isClassic) {
        if (isClassic) {
            throw new Error('Not supported for the network');
        }
        const { title, description, contract, new_code_id, migrate_msg } = this;
        return {
            '@type': '/cosmwasm.wasm.v1.MigrateContractProposal',
            title,
            description,
            contract,
            code_id: new_code_id.toFixed(),
            msg: (0, json_1.removeNull)(migrate_msg),
        };
    }
}
exports.MigrateContractProposal = MigrateContractProposal;
//# sourceMappingURL=MigrateContractProposal.js.map