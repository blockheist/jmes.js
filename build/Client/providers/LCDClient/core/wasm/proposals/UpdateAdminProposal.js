"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateAdminProposal = void 0;
const json_1 = require("../../../util/json");
const any_1 = require("@jmesworld/jmes.proto/src/google/protobuf/any");
const proposal_1 = require("@jmesworld/jmes.proto/cosmwasm/wasm/v1/proposal");
/** UpdateAdminProposal gov proposal content type to set an admin for a contract. */
class UpdateAdminProposal extends json_1.JSONSerializable {
    /**
     * @param title a short summary
     * @param description a human readable text
     * @param contract the address of the smart contract
     * @param new_admin address to be set
     */
    constructor(title, description, contract, new_admin) {
        super();
        this.title = title;
        this.description = description;
        this.contract = contract;
        this.new_admin = new_admin;
    }
    static fromAmino(data, isClassic) {
        if (isClassic) {
            throw new Error('Not supported for the network');
        }
        const { value: { title, description, contract, new_admin }, } = data;
        return new UpdateAdminProposal(title, description, contract, new_admin);
    }
    toAmino(isClassic) {
        if (isClassic) {
            throw new Error('Not supported for the network');
        }
        const { title, description, contract, new_admin } = this;
        return {
            type: 'wasm/UpdateAdminProposal',
            value: {
                title,
                description,
                contract,
                new_admin,
            },
        };
    }
    static fromProto(proto, isClassic) {
        if (isClassic) {
            throw new Error('Not supported for the network');
        }
        return new UpdateAdminProposal(proto.title, proto.description, proto.contract, proto.newAdmin);
    }
    toProto(isClassic) {
        if (isClassic) {
            throw new Error('Not supported for the network');
        }
        const { title, description, contract, new_admin } = this;
        return proposal_1.UpdateAdminProposal.fromPartial({
            title,
            description,
            contract,
            newAdmin: new_admin,
        });
    }
    packAny(isClassic) {
        if (isClassic) {
            throw new Error('Not supported for the network');
        }
        return any_1.Any.fromPartial({
            typeUrl: '/cosmwasm.wasm.v1.UpdateAdminProposal',
            value: proposal_1.UpdateAdminProposal.encode(this.toProto(isClassic)).finish(),
        });
    }
    static unpackAny(msgAny, isClassic) {
        if (isClassic) {
            throw new Error('Not supported for the network');
        }
        return UpdateAdminProposal.fromProto(proposal_1.UpdateAdminProposal.decode(msgAny.value), isClassic);
    }
    static fromData(data, isClassic) {
        if (isClassic) {
            throw new Error('Not supported for the network');
        }
        const { title, description, contract, new_admin } = data;
        return new UpdateAdminProposal(title, description, contract, new_admin);
    }
    toData(isClassic) {
        if (isClassic) {
            throw new Error('Not supported for the network');
        }
        const { title, description, contract, new_admin } = this;
        return {
            '@type': '/cosmwasm.wasm.v1.UpdateAdminProposal',
            title,
            description,
            contract,
            new_admin,
        };
    }
}
exports.UpdateAdminProposal = UpdateAdminProposal;
//# sourceMappingURL=UpdateAdminProposal.js.map