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
exports.Proposal = void 0;
const Coins_1 = require("../Coins");
const numeric_1 = require("../numeric");
const json_1 = require("../../util/json");
const proposals_1 = require("../distribution/proposals");
const proposals_2 = require("../params/proposals");
const proposals_3 = require("../ibc/proposals");
const proposals_4 = require("./proposals");
const proposals_5 = require("../upgrade/proposals");
const proposals_6 = require("../wasm/proposals");
const gov_1 = require("@terra-money/terra.proto/cosmos/gov/v1beta1/gov");
const Long = __importStar(require("long"));
/**
 * Stores information pertaining to a submitted proposal, such as its status and time of
 * the voting period
 */
class Proposal extends json_1.JSONSerializable {
    /**
     *
     * @param id proposal's ID
     * @param content content of the proposal
     * @param status proposal's status
     * @param final_tally_result tally result
     * @param submit_time time proposal was submitted and deposit period started
     * @param deposit_end_time time deposit period will end
     * @param total_deposit amount of coins deposited by all users
     * @param voting_start_time time voting period will start
     * @param voting_end_time time voting period will end
     */
    constructor(id, content, status, final_tally_result, submit_time, deposit_end_time, total_deposit, voting_start_time, voting_end_time) {
        super();
        this.id = id;
        this.content = content;
        this.status = status;
        this.final_tally_result = final_tally_result;
        this.submit_time = submit_time;
        this.deposit_end_time = deposit_end_time;
        this.total_deposit = total_deposit;
        this.voting_start_time = voting_start_time;
        this.voting_end_time = voting_end_time;
    }
    static fromAmino(data, isClassic) {
        const { id, content, status, final_tally_result, submit_time, deposit_end_time, total_deposit, voting_start_time, voting_end_time, } = data;
        return new Proposal(Number.parseInt(id), Proposal.Content.fromAmino(content, isClassic), status, {
            yes: new numeric_1.Int(final_tally_result.yes || 0),
            no: new numeric_1.Int(final_tally_result.no || 0),
            abstain: new numeric_1.Int(final_tally_result.abstain || 0),
            no_with_veto: new numeric_1.Int(final_tally_result.no_with_veto || 0),
        }, new Date(submit_time), new Date(deposit_end_time), Coins_1.Coins.fromAmino(total_deposit), new Date(voting_start_time), new Date(voting_end_time));
    }
    toAmino(isClassic) {
        const { status, final_tally_result } = this;
        return {
            id: this.id.toFixed(),
            content: this.content.toAmino(isClassic),
            status: status,
            final_tally_result: {
                yes: final_tally_result.yes.toFixed(),
                no: final_tally_result.no.toFixed(),
                abstain: final_tally_result.abstain.toFixed(),
                no_with_veto: final_tally_result.no_with_veto.toFixed(),
            },
            submit_time: this.submit_time.toISOString(),
            deposit_end_time: this.deposit_end_time.toISOString(),
            total_deposit: this.total_deposit.toAmino(),
            voting_start_time: this.voting_start_time.toISOString(),
            voting_end_time: this.voting_end_time.toISOString(),
        };
    }
    static fromData(data, isClassic) {
        const { proposal_id, content, status, final_tally_result, submit_time, deposit_end_time, total_deposit, voting_start_time, voting_end_time, } = data;
        return new Proposal(Number.parseInt(proposal_id), Proposal.Content.fromData(content, isClassic), (0, gov_1.proposalStatusFromJSON)(status), {
            yes: new numeric_1.Int((final_tally_result === null || final_tally_result === void 0 ? void 0 : final_tally_result.yes) || 0),
            no: new numeric_1.Int((final_tally_result === null || final_tally_result === void 0 ? void 0 : final_tally_result.no) || 0),
            abstain: new numeric_1.Int((final_tally_result === null || final_tally_result === void 0 ? void 0 : final_tally_result.abstain) || 0),
            no_with_veto: new numeric_1.Int((final_tally_result === null || final_tally_result === void 0 ? void 0 : final_tally_result.no_with_veto) || 0),
        }, new Date(submit_time), new Date(deposit_end_time), Coins_1.Coins.fromData(total_deposit), new Date(voting_start_time), new Date(voting_end_time));
    }
    toData(isClassic) {
        const { status, final_tally_result } = this;
        return {
            proposal_id: this.id.toFixed(),
            content: this.content.toData(isClassic),
            status: (0, gov_1.proposalStatusToJSON)(status),
            final_tally_result: {
                yes: final_tally_result.yes.toString(),
                no: final_tally_result.no.toString(),
                abstain: final_tally_result.abstain.toString(),
                no_with_veto: final_tally_result.no_with_veto.toString(),
            },
            submit_time: this.submit_time.toISOString(),
            deposit_end_time: this.deposit_end_time.toISOString(),
            total_deposit: this.total_deposit.toData(),
            voting_start_time: this.voting_start_time.toISOString(),
            voting_end_time: this.voting_end_time.toISOString(),
        };
    }
    static fromProto(data, isClassic) {
        const id = data.proposalId;
        const content = data.content;
        const status = data.status;
        const final_tally_result = data.finalTallyResult;
        const submit_time = data.submitTime;
        const deposit_end_time = data.depositEndTime;
        const total_deposit = data.totalDeposit;
        const voting_start_time = data.votingStartTime;
        const voting_end_time = data.votingEndTime;
        return new Proposal(id.toNumber(), Proposal.Content.fromProto(content, isClassic), status, {
            yes: new numeric_1.Int((final_tally_result === null || final_tally_result === void 0 ? void 0 : final_tally_result.yes) || 0),
            no: new numeric_1.Int((final_tally_result === null || final_tally_result === void 0 ? void 0 : final_tally_result.no) || 0),
            abstain: new numeric_1.Int((final_tally_result === null || final_tally_result === void 0 ? void 0 : final_tally_result.abstain) || 0),
            no_with_veto: new numeric_1.Int((final_tally_result === null || final_tally_result === void 0 ? void 0 : final_tally_result.noWithVeto) || 0),
        }, submit_time, deposit_end_time, Coins_1.Coins.fromProto(total_deposit), voting_start_time, voting_end_time);
    }
    toProto(isClassic) {
        const { status, final_tally_result } = this;
        let ftr;
        if (final_tally_result) {
            ftr = gov_1.TallyResult.fromPartial({
                yes: final_tally_result.yes.toString(),
                no: final_tally_result.no.toString(),
                abstain: final_tally_result.abstain.toString(),
                noWithVeto: final_tally_result.no_with_veto.toString(),
            });
        }
        return gov_1.Proposal.fromPartial({
            proposalId: Long.fromNumber(this.id),
            content: this.content.packAny(isClassic),
            status,
            finalTallyResult: ftr,
            submitTime: this.submit_time,
            depositEndTime: this.deposit_end_time,
            totalDeposit: this.total_deposit.toProto(),
            votingEndTime: this.voting_end_time,
            votingStartTime: this.voting_start_time,
        });
    }
}
exports.Proposal = Proposal;
(function (Proposal) {
    Proposal.Status = gov_1.ProposalStatus;
    let Content;
    (function (Content) {
        function fromAmino(amino, isClassic) {
            switch (amino.type) {
                case 'gov/TextProposal':
                case 'cosmos-sdk/TextProposal':
                    return proposals_4.TextProposal.fromAmino(amino, isClassic);
                case 'distribution/CommunityPoolSpendProposal':
                case 'cosmos-sdk/CommunityPoolSpendProposal':
                    return proposals_1.CommunityPoolSpendProposal.fromAmino(amino, isClassic);
                case 'params/ParameterChangeProposal':
                case 'cosmos-sdk/ParameterChangeProposal':
                    return proposals_2.ParameterChangeProposal.fromAmino(amino, isClassic);
                case 'upgrade/SoftwareUpgradeProposal':
                case 'cosmos-sdk/SoftwareUpgradeProposal':
                    return proposals_5.SoftwareUpgradeProposal.fromAmino(amino, isClassic);
                case 'upgrade/CancelSoftwareUpgradeProposal':
                case 'cosmos-sdk/CancelSoftwareUpgradeProposal':
                    return proposals_5.CancelSoftwareUpgradeProposal.fromAmino(amino, isClassic);
                case 'ibc/ClientUpdateProposal':
                    return proposals_3.ClientUpdateProposal.fromAmino(amino, isClassic);
                case 'wasm/ClearAdminProposal':
                    return proposals_6.ClearAdminProposal.fromAmino(amino, isClassic);
                case 'wasm/ExecuteContractProposal':
                    return proposals_6.ExecuteContractProposal.fromAmino(amino, isClassic);
                case 'wasm/InstantiateContractProposal':
                    return proposals_6.InstantiateContractProposal.fromAmino(amino, isClassic);
                case 'wasm/MigrateContractProposal':
                    return proposals_6.MigrateContractProposal.fromAmino(amino, isClassic);
                case 'wasm/PinCodesProposal':
                    return proposals_6.PinCodesProposal.fromAmino(amino, isClassic);
                case 'wasm/StoreCodeProposal':
                    return proposals_6.StoreCodeProposal.fromAmino(amino, isClassic);
                case 'wasm/SudoContractProposal':
                    return proposals_6.SudoContractProposal.fromAmino(amino, isClassic);
                case 'wasm/UnpinCodesProposal':
                    return proposals_6.UnpinCodesProposal.fromAmino(amino, isClassic);
                case 'wasm/UpdateAdminProposal':
                    return proposals_6.UpdateAdminProposal.fromAmino(amino, isClassic);
                case 'wasm/UpdateInstantiateConfigProposal':
                    return proposals_6.UpdateInstantiateConfigProposal.fromAmino(amino, isClassic);
            }
        }
        Content.fromAmino = fromAmino;
        function fromData(data, isClassic) {
            switch (data['@type']) {
                case '/cosmos.gov.v1beta1.TextProposal':
                    return proposals_4.TextProposal.fromData(data, isClassic);
                case '/cosmos.distribution.v1beta1.CommunityPoolSpendProposal':
                    return proposals_1.CommunityPoolSpendProposal.fromData(data, isClassic);
                case '/cosmos.params.v1beta1.ParameterChangeProposal':
                    return proposals_2.ParameterChangeProposal.fromData(data, isClassic);
                case '/cosmos.upgrade.v1beta1.SoftwareUpgradeProposal':
                    return proposals_5.SoftwareUpgradeProposal.fromData(data, isClassic);
                case '/cosmos.upgrade.v1beta1.CancelSoftwareUpgradeProposal':
                    return proposals_5.CancelSoftwareUpgradeProposal.fromData(data, isClassic);
                case '/ibc.core.client.v1.ClientUpdateProposal':
                    return proposals_3.ClientUpdateProposal.fromData(data, isClassic);
                case '/cosmwasm.wasm.v1.ClearAdminProposal':
                    return proposals_6.ClearAdminProposal.fromData(data, isClassic);
                case '/cosmwasm.wasm.v1.ExecuteContractProposal':
                    return proposals_6.ExecuteContractProposal.fromData(data, isClassic);
                case '/cosmwasm.wasm.v1.InstantiateContractProposal':
                    return proposals_6.InstantiateContractProposal.fromData(data, isClassic);
                case '/cosmwasm.wasm.v1.MigrateContractProposal':
                    return proposals_6.MigrateContractProposal.fromData(data, isClassic);
                case '/cosmwasm.wasm.v1.PinCodesProposal':
                    return proposals_6.PinCodesProposal.fromData(data, isClassic);
                case '/cosmwasm.wasm.v1.StoreCodeProposal':
                    return proposals_6.StoreCodeProposal.fromData(data, isClassic);
                case '/cosmwasm.wasm.v1.SudoContractProposal':
                    return proposals_6.SudoContractProposal.fromData(data, isClassic);
                case '/cosmwasm.wasm.v1.UnpinCodesProposal':
                    return proposals_6.UnpinCodesProposal.fromData(data, isClassic);
                case '/cosmwasm.wasm.v1.UpdateAdminProposal':
                    return proposals_6.UpdateAdminProposal.fromData(data, isClassic);
                case '/cosmwasm.wasm.v1.UpdateInstantiateConfigProposal':
                    return proposals_6.UpdateInstantiateConfigProposal.fromData(data, isClassic);
            }
        }
        Content.fromData = fromData;
        function fromProto(anyProto, isClassic) {
            const typeUrl = anyProto.typeUrl;
            switch (typeUrl) {
                case '/cosmos.gov.v1beta1.TextProposal':
                    return proposals_4.TextProposal.unpackAny(anyProto, isClassic);
                case '/cosmos.distribution.v1beta1.CommunityPoolSpendProposal':
                    return proposals_1.CommunityPoolSpendProposal.unpackAny(anyProto, isClassic);
                case '/cosmos.params.v1beta1.ParameterChangeProposal':
                    return proposals_2.ParameterChangeProposal.unpackAny(anyProto, isClassic);
                case '/cosmos.upgrade.v1beta1.SoftwareUpgradeProposal':
                    return proposals_5.SoftwareUpgradeProposal.unpackAny(anyProto, isClassic);
                case '/cosmos.upgrade.v1beta1.CancelSoftwareUpgradeProposal':
                    return proposals_5.CancelSoftwareUpgradeProposal.unpackAny(anyProto, isClassic);
                case '/ibc.core.client.v1.ClientUpdateProposal':
                    return proposals_3.ClientUpdateProposal.unpackAny(anyProto, isClassic);
                case '/cosmwasm.wasm.v1.ClearAdminProposal':
                    return proposals_6.ClearAdminProposal.unpackAny(anyProto, isClassic);
                case '/cosmwasm.wasm.v1.ExecuteContractProposal':
                    return proposals_6.ExecuteContractProposal.unpackAny(anyProto, isClassic);
                case '/cosmwasm.wasm.v1.InstantiateContractProposal':
                    return proposals_6.InstantiateContractProposal.unpackAny(anyProto, isClassic);
                case '/cosmwasm.wasm.v1.MigrateContractProposal':
                    return proposals_6.MigrateContractProposal.unpackAny(anyProto, isClassic);
                case '/cosmwasm.wasm.v1.PinCodesProposal':
                    return proposals_6.PinCodesProposal.unpackAny(anyProto, isClassic);
                case '/cosmwasm.wasm.v1.StoreCodeProposal':
                    return proposals_6.StoreCodeProposal.unpackAny(anyProto, isClassic);
                case '/cosmwasm.wasm.v1.SudoContractProposal':
                    return proposals_6.SudoContractProposal.unpackAny(anyProto, isClassic);
                case '/cosmwasm.wasm.v1.UnpinCodesProposal':
                    return proposals_6.UnpinCodesProposal.unpackAny(anyProto, isClassic);
                case '/cosmwasm.wasm.v1.UpdateAdminProposal':
                    return proposals_6.UpdateAdminProposal.unpackAny(anyProto, isClassic);
                case '/cosmwasm.wasm.v1.UpdateInstantiateConfigProposal':
                    return proposals_6.UpdateInstantiateConfigProposal.unpackAny(anyProto, isClassic);
            }
            throw `Proposal content ${typeUrl} not recognized`;
        }
        Content.fromProto = fromProto;
    })(Content = Proposal.Content || (Proposal.Content = {}));
})(Proposal = exports.Proposal || (exports.Proposal = {}));
//# sourceMappingURL=Proposal.js.map