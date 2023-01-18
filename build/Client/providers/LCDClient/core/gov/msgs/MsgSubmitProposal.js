"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MsgSubmitProposal = void 0;
const Coins_1 = require("../../Coins");
const Proposal_1 = require("../Proposal");
const json_1 = require("../../../util/json");
const any_1 = require("@terra-money/terra.proto/google/protobuf/any");
const tx_1 = require("@terra-money/terra.proto/cosmos/gov/v1beta1/tx");
/**
 * Submit a proposal alongside an initial deposit.
 */
class MsgSubmitProposal extends json_1.JSONSerializable {
    /**
     * @param content proposal content to submit
     * @param initial_deposit deposit provided
     * @param proposer proposer's account address
     */
    constructor(content, initial_deposit, proposer) {
        super();
        this.content = content;
        this.proposer = proposer;
        this.initial_deposit = new Coins_1.Coins(initial_deposit);
    }
    static fromAmino(data, isClassic) {
        const { value: { content, initial_deposit, proposer }, } = data;
        return new MsgSubmitProposal(Proposal_1.Proposal.Content.fromAmino(content, isClassic), Coins_1.Coins.fromAmino(initial_deposit), proposer);
    }
    toAmino(isClassic) {
        const { content, initial_deposit, proposer } = this;
        return {
            type: isClassic
                ? 'gov/MsgSubmitProposal'
                : 'cosmos-sdk/MsgSubmitProposal',
            value: {
                content: content.toAmino(isClassic),
                initial_deposit: initial_deposit.toAmino(),
                proposer,
            },
        };
    }
    static fromData(data, isClassic) {
        const { content, initial_deposit, proposer } = data;
        return new MsgSubmitProposal(Proposal_1.Proposal.Content.fromData(content, isClassic), Coins_1.Coins.fromData(initial_deposit), proposer);
    }
    toData(isClassic) {
        const { content, initial_deposit, proposer } = this;
        return {
            '@type': '/cosmos.gov.v1beta1.MsgSubmitProposal',
            content: content.toData(isClassic),
            initial_deposit: initial_deposit.toData(),
            proposer,
        };
    }
    static fromProto(proto, isClassic) {
        return new MsgSubmitProposal(Proposal_1.Proposal.Content.fromProto(proto.content, isClassic), Coins_1.Coins.fromProto(proto.initialDeposit), proto.proposer);
    }
    toProto(isClassic) {
        const { content, initial_deposit, proposer } = this;
        return tx_1.MsgSubmitProposal.fromPartial({
            content: content.packAny(isClassic),
            initialDeposit: initial_deposit.toProto(),
            proposer,
        });
    }
    packAny(isClassic) {
        return any_1.Any.fromPartial({
            typeUrl: '/cosmos.gov.v1beta1.MsgSubmitProposal',
            value: tx_1.MsgSubmitProposal.encode(this.toProto(isClassic)).finish(),
        });
    }
    static unpackAny(msgAny, isClassic) {
        return MsgSubmitProposal.fromProto(tx_1.MsgSubmitProposal.decode(msgAny.value), isClassic);
    }
}
exports.MsgSubmitProposal = MsgSubmitProposal;
//# sourceMappingURL=MsgSubmitProposal.js.map