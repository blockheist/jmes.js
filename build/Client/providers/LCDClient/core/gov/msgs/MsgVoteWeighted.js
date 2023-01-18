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
exports.MsgVoteWeighted = void 0;
const json_1 = require("../../../util/json");
const Vote_1 = require("../Vote");
const any_1 = require("@terra-money/terra.proto/google/protobuf/any");
const tx_1 = require("@terra-money/terra.proto/cosmos/gov/v1beta1/tx");
const Long = __importStar(require("long"));
/**
 * Weighted vote for a proposal
 */
class MsgVoteWeighted extends json_1.JSONSerializable {
    /**
     * @param proposal_id ID of proposal to vote on
     * @param voter voter's account address
     * @param option one of voting options
     */
    constructor(proposal_id, voter, options) {
        super();
        this.proposal_id = proposal_id;
        this.voter = voter;
        this.options = options;
    }
    static fromAmino(data, _) {
        _;
        const { value: { proposal_id, voter, options }, } = data;
        return new MsgVoteWeighted(Number.parseInt(proposal_id), voter, options.map(o => Vote_1.WeightedVoteOption.fromAmino(o)));
    }
    toAmino(isClassic) {
        const { proposal_id, voter, options } = this;
        return {
            type: isClassic ? 'gov/MsgVoteWeighted' : 'cosmos-sdk/MsgVoteWeighted',
            value: {
                proposal_id: proposal_id.toFixed(),
                voter,
                options: options.map(o => o.toAmino()),
            },
        };
    }
    static fromData(data, _) {
        _;
        const { proposal_id, voter, options } = data;
        return new MsgVoteWeighted(Number.parseInt(proposal_id), voter, options.map(o => Vote_1.WeightedVoteOption.fromData(o)));
    }
    toData(_) {
        _;
        const { proposal_id, voter, options } = this;
        return {
            '@type': '/cosmos.gov.v1beta1.MsgVoteWeighted',
            proposal_id: proposal_id.toFixed(),
            voter,
            options: options.map(o => o.toData()),
        };
    }
    static fromProto(proto, _) {
        _;
        return new MsgVoteWeighted(proto.proposalId.toNumber(), proto.voter, proto.options.map(o => Vote_1.WeightedVoteOption.fromProto(o)));
    }
    toProto(_) {
        _;
        const { proposal_id, voter, options } = this;
        return tx_1.MsgVoteWeighted.fromPartial({
            options: options.map(o => o.toProto()),
            proposalId: Long.fromNumber(proposal_id),
            voter,
        });
    }
    packAny(_) {
        _;
        return any_1.Any.fromPartial({
            typeUrl: '/cosmos.gov.v1beta1.MsgVoteWeighted',
            value: tx_1.MsgVoteWeighted.encode(this.toProto()).finish(),
        });
    }
    static unpackAny(msgAny, _) {
        _;
        return MsgVoteWeighted.fromProto(tx_1.MsgVoteWeighted.decode(msgAny.value));
    }
}
exports.MsgVoteWeighted = MsgVoteWeighted;
//# sourceMappingURL=MsgVoteWeighted.js.map