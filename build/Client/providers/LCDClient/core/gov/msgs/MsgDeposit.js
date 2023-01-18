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
exports.MsgDeposit = void 0;
const Coins_1 = require("../../Coins");
const json_1 = require("../../../util/json");
const any_1 = require("@terra-money/terra.proto/google/protobuf/any");
const tx_1 = require("@terra-money/terra.proto/cosmos/gov/v1beta1/tx");
const Long = __importStar(require("long"));
/**
 * Add a deposit for a proposal
 */
class MsgDeposit extends json_1.JSONSerializable {
    /**
     * @param proposal_id Id of porposal to deposit to
     * @param depositor depositor's account address
     * @param amount amount to deposit
     */
    constructor(proposal_id, depositor, amount) {
        super();
        this.proposal_id = proposal_id;
        this.depositor = depositor;
        this.amount = new Coins_1.Coins(amount);
    }
    static fromAmino(data, _) {
        _;
        const { value: { proposal_id, depositor, amount }, } = data;
        return new MsgDeposit(Number.parseInt(proposal_id), depositor, Coins_1.Coins.fromAmino(amount));
    }
    toAmino(isClassic) {
        const { proposal_id, depositor, amount } = this;
        return {
            type: isClassic ? 'gov/MsgDeposit' : 'cosmos-sdk/MsgDeposit',
            value: {
                proposal_id: proposal_id.toString(),
                depositor,
                amount: amount.toAmino(),
            },
        };
    }
    static fromData(data, _) {
        _;
        const { proposal_id, depositor, amount } = data;
        return new MsgDeposit(Number.parseInt(proposal_id), depositor, Coins_1.Coins.fromData(amount));
    }
    toData(_) {
        _;
        const { proposal_id, depositor, amount } = this;
        return {
            '@type': '/cosmos.gov.v1beta1.MsgDeposit',
            proposal_id: proposal_id.toString(),
            depositor,
            amount: amount.toData(),
        };
    }
    static fromProto(proto, _) {
        _;
        return new MsgDeposit(proto.proposalId.toNumber(), proto.depositor, Coins_1.Coins.fromProto(proto.amount));
    }
    toProto(_) {
        _;
        const { proposal_id, depositor, amount } = this;
        return tx_1.MsgDeposit.fromPartial({
            amount: amount.toProto(),
            depositor,
            proposalId: Long.fromNumber(proposal_id),
        });
    }
    packAny(isClassic) {
        return any_1.Any.fromPartial({
            typeUrl: '/cosmos.gov.v1beta1.MsgDeposit',
            value: tx_1.MsgDeposit.encode(this.toProto(isClassic)).finish(),
        });
    }
    static unpackAny(msgAny, isClassic) {
        return MsgDeposit.fromProto(tx_1.MsgDeposit.decode(msgAny.value), isClassic);
    }
}
exports.MsgDeposit = MsgDeposit;
//# sourceMappingURL=MsgDeposit.js.map