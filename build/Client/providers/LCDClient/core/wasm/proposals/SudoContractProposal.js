"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SudoContractProposal = void 0;
const json_1 = require("../../../util/json");
const any_1 = require("@jmesworld/jmes.proto/src/google/protobuf/any");
const proposal_1 = require("@jmesworld/jmes.proto/cosmwasm/wasm/v1/proposal");
class SudoContractProposal extends json_1.JSONSerializable {
    /**
     * @param title a short summary
     * @param description a human readable text
     * @param contract contract address to be migrated from
     * @param msg JSON message to configure the migrate state of the contract
     */
    constructor(title, description, contract, msg // json object or string
    ) {
        super();
        this.title = title;
        this.description = description;
        this.contract = contract;
        this.msg = msg;
    }
    static fromAmino(data, isClassic) {
        if (isClassic) {
            throw new Error('Not supported for the network');
        }
        const { value: { title, description, contract, msg }, } = data;
        return new SudoContractProposal(title, description, contract, msg);
    }
    toAmino(isClassic) {
        if (isClassic) {
            throw new Error('Not supported for the network');
        }
        const { title, description, contract, msg } = this;
        return {
            type: 'wasm/SudoContractProposal',
            value: {
                title,
                description,
                contract,
                msg: (0, json_1.removeNull)(msg),
            },
        };
    }
    static fromProto(proto, isClassic) {
        if (isClassic) {
            throw new Error('Not supported for the network');
        }
        return new SudoContractProposal(proto.title, proto.description, proto.contract, JSON.parse(Buffer.from(proto.msg).toString('utf-8')));
    }
    toProto(isClassic) {
        if (isClassic) {
            throw new Error('Not supported for the network');
        }
        const { title, description, contract, msg } = this;
        return proposal_1.SudoContractProposal.fromPartial({
            title,
            description,
            contract,
            msg: Buffer.from(JSON.stringify(msg), 'utf-8'),
        });
    }
    packAny(isClassic) {
        if (isClassic) {
            throw new Error('Not supported for the network');
        }
        return any_1.Any.fromPartial({
            typeUrl: '/cosmwasm.wasm.v1.SudoContractProposal',
            value: proposal_1.SudoContractProposal.encode(this.toProto(isClassic)).finish(),
        });
    }
    static unpackAny(msgAny, isClassic) {
        if (isClassic) {
            throw new Error('Not supported for the network');
        }
        return SudoContractProposal.fromProto(proposal_1.SudoContractProposal.decode(msgAny.value), isClassic);
    }
    static fromData(data, isClassic) {
        if (isClassic) {
            throw new Error('Not supported for the network');
        }
        const { title, description, contract, msg } = data;
        return new SudoContractProposal(title, description, contract, msg);
    }
    toData(isClassic) {
        if (isClassic) {
            throw new Error('Not supported for the network');
        }
        const { title, description, contract, msg } = this;
        return {
            '@type': '/cosmwasm.wasm.v1.SudoContractProposal',
            title,
            description,
            contract,
            msg: (0, json_1.removeNull)(msg),
        };
    }
}
exports.SudoContractProposal = SudoContractProposal;
//# sourceMappingURL=SudoContractProposal.js.map