"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Delegation = void 0;
const json_1 = require("../../util/json");
const numeric_1 = require("../numeric");
const Coin_1 = require("../Coin");
const staking_1 = require("@terra-money/terra.proto/cosmos/staking/v1beta1/staking");
/**
 * Stores information about the status of a delegation between a delegator and validator, fetched from the blockchain.
 */
class Delegation extends json_1.JSONSerializable {
    /**
     * @param delegator_address 	delegator's account address
     * @param validator_address 	validator's operator address
     * @param shares 	delegator's shares
     * @param balance balance of the delegation
     */
    constructor(delegator_address, validator_address, shares, balance) {
        super();
        this.delegator_address = delegator_address;
        this.validator_address = validator_address;
        this.shares = shares;
        this.balance = balance;
    }
    static fromAmino(data) {
        const { delegation: { delegator_address, validator_address, shares }, balance, } = data;
        return new Delegation(delegator_address, validator_address, new numeric_1.Dec(shares), Coin_1.Coin.fromAmino(balance));
    }
    toAmino() {
        const { delegator_address, validator_address, shares, balance } = this;
        return {
            delegation: {
                delegator_address,
                validator_address,
                shares: shares.toString(),
            },
            balance: balance.toAmino(),
        };
    }
    static fromData(data) {
        const { delegation: { delegator_address, validator_address, shares }, balance, } = data;
        return new Delegation(delegator_address, validator_address, new numeric_1.Dec(shares), Coin_1.Coin.fromData(balance));
    }
    toData() {
        const { delegator_address, validator_address, shares, balance } = this;
        return {
            delegation: {
                delegator_address,
                validator_address,
                shares: shares.toString(),
            },
            balance: balance.toData(),
        };
    }
    static fromProto(proto) {
        const delegationProto = proto.delegation;
        return new Delegation(delegationProto.delegatorAddress, delegationProto.validatorAddress, new numeric_1.Dec(delegationProto.shares), Coin_1.Coin.fromProto(proto.balance));
    }
    toProto() {
        const { delegator_address, validator_address, shares, balance } = this;
        return staking_1.DelegationResponse.fromPartial({
            delegation: staking_1.Delegation.fromPartial({
                delegatorAddress: delegator_address,
                shares: shares.toString(),
                validatorAddress: validator_address,
            }),
            balance: balance.toProto(),
        });
    }
}
exports.Delegation = Delegation;
//# sourceMappingURL=Delegation.js.map