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
exports.MsgVote = void 0;
const json_1 = require("../../../util/json");
const any_1 = require("@terra-money/terra.proto/google/protobuf/any");
const tx_1 = require("@terra-money/terra.proto/cosmos/gov/v1beta1/tx");
const gov_1 = require("@terra-money/terra.proto/cosmos/gov/v1beta1/gov");
const Long = __importStar(require("long"));
/**
 * Vote for a proposal
 */
class MsgVote extends json_1.JSONSerializable {
    /**
     * @param proposal_id ID of proposal to vote on
     * @param voter voter's account address
     * @param option one of voting options
     */
    constructor(proposal_id, voter, option) {
        super();
        this.proposal_id = proposal_id;
        this.voter = voter;
        this.option = option;
    }
    static fromAmino(data, _) {
        _;
        const { value: { proposal_id, voter, option }, } = data;
        return new MsgVote(Number.parseInt(proposal_id), voter, option);
    }
    toAmino(isClassic) {
        const { proposal_id, voter, option } = this;
        return {
            type: isClassic ? 'gov/MsgVote' : 'cosmos-sdk/MsgVote',
            value: {
                proposal_id: proposal_id.toFixed(),
                voter,
                option,
            },
        };
    }
    static fromData(data, _) {
        _;
        const { proposal_id, voter, option } = data;
        return new MsgVote(Number.parseInt(proposal_id), voter, option);
    }
    toData(_) {
        _;
        const { proposal_id, voter, option } = this;
        return {
            '@type': '/cosmos.gov.v1beta1.MsgVote',
            proposal_id: proposal_id.toFixed(),
            voter,
            option,
        };
    }
    static fromProto(proto, _) {
        _;
        return new MsgVote(proto.proposalId.toNumber(), proto.voter, proto.option);
    }
    toProto(_) {
        _;
        const { proposal_id, voter, option } = this;
        return tx_1.MsgVote.fromPartial({
            option,
            proposalId: Long.fromNumber(proposal_id),
            voter,
        });
    }
    packAny(_) {
        _;
        return any_1.Any.fromPartial({
            typeUrl: '/cosmos.gov.v1beta1.MsgVote',
            value: tx_1.MsgVote.encode(this.toProto()).finish(),
        });
    }
    static unpackAny(msgAny, _) {
        _;
        return MsgVote.fromProto(tx_1.MsgVote.decode(msgAny.value));
    }
}
exports.MsgVote = MsgVote;
(function (MsgVote) {
    MsgVote.Option = gov_1.VoteOption;
})(MsgVote = exports.MsgVote || (exports.MsgVote = {}));
//# sourceMappingURL=MsgVote.js.map