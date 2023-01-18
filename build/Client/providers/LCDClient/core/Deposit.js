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
exports.Deposit = void 0;
const Coins_1 = require("./Coins");
const json_1 = require("../util/json");
const gov_1 = require("@jmesworld/jmes.proto/src/cosmos/gov/v1beta1/gov");
const Long = __importStar(require("long"));
/**
 * Stores deposit information for a proposal
 */
class Deposit extends json_1.JSONSerializable {
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
    static fromAmino(data) {
        const { proposal_id, depositor, amount } = data;
        return new Deposit(Number.parseInt(proposal_id), depositor, Coins_1.Coins.fromAmino(amount));
    }
    toAmino() {
        const { proposal_id, depositor, amount } = this;
        return {
            proposal_id: proposal_id.toString(),
            depositor,
            amount: amount.toAmino(),
        };
    }
    static fromData(data) {
        const { proposal_id, depositor, amount } = data;
        return new Deposit(Number.parseInt(proposal_id), depositor, Coins_1.Coins.fromData(amount));
    }
    toData() {
        const { proposal_id, depositor, amount } = this;
        return {
            proposal_id: proposal_id.toString(),
            depositor,
            amount: amount.toData(),
        };
    }
    static fromProto(data) {
        return new Deposit(data.proposalId.toNumber(), data.depositor, Coins_1.Coins.fromProto(data.amount));
    }
    toProto() {
        const { proposal_id, depositor, amount } = this;
        return gov_1.Deposit.fromPartial({
            proposalId: Long.fromNumber(proposal_id),
            depositor: depositor,
            amount: amount.toProto(),
        });
    }
}
exports.Deposit = Deposit;
//# sourceMappingURL=Deposit.js.map