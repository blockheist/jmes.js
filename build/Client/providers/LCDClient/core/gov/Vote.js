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
exports.WeightedVoteOption = exports.Vote = void 0;
const json_1 = require("../../util/json");
const gov_1 = require("@terra-money/terra.proto/cosmos/gov/v1beta1/gov");
const numeric_1 = require("../numeric");
const Long = __importStar(require("long"));
/**
 * Stores vote information for a proposal
 */
class Vote extends json_1.JSONSerializable {
    /**
     * @param proposal_id ID of proposal to vote on
     * @param voter voter's account address
     * @param options voting options
     */
    constructor(proposal_id, voter, options) {
        super();
        this.proposal_id = proposal_id;
        this.voter = voter;
        this.options = options;
        this.Option = gov_1.VoteOption;
    }
    static fromAmino(data, _) {
        _;
        const { proposal_id, voter, options } = data;
        return new Vote(Number.parseInt(proposal_id), voter, options.map(v => WeightedVoteOption.fromAmino(v)));
    }
    toAmino(_) {
        _;
        const { proposal_id, voter, options } = this;
        const res = {
            proposal_id: proposal_id.toFixed(),
            voter,
            options: options.map(v => v.toAmino()),
        };
        return res;
    }
    static fromData(data, _) {
        _;
        const { proposal_id, voter, options } = data;
        return new Vote(Number.parseInt(proposal_id), voter, options.map(v => WeightedVoteOption.fromData(v)));
    }
    toData(_) {
        _;
        const { proposal_id, voter, options } = this;
        const res = {
            proposal_id: proposal_id.toFixed(),
            voter,
            options: options.map(v => v.toData()),
        };
        return res;
    }
    static fromProto(proto, _) {
        _;
        return new Vote(proto.proposalId.toNumber(), proto.voter, proto.options.map(o => WeightedVoteOption.fromProto(o)));
    }
    toProto(_) {
        _;
        const { proposal_id, voter, options } = this;
        return gov_1.Vote.fromPartial({
            options: options.map(o => o.toProto()),
            proposalId: Long.fromNumber(proposal_id),
            voter,
        });
    }
}
exports.Vote = Vote;
(function (Vote) {
    Vote.Option = gov_1.VoteOption;
})(Vote = exports.Vote || (exports.Vote = {}));
class WeightedVoteOption extends json_1.JSONSerializable {
    constructor(option, weight) {
        super();
        this.option = option;
        this.weight = new numeric_1.Dec(weight);
    }
    static fromAmino(data, _) {
        _;
        const { option, weight } = data;
        return new WeightedVoteOption(option, weight);
    }
    toAmino(_) {
        _;
        const { option, weight } = this;
        return {
            option,
            weight: weight.toString(),
        };
    }
    static fromData(data, _) {
        _;
        const { option, weight } = data;
        return new WeightedVoteOption(option, weight);
    }
    toData(_) {
        _;
        const { option, weight } = this;
        return {
            option,
            weight: weight.toString(),
        };
    }
    static fromProto(proto, _) {
        _;
        return new WeightedVoteOption(proto.option, proto.weight);
    }
    toProto(_) {
        _;
        const { option, weight } = this;
        return gov_1.WeightedVoteOption.fromPartial({
            option,
            weight: weight.toString(),
        });
    }
}
exports.WeightedVoteOption = WeightedVoteOption;
//# sourceMappingURL=Vote.js.map