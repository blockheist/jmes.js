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
exports.UnpinCodesProposal = void 0;
const json_1 = require("../../../util/json");
const any_1 = require("@jmesworld/jmes.proto/src/google/protobuf/any");
const proposal_1 = require("@jmesworld/jmes.proto/cosmwasm/wasm/v1/proposal");
const Long = __importStar(require("long"));
/**
 * UnpinCodesProposal gov proposal content type to unpin a set of code ids in
 * the wasmvm cache.
 */
class UnpinCodesProposal extends json_1.JSONSerializable {
    /**
     * @param title a short summary
     * @param description a human readable text
     * @param code_ids the address of the smart code_ids
     */
    constructor(title, description, code_ids) {
        super();
        this.title = title;
        this.description = description;
        this.code_ids = code_ids;
    }
    static fromAmino(data, isClassic) {
        if (isClassic) {
            throw new Error('Not supported for the network');
        }
        const { value: { title, description, code_ids }, } = data;
        return new UnpinCodesProposal(title, description, code_ids.map(cid => Number.parseInt(cid)));
    }
    toAmino(isClassic) {
        if (isClassic) {
            throw new Error('Not supported for the network');
        }
        const { title, description, code_ids } = this;
        return {
            type: 'wasm/UnpinCodesProposal',
            value: {
                title,
                description,
                code_ids: code_ids.map(cid => cid.toFixed()),
            },
        };
    }
    static fromProto(proto, isClassic) {
        if (isClassic) {
            throw new Error('Not supported for the network');
        }
        return new UnpinCodesProposal(proto.title, proto.description, proto.codeIds.map(codeId => codeId.toNumber()));
    }
    toProto(isClassic) {
        if (isClassic) {
            throw new Error('Not supported for the network');
        }
        const { title, description, code_ids } = this;
        return proposal_1.UnpinCodesProposal.fromPartial({
            title,
            description,
            codeIds: code_ids.map(cid => Long.fromNumber(cid)),
        });
    }
    packAny(isClassic) {
        if (isClassic) {
            throw new Error('Not supported for the network');
        }
        return any_1.Any.fromPartial({
            typeUrl: '/cosmwasm.wasm.v1.UnpinCodesProposal',
            value: proposal_1.UnpinCodesProposal.encode(this.toProto(isClassic)).finish(),
        });
    }
    static unpackAny(msgAny, isClassic) {
        if (isClassic) {
            throw new Error('Not supported for the network');
        }
        return UnpinCodesProposal.fromProto(proposal_1.UnpinCodesProposal.decode(msgAny.value), isClassic);
    }
    static fromData(data, isClassic) {
        if (isClassic) {
            throw new Error('Not supported for the network');
        }
        const { title, description, code_ids } = data;
        return new UnpinCodesProposal(title, description, code_ids.map(cid => Number.parseInt(cid)));
    }
    toData(isClassic) {
        if (isClassic) {
            throw new Error('Not supported for the network');
        }
        const { title, description, code_ids } = this;
        return {
            '@type': '/cosmwasm.wasm.v1.UnpinCodesProposal',
            title,
            description,
            code_ids: code_ids.map(cid => cid.toFixed()),
        };
    }
}
exports.UnpinCodesProposal = UnpinCodesProposal;
//# sourceMappingURL=UnpinCodesProposal.js.map