"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClearAdminProposal = void 0;
const json_1 = require("../../../util/json");
const any_1 = require("@jmesworld/jmes.proto/src/google/protobuf/any");
const proposal_1 = require("@jmesworld/jmes.proto/cosmwasm/wasm/v1/proposal");
/**
 * ClearAdminProposal gov proposal content type to clear the admin of a
 * contract.
 */
class ClearAdminProposal extends json_1.JSONSerializable {
    /**
     * @param title a short summary
     * @param description a human readable text
     * @param contract the address of the smart contract
     */
    constructor(title, description, contract) {
        super();
        this.title = title;
        this.description = description;
        this.contract = contract;
    }
    static fromAmino(data, isClassic) {
        if (isClassic) {
            throw new Error('Not supported for the network');
        }
        const { value: { title, description, contract }, } = data;
        return new ClearAdminProposal(title, description, contract);
    }
    toAmino(isClassic) {
        if (isClassic) {
            throw new Error('Not supported for the network');
        }
        const { title, description, contract } = this;
        return {
            type: 'wasm/ClearAdminProposal',
            value: {
                title,
                description,
                contract,
            },
        };
    }
    static fromProto(proto, isClassic) {
        if (isClassic) {
            throw new Error('Not supported for the network');
        }
        return new ClearAdminProposal(proto.title, proto.description, proto.contract);
    }
    toProto(isClassic) {
        if (isClassic) {
            throw new Error('Not supported for the network');
        }
        const { title, description, contract } = this;
        return proposal_1.ClearAdminProposal.fromPartial({
            title,
            description,
            contract,
        });
    }
    packAny(isClassic) {
        if (isClassic) {
            throw new Error('Not supported for the network');
        }
        return any_1.Any.fromPartial({
            typeUrl: '/cosmwasm.wasm.v1.ClearAdminProposal',
            value: proposal_1.ClearAdminProposal.encode(this.toProto(isClassic)).finish(),
        });
    }
    static unpackAny(msgAny, isClassic) {
        if (isClassic) {
            throw new Error('Not supported for the network');
        }
        return ClearAdminProposal.fromProto(proposal_1.ClearAdminProposal.decode(msgAny.value), isClassic);
    }
    static fromData(data, isClassic) {
        if (isClassic) {
            throw new Error('Not supported for the network');
        }
        const { title, description, contract } = data;
        return new ClearAdminProposal(title, description, contract);
    }
    toData(isClassic) {
        if (isClassic) {
            throw new Error('Not supported for the network');
        }
        const { title, description, contract } = this;
        return {
            '@type': '/cosmwasm.wasm.v1.ClearAdminProposal',
            title,
            description,
            contract,
        };
    }
}
exports.ClearAdminProposal = ClearAdminProposal;
//# sourceMappingURL=ClearAdminProposal.js.map