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
exports.Validator = void 0;
const json_1 = require("../../util/json");
const numeric_1 = require("../numeric");
const PublicKey_1 = require("../PublicKey");
const staking_1 = require("@terra-money/terra.proto/cosmos/staking/v1beta1/staking");
const Long = __importStar(require("long"));
/**
 * Stores information fetched from the blockchain about the current status of a validator.
 * As an end user, you will not have to create an instance of this class, one will be
 * generated for you to store information about a validator polled from the API functions
 * in [[StakingAPI]].
 */
class Validator extends json_1.JSONSerializable {
    /**
     *
     * @param operator_address validator's operator address
     * @param consensus_pubkey validator's consensus public key
     * @param jailed whether the current validator is jailed
     * @param status unbonded `0`, unbonding `1`, bonded `2`
     * @param tokens total Luna from all delegations (including self)
     * @param delegator_shares total shares of all delegators
     * @param description validator's delegate description
     * @param unbonding_height if unbonding, height at which this validator began unbonding
     * @param unbonding_time if unbonding, min time for the validator to complete unbonding
     * @param commission validator commission
     * @param min_self_delegation minimum self delegation
     */
    constructor(operator_address, consensus_pubkey, jailed, status, tokens, delegator_shares, description, unbonding_height, unbonding_time, commission, min_self_delegation) {
        super();
        this.operator_address = operator_address;
        this.consensus_pubkey = consensus_pubkey;
        this.jailed = jailed;
        this.status = status;
        this.tokens = tokens;
        this.delegator_shares = delegator_shares;
        this.description = description;
        this.unbonding_height = unbonding_height;
        this.unbonding_time = unbonding_time;
        this.commission = commission;
        this.min_self_delegation = min_self_delegation;
    }
    toAmino() {
        return {
            operator_address: this.operator_address,
            consensus_pubkey: this.consensus_pubkey.toAmino(),
            jailed: this.jailed,
            status: this.status,
            tokens: this.tokens.toString(),
            delegator_shares: this.delegator_shares.toString(),
            description: this.description,
            unbonding_height: this.unbonding_height.toFixed(),
            unbonding_time: this.unbonding_time.toISOString(),
            commission: this.commission.toAmino(),
            min_self_delegation: this.min_self_delegation.toString(),
        };
    }
    static fromAmino(data) {
        return new Validator(data.operator_address, PublicKey_1.ValConsPublicKey.fromAmino(data.consensus_pubkey), data.jailed || false, data.status || 0, new numeric_1.Int(data.tokens), new numeric_1.Dec(data.delegator_shares), Validator.Description.fromAmino(data.description), Number.parseInt(data.unbonding_height), new Date(data.unbonding_time), Validator.Commission.fromAmino(data.commission), new numeric_1.Int(data.min_self_delegation));
    }
    toData() {
        return {
            operator_address: this.operator_address,
            consensus_pubkey: this.consensus_pubkey.toData(),
            jailed: this.jailed,
            status: this.status,
            tokens: this.tokens.toString(),
            delegator_shares: this.delegator_shares.toString(),
            description: this.description,
            unbonding_height: this.unbonding_height.toFixed(),
            unbonding_time: this.unbonding_time.toISOString(),
            commission: this.commission.toData(),
            min_self_delegation: this.min_self_delegation.toString(),
        };
    }
    static fromData(data) {
        return new Validator(data.operator_address, PublicKey_1.ValConsPublicKey.fromData(data.consensus_pubkey), data.jailed || false, data.status || 0, new numeric_1.Int(data.tokens), new numeric_1.Dec(data.delegator_shares), Validator.Description.fromData(data.description), Number.parseInt(data.unbonding_height), new Date(data.unbonding_time), Validator.Commission.fromData(data.commission), new numeric_1.Int(data.min_self_delegation));
    }
    toProto() {
        const { operator_address, consensus_pubkey, jailed, status, tokens, delegator_shares, description, unbonding_height, unbonding_time, commission, min_self_delegation, } = this;
        return staking_1.Validator.fromPartial({
            commission: commission.toProto(),
            consensusPubkey: consensus_pubkey.packAny(),
            delegatorShares: delegator_shares.toString(),
            description: description.toProto(),
            jailed,
            minSelfDelegation: min_self_delegation.toString(),
            operatorAddress: operator_address,
            status,
            tokens: tokens.toString(),
            unbondingHeight: Long.fromNumber(unbonding_height),
            unbondingTime: unbonding_time,
        });
    }
    static fromProto(data) {
        return new Validator(data.operatorAddress, PublicKey_1.ValConsPublicKey.unpackAny(data.consensusPubkey), data.jailed, data.status, new numeric_1.Int(data.tokens), new numeric_1.Dec(data.delegatorShares), Validator.Description.fromProto(data.description), data.unbondingHeight.toNumber(), data.unbondingTime, Validator.Commission.fromProto(data.commission), new numeric_1.Int(data.minSelfDelegation));
    }
}
exports.Validator = Validator;
(function (Validator) {
    Validator.Status = staking_1.BondStatus;
    class Description extends json_1.JSONSerializable {
        /**
         * @param moniker Identifying name, e.g. "Hashed"
         * @param identity time at which commission was last updated
         * @param website validator's website
         * @param details long description
         * @param security_contact validator's contact
         */
        constructor(moniker, identity, website, details, security_contact) {
            super();
            this.moniker = moniker;
            this.identity = identity;
            this.website = website;
            this.details = details;
            this.security_contact = security_contact;
        }
        toAmino() {
            return {
                moniker: this.moniker,
                identity: this.identity,
                website: this.website,
                details: this.details,
                security_contact: this.security_contact,
            };
        }
        static fromAmino(data) {
            return new Description(data.moniker, data.identity || '', data.website || '', data.details || '', data.security_contact || '');
        }
        toData() {
            return {
                moniker: this.moniker,
                identity: this.identity,
                website: this.website,
                details: this.details,
                security_contact: this.security_contact,
            };
        }
        static fromData(data) {
            return new Description(data.moniker, data.identity || '', data.website || '', data.details || '', data.security_contact || '');
        }
        toProto() {
            const { moniker, identity, website, details, security_contact } = this;
            return staking_1.Description.fromPartial({
                details,
                identity,
                moniker,
                securityContact: security_contact,
                website,
            });
        }
        static fromProto(proto) {
            return new Description(proto.moniker, proto.identity, proto.website, proto.details, proto.securityContact);
        }
    }
    Validator.Description = Description;
    class CommissionRates extends json_1.JSONSerializable {
        /**
         * @param rate current commission rate
         * @param max_rate max commission rate
         * @param max_change_rate max percentage commission can change in 24hrs
         */
        constructor(rate, max_rate, max_change_rate) {
            super();
            this.rate = rate;
            this.max_rate = max_rate;
            this.max_change_rate = max_change_rate;
        }
        static fromAmino(data) {
            const { rate, max_rate, max_change_rate } = data;
            return new CommissionRates(new numeric_1.Dec(rate), new numeric_1.Dec(max_rate), new numeric_1.Dec(max_change_rate));
        }
        toAmino() {
            const { rate, max_rate, max_change_rate } = this;
            return {
                rate: rate.toString(),
                max_rate: max_rate.toString(),
                max_change_rate: max_change_rate.toString(),
            };
        }
        static fromData(data) {
            const { rate, max_rate, max_change_rate } = data;
            return new CommissionRates(new numeric_1.Dec(rate), new numeric_1.Dec(max_rate), new numeric_1.Dec(max_change_rate));
        }
        toData() {
            const { rate, max_rate, max_change_rate } = this;
            return {
                rate: rate.toString(),
                max_rate: max_rate.toString(),
                max_change_rate: max_change_rate.toString(),
            };
        }
        static fromProto(proto) {
            return new CommissionRates(new numeric_1.Dec(proto.rate), new numeric_1.Dec(proto.maxRate), new numeric_1.Dec(proto.maxChangeRate));
        }
        toProto() {
            const { rate, max_rate, max_change_rate } = this;
            return staking_1.CommissionRates.fromPartial({
                maxChangeRate: max_change_rate.toString(),
                maxRate: max_rate.toString(),
                rate: rate.toString(),
            });
        }
    }
    Validator.CommissionRates = CommissionRates;
    class Commission extends json_1.JSONSerializable {
        /**
         * @param commission_rates commission rates
         * @param update_time time at which commission was last updated
         */
        constructor(commission_rates, update_time) {
            super();
            this.commission_rates = commission_rates;
            this.update_time = update_time;
        }
        toAmino() {
            return {
                commission_rates: this.commission_rates.toAmino(),
                update_time: this.update_time.toISOString(),
            };
        }
        static fromAmino(data) {
            return new Commission(CommissionRates.fromAmino(data.commission_rates), new Date(data.update_time));
        }
        toData() {
            return {
                commission_rates: this.commission_rates.toData(),
                update_time: this.update_time.toISOString(),
            };
        }
        static fromData(data) {
            return new Commission(CommissionRates.fromData(data.commission_rates), new Date(data.update_time));
        }
        toProto() {
            const { commission_rates, update_time } = this;
            return staking_1.Commission.fromPartial({
                commissionRates: commission_rates.toProto(),
                updateTime: update_time,
            });
        }
        static fromProto(proto) {
            return new Commission(CommissionRates.fromProto(proto.commissionRates), proto.updateTime);
        }
    }
    Validator.Commission = Commission;
})(Validator = exports.Validator || (exports.Validator = {}));
//# sourceMappingURL=Validator.js.map