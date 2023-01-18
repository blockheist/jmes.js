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
exports.Redelegation = void 0;
const json_1 = require("../../util/json");
const numeric_1 = require("../numeric");
const staking_1 = require("@terra-money/terra.proto/cosmos/staking/v1beta1/staking");
const Long = __importStar(require("long"));
/**
 * A redelegation is when a delegator decides to stop staking with one validator and
 * transfer their delegation to another validator. Rather than unbonding (which takes
 * some time) and re-staking, the funds can be redelegated immediately if a
 * [[Redelegation.Entry]] can be created.
 *
 * A redelegation, like an unbonding delegation, is implemented through
 * [[Redelegation.Entry]] objects, limited by the `max_entry` parameter in the staking
 * module params. For each pair of source and target validators, you cannot redelegate
 * more times than the amount of entries. Entries are cleared when the redelegation is
 * completed, the same amount of time as unbonding.
 */
class Redelegation extends json_1.JSONSerializable {
    /**
     *
     * @param delegator_address delegator's account address
     * @param validator_src_address source validator's operator address (from)
     * @param validator_dst_address target validator's operator address (to)
     * @param entries entries
     */
    constructor(delegator_address, validator_src_address, validator_dst_address, entries) {
        super();
        this.delegator_address = delegator_address;
        this.validator_src_address = validator_src_address;
        this.validator_dst_address = validator_dst_address;
        this.entries = entries;
    }
    static fromAmino(data) {
        const { redelegation: { delegator_address, validator_src_address, validator_dst_address, }, entries, } = data;
        return new Redelegation(delegator_address, validator_src_address, validator_dst_address, entries.map(e => Redelegation.Entry.fromAmino(e)));
    }
    toAmino() {
        const { delegator_address, validator_src_address, validator_dst_address, entries, } = this;
        return {
            redelegation: {
                delegator_address,
                validator_src_address,
                validator_dst_address,
            },
            entries: entries.map(e => e.toAmino()),
        };
    }
    static fromData(data) {
        const { redelegation: { delegator_address, validator_src_address, validator_dst_address, }, entries, } = data;
        return new Redelegation(delegator_address, validator_src_address, validator_dst_address, entries.map(e => Redelegation.Entry.fromData(e)));
    }
    toData() {
        const { delegator_address, validator_src_address, validator_dst_address, entries, } = this;
        return {
            redelegation: {
                delegator_address,
                validator_src_address,
                validator_dst_address,
            },
            entries: entries.map(e => e.toData()),
        };
    }
    static fromProto(data) {
        const redelegationProto = data.redelegation;
        return new Redelegation(redelegationProto.delegatorAddress, redelegationProto.validatorDstAddress, redelegationProto.validatorDstAddress, data.entries.map(e => Redelegation.Entry.fromProto(e)));
    }
    toProto() {
        const { delegator_address, validator_src_address, validator_dst_address, entries, } = this;
        return staking_1.RedelegationResponse.fromPartial({
            entries: entries.map(e => e.toProto()),
            redelegation: staking_1.Redelegation.fromPartial({
                delegatorAddress: delegator_address,
                entries: entries.map(e => e.toProto().redelegationEntry),
                validatorDstAddress: validator_dst_address,
                validatorSrcAddress: validator_src_address,
            }),
        });
    }
}
exports.Redelegation = Redelegation;
(function (Redelegation) {
    class Entry extends json_1.JSONSerializable {
        /**
         *
         * @param initial_balance balance of delegation prior to initiating redelegation
         * @param shares_dst
         * @param creation_height 	height of blockchain when entry was created
         * @param completion_time time when redelegation entry will be removed
         */
        constructor(initial_balance, balance, shares_dst, creation_height, completion_time) {
            super();
            this.initial_balance = initial_balance;
            this.balance = balance;
            this.shares_dst = shares_dst;
            this.creation_height = creation_height;
            this.completion_time = completion_time;
        }
        toAmino() {
            return {
                redelegation_entry: {
                    initial_balance: this.initial_balance.toString(),
                    shares_dst: this.shares_dst.toString(),
                    creation_height: this.creation_height,
                    completion_time: this.completion_time.toISOString(),
                },
                balance: this.balance.toString(),
            };
        }
        static fromAmino(data) {
            const { redelegation_entry: { initial_balance, shares_dst, creation_height, completion_time, }, balance, } = data;
            return new Entry(new numeric_1.Int(initial_balance), new numeric_1.Int(balance), new numeric_1.Dec(shares_dst), creation_height, new Date(completion_time));
        }
        toData() {
            return {
                redelegation_entry: {
                    initial_balance: this.initial_balance.toString(),
                    shares_dst: this.shares_dst.toString(),
                    creation_height: this.creation_height,
                    completion_time: this.completion_time.toISOString(),
                },
                balance: this.balance.toString(),
            };
        }
        static fromData(data) {
            const { redelegation_entry: { initial_balance, shares_dst, creation_height, completion_time, }, balance, } = data;
            return new Entry(new numeric_1.Int(initial_balance), new numeric_1.Int(balance), new numeric_1.Dec(shares_dst), creation_height, new Date(completion_time));
        }
        toProto() {
            const { initial_balance, balance, shares_dst, creation_height, completion_time, } = this;
            return staking_1.RedelegationEntryResponse.fromPartial({
                balance: balance.toString(),
                redelegationEntry: staking_1.RedelegationEntry.fromPartial({
                    completionTime: completion_time,
                    creationHeight: Long.fromNumber(creation_height),
                    initialBalance: initial_balance.toString(),
                    sharesDst: shares_dst.toString(),
                }),
            });
        }
        static fromProto(proto) {
            const redelegationEntryProto = proto.redelegationEntry;
            return new Entry(new numeric_1.Int(redelegationEntryProto.initialBalance), new numeric_1.Int(proto.balance), new numeric_1.Dec(redelegationEntryProto.sharesDst), redelegationEntryProto.creationHeight.toNumber(), redelegationEntryProto.completionTime);
        }
    }
    Redelegation.Entry = Entry;
})(Redelegation = exports.Redelegation || (exports.Redelegation = {}));
//# sourceMappingURL=Redelegation.js.map