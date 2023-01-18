"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GovAPI = void 0;
const BaseAPI_1 = require("./BaseAPI");
const core_1 = require("../../core");
const gov_1 = require("@terra-money/legacy.proto/cosmos/gov/v1beta1/gov");
class GovAPI extends BaseAPI_1.BaseAPI {
    constructor(lcd) {
        super(lcd.apiRequester);
        this.lcd = lcd;
    }
    /**
     * Gets all proposals.
     */
    proposals(params = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.c
                .get(`/cosmos/gov/v1beta1/proposals`, params)
                .then(d => [
                d.proposals.map(prop => core_1.Proposal.fromData(prop, this.lcd.config.isClassic)),
                d.pagination,
            ]);
        });
    }
    /**
     * Get a specific proposal by its ID
     * @param proposalId proposal's ID
     */
    proposal(proposalId, params = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.c
                .get(`/cosmos/gov/v1beta1/proposals/${proposalId}`, params)
                .then(d => core_1.Proposal.fromData(d.proposal, this.lcd.config.isClassic));
        });
    }
    /**
     * Get the proposal's proposer
     * @param proposalId proposal's ID
     */
    proposer(proposalId) {
        return __awaiter(this, void 0, void 0, function* () {
            proposalId;
            const creationTx = yield this.searchProposalCreationTx(proposalId);
            const msg = creationTx.body.messages.find(msg => msg['@type'] === '/cosmos.gov.v1beta1.MsgSubmitProposal');
            if (msg && msg['@type'] === '/cosmos.gov.v1beta1.MsgSubmitProposal') {
                return msg.proposer;
            }
            throw Error('failed to fetch submit_proposer tx');
        });
    }
    /**
     * Get the proposal's initial deposit
     * @param proposalId proposal's ID
     */
    initialDeposit(proposalId) {
        return __awaiter(this, void 0, void 0, function* () {
            proposalId;
            const creationTx = yield this.searchProposalCreationTx(proposalId);
            const msg = creationTx.body.messages.find(msg => msg['@type'] === '/cosmos.gov.v1beta1.MsgSubmitProposal');
            if (msg && msg['@type'] === '/cosmos.gov.v1beta1.MsgSubmitProposal') {
                return core_1.Coins.fromData(msg.initial_deposit);
            }
            throw Error('failed to fetch submit_proposer tx');
        });
    }
    /**
     * Get the deposits for a proposal
     * @param proposalId proposal's ID
     */
    deposits(proposalId, _params = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            proposalId;
            _params;
            const proposal = yield this.proposal(proposalId);
            if (proposal.status === gov_1.ProposalStatus.PROPOSAL_STATUS_DEPOSIT_PERIOD ||
                proposal.status === gov_1.ProposalStatus.PROPOSAL_STATUS_VOTING_PERIOD) {
                return this.c
                    .get(`/cosmos/gov/v1beta1/proposals/${proposalId}/deposits`, _params)
                    .then(d => [
                    d.deposits.map(deposit => core_1.Deposit.fromData(deposit)),
                    d.pagination,
                ]);
            }
            // build search params
            const params = new URLSearchParams();
            params.append('events', `message.action='/cosmos.gov.v1beta1.MsgDeposit'`);
            params.append('events', `proposal_deposit.proposal_id=${proposalId}`);
            Object.entries(_params).forEach(v => {
                params.append(v[0], v[1]);
            });
            return this.c
                .get(`/cosmos/tx/v1beta1/txs`, params)
                .then(d => {
                const deposits = [];
                d.txs.map(tx => 
                //@ts-ignore
                tx.body.messages.forEach(msg => {
                    if (msg['@type'] === '/cosmos.gov.v1beta1.MsgDeposit' &&
                        Number.parseInt(msg.proposal_id) == proposalId) {
                        deposits.push(new core_1.Deposit(proposalId, msg.depositor, core_1.Coins.fromData(msg.amount)));
                    }
                }, deposits));
                return [deposits, d.pagination];
            });
        });
    }
    searchProposalCreationTx(proposalId) {
        return __awaiter(this, void 0, void 0, function* () {
            // build search params
            const params = new URLSearchParams();
            params.append('events', `message.action='/cosmos.gov.v1beta1.MsgSubmitProposal'`);
            params.append('events', `submit_proposal.proposal_id=${proposalId}`);
            return this.c
                .get(`/cosmos/tx/v1beta1/txs`, params)
                .then(d => {
                if (d.tx_responses.length === 0) {
                    throw Error('failed to fetch submit_proposer tx');
                }
                return d.txs[0];
            });
        });
    }
    /**
     * Get the current votes for a proposal
     * @param proposalId proposal's ID
     */
    votes(proposalId, _params = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            proposalId;
            _params;
            const proposal = yield this.proposal(proposalId);
            if (proposal.status === gov_1.ProposalStatus.PROPOSAL_STATUS_DEPOSIT_PERIOD) {
                return this.c
                    .get(`/cosmos/gov/v1beta1/proposals/${proposalId}/votes`, _params)
                    .then(d => [d.votes.map(v => core_1.Vote.fromData(v)), d.pagination]);
            }
            // build search params
            const params = new URLSearchParams();
            params.append('events', `message.action='/cosmos.gov.v1beta1.MsgVote'`);
            params.append('events', `proposal_vote.proposal_id=${proposalId}`);
            Object.entries(_params).forEach(v => {
                params.append(v[0], v[1]);
            });
            return this.c
                .get(`/cosmos/tx/v1beta1/txs`, params)
                .then(d => {
                const votes = [];
                d.txs.map(tx => 
                //@ts-ignore
                tx.body.messages.forEach(msg => {
                    if (msg['@type'] === '/cosmos.gov.v1beta1.MsgVote' &&
                        Number.parseInt(msg.proposal_id) == proposalId) {
                        votes.push(new core_1.Vote(proposalId, msg.voter, [
                            new core_1.WeightedVoteOption(msg.option, '1'),
                        ]));
                    }
                    else if (msg['@type'] === '/cosmos.gov.v1beta1.MsgVoteWeighted' &&
                        Number.parseInt(msg.proposal_id) == proposalId) {
                        votes.push(new core_1.Vote(proposalId, msg.voter, 
                        //@ts-ignore
                        msg.options.map(o => core_1.WeightedVoteOption.fromData(o))));
                    }
                }, votes));
                return [votes, d.pagination];
            });
            throw Error('temp error: remove me');
        });
    }
    /**
     * Gets the current tally for a proposal.
     * @param proposalId proposal's ID
     */
    tally(proposalId, params = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.c
                .get(`/cosmos/gov/v1beta1/proposals/${proposalId}/tally`, params)
                .then(({ tally: d }) => ({
                yes: new core_1.Int(d.yes),
                no: new core_1.Int(d.no),
                no_with_veto: new core_1.Int(d.no_with_veto),
                abstain: new core_1.Int(d.abstain),
            }));
        });
    }
    /** Gets the Gov module's deposit parameters */
    depositParameters(params = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.c
                .get(`/cosmos/gov/v1beta1/params/deposit`, params)
                .then(({ deposit_params: d }) => ({
                max_deposit_period: Number.parseInt(d.max_deposit_period),
                min_deposit: core_1.Coins.fromData(d.min_deposit),
            }));
        });
    }
    /** Gets the Gov module's voting parameters */
    votingParameters(params = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.c
                .get(`/cosmos/gov/v1beta1/params/voting`, params)
                .then(({ voting_params: d }) => ({
                voting_period: Number.parseInt(d.voting_period),
            }));
        });
    }
    /** Gets teh Gov module's tally parameters */
    tallyParameters(params = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.c
                .get(`/cosmos/gov/v1beta1/params/tallying`, params)
                .then(({ tally_params: d }) => ({
                quorum: new core_1.Dec(d.quorum),
                veto_threshold: new core_1.Dec(d.veto_threshold),
                threshold: new core_1.Dec(d.threshold),
            }));
        });
    }
    /** Gets the Gov module's current parameters  */
    parameters(params = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const [deposit_params, voting_params, tally_params] = yield Promise.all([
                this.depositParameters(params),
                this.votingParameters(params),
                this.tallyParameters(params),
            ]);
            return {
                deposit_params,
                voting_params,
                tally_params,
            };
        });
    }
}
exports.GovAPI = GovAPI;
//# sourceMappingURL=GovAPI.js.map