"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExecuteContractProposal = void 0;
const json_1 = require("../../../util/json");
const Coins_1 = require("../../Coins");
const any_1 = require("@jmesworld/jmes.proto/src/google/protobuf/any");
const proposal_1 = require("@jmesworld/jmes.proto/cosmwasm/wasm/v1/proposal");
/**
 * ExecuteContractProposal gov proposal content type to call execute on a
 * contract.
 */
class ExecuteContractProposal extends json_1.JSONSerializable {
    /**
     * @param title a short summary
     * @param description a human readable text
     * @param run_as contract user
     * @param contract contract address
     * @param execute_msg HandleMsg to pass as arguments for contract invocation
     * @param coins coins to be sent to contract
     */
    constructor(title, description, run_as, contract, execute_msg, coins = {}) {
        super();
        this.title = title;
        this.description = description;
        this.run_as = run_as;
        this.contract = contract;
        this.execute_msg = execute_msg;
        this.coins = new Coins_1.Coins(coins);
    }
    static fromAmino(data, isClassic) {
        if (isClassic) {
            throw new Error('Not supported for the network');
        }
        const { value: { title, description, run_as, contract, msg, funds }, } = data;
        return new ExecuteContractProposal(title, description, run_as, contract, msg, Coins_1.Coins.fromAmino(funds));
    }
    toAmino(isClassic) {
        const { title, description, run_as, contract, execute_msg, coins } = this;
        if (isClassic) {
            throw new Error('Not supported for the network');
        }
        return {
            type: 'wasm/ExecuteContractProposal',
            value: {
                title,
                description,
                run_as,
                contract,
                msg: (0, json_1.removeNull)(execute_msg),
                funds: coins.toAmino(),
            },
        };
    }
    static fromProto(proto, isClassic) {
        if (isClassic) {
            throw new Error('Not supported for the network');
        }
        return new ExecuteContractProposal(proto.title, proto.description, proto.runAs, proto.contract, JSON.parse(Buffer.from(proto.msg).toString('utf-8')), Coins_1.Coins.fromProto(proto.funds));
    }
    toProto(isClassic) {
        const { title, description, run_as, contract, execute_msg, coins } = this;
        if (isClassic) {
            throw new Error('Not supported for the network');
        }
        else {
            return proposal_1.ExecuteContractProposal.fromPartial({
                title,
                description,
                funds: coins.toProto(),
                contract,
                runAs: run_as,
                msg: Buffer.from(JSON.stringify((0, json_1.removeNull)(execute_msg)), 'utf-8'),
            });
        }
    }
    packAny(isClassic) {
        if (isClassic) {
            throw new Error('Not supported for the network');
        }
        else {
            return any_1.Any.fromPartial({
                typeUrl: '/cosmwasm.wasm.v1.ExecuteContractProposal',
                value: proposal_1.ExecuteContractProposal.encode(this.toProto(isClassic)).finish(),
            });
        }
    }
    static unpackAny(msgAny, isClassic) {
        return ExecuteContractProposal.fromProto(proposal_1.ExecuteContractProposal.decode(msgAny.value), isClassic);
    }
    static fromData(data, isClassic) {
        if (isClassic) {
            throw new Error('Not supported for the network');
        }
        const { title, description, run_as, contract, msg, funds } = data;
        return new ExecuteContractProposal(title, description, run_as, contract, msg, Coins_1.Coins.fromData(funds));
    }
    toData(isClassic) {
        const { title, description, run_as, contract, execute_msg, coins } = this;
        if (isClassic) {
            throw new Error('Not supported for the network');
        }
        else {
            return {
                '@type': '/cosmwasm.wasm.v1.ExecuteContractProposal',
                title,
                description,
                run_as,
                contract,
                msg: execute_msg,
                funds: coins.toData(),
            };
        }
    }
}
exports.ExecuteContractProposal = ExecuteContractProposal;
//# sourceMappingURL=ExecuteContractProposal.js.map