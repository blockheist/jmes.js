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
exports.UnbondingDelegation = void 0;
const json_1 = require("../../util/json");
const numeric_1 = require("../numeric");
const staking_1 = require("@terra-money/terra.proto/cosmos/staking/v1beta1/staking");
const Long = __importStar(require("long"));
/**
 * When a delegator decides to take out their funds from the staking pool, they must
 * unbond their tokens which takes an amount of time specified by `unbonding_time`
 * parameter in the staking module.
 *
 * An unbonding delegation is implemented through creating [[UnbondingDelegation.Entry]]
 * objects, limited by the max_entry parameter in the staking module params. You cannot
 * initiate unbonds more times than the amount of entries permitted. Entries are cleared
 * when their unbonding periods are completed and the funds are returned to the
 * delegator's account balance to be spent freely.
 */
class UnbondingDelegation extends json_1.JSONSerializable {
    constructor(delegator_address, validator_address, entries) {
        super();
        this.delegator_address = delegator_address;
        this.validator_address = validator_address;
        this.entries = entries;
    }
    static fromAmino(data) {
        const { delegator_address, validator_address, entries } = data;
        return new UnbondingDelegation(delegator_address, validator_address, entries.map(e => UnbondingDelegation.Entry.fromAmino(e)));
    }
    toAmino() {
        const { delegator_address, validator_address, entries } = this;
        return {
            delegator_address,
            validator_address,
            entries: entries.map(e => e.toAmino()),
        };
    }
    static fromData(data) {
        const { delegator_address, validator_address, entries } = data;
        return new UnbondingDelegation(delegator_address, validator_address, entries.map(e => UnbondingDelegation.Entry.fromData(e)));
    }
    toData() {
        const { delegator_address, validator_address, entries } = this;
        return {
            delegator_address,
            validator_address,
            entries: entries.map(e => e.toData()),
        };
    }
    toProto() {
        const { delegator_address, validator_address, entries } = this;
        return staking_1.UnbondingDelegation.fromPartial({
            delegatorAddress: delegator_address,
            entries: entries.map(e => e.toProto()),
            validatorAddress: validator_address,
        });
    }
    static fromProto(proto) {
        return new UnbondingDelegation(proto.delegatorAddress, proto.validatorAddress, proto.entries.map(e => UnbondingDelegation.Entry.fromProto(e)));
    }
}
exports.UnbondingDelegation = UnbondingDelegation;
(function (UnbondingDelegation) {
    class Entry extends json_1.JSONSerializable {
        /**
         * Note that the size of the undelegation is `initial_balance - balance`
         * @param initial_balance balance of delegation prior to initiating unbond
         * @param balance balance of delegation after initiating unbond
         * @param creation_height height of blockchain when entry was created
         * @param completion_time time when unbonding will be completed
         */
        constructor(initial_balance, balance, creation_height, completion_time) {
            super();
            this.initial_balance = initial_balance;
            this.balance = balance;
            this.creation_height = creation_height;
            this.completion_time = completion_time;
        }
        toAmino() {
            return {
                initial_balance: this.initial_balance.toString(),
                balance: this.balance.toString(),
                creation_height: this.creation_height.toFixed(),
                completion_time: this.completion_time.toISOString(),
            };
        }
        static fromAmino(data) {
            const { initial_balance, balance, creation_height, completion_time } = data;
            return new Entry(new numeric_1.Int(initial_balance), new numeric_1.Int(balance), Number.parseInt(creation_height), new Date(completion_time));
        }
        toData() {
            return {
                initial_balance: this.initial_balance.toString(),
                balance: this.balance.toString(),
                creation_height: this.creation_height.toFixed(),
                completion_time: this.completion_time.toISOString(),
            };
        }
        static fromData(data) {
            const { initial_balance, balance, creation_height, completion_time } = data;
            return new Entry(new numeric_1.Int(initial_balance), new numeric_1.Int(balance), Number.parseInt(creation_height), new Date(completion_time));
        }
        toProto() {
            const { initial_balance, balance, creation_height, completion_time } = this;
            return staking_1.UnbondingDelegationEntry.fromPartial({
                balance: balance.toString(),
                completionTime: completion_time,
                creationHeight: Long.fromNumber(creation_height),
                initialBalance: initial_balance.toString(),
            });
        }
        static fromProto(proto) {
            return new Entry(new numeric_1.Int(proto.initialBalance), new numeric_1.Int(proto.balance), proto.creationHeight.toNumber(), proto.completionTime);
        }
    }
    UnbondingDelegation.Entry = Entry;
})(UnbondingDelegation = exports.UnbondingDelegation || (exports.UnbondingDelegation = {}));
//# sourceMappingURL=UnbondingDelegation.js.map