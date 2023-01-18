"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MsgCreateValidator = void 0;
const json_1 = require("../../../util/json");
const Coin_1 = require("../../Coin");
const numeric_1 = require("../../numeric");
const Validator_1 = require("../Validator");
// import { Any } from '@terra-money/legacy.proto/google/protobuf/any';
// import { MsgCreateValidator as MsgCreateValidator_pb } from '@terra-money/legacy.proto/cosmos/staking/v1beta1/tx';
const any_1 = require("@terra-money/terra.proto/google/protobuf/any");
const tx_1 = require("@terra-money/terra.proto/cosmos/staking/v1beta1/tx");
const PublicKey_1 = require("../../PublicKey");
/**
 * For new validators, this message registers a validator address to be a delegate on
 * the blockchain.
 */
class MsgCreateValidator extends json_1.JSONSerializable {
    /**
     *
     * @param description validator's delegate information
     * @param commission validator's commission policy
     * @param min_self_delegation minimum self delegation
     * @param delegator_address validator's account address
     * @param validator_address validator's operator address
     * @param pubkey validator's consensus public key
     * @param value amount to use for self-delegation
     */
    constructor(description, commission, min_self_delegation, delegator_address, validator_address, pubkey, value) {
        super();
        this.description = description;
        this.commission = commission;
        this.min_self_delegation = min_self_delegation;
        this.delegator_address = delegator_address;
        this.validator_address = validator_address;
        this.pubkey = pubkey;
        this.value = value;
    }
    static fromAmino(data, _) {
        _;
        const { value: { description, commission, min_self_delegation, delegator_address, validator_address, pubkey, value, }, } = data;
        return new MsgCreateValidator(description, Validator_1.Validator.CommissionRates.fromAmino(commission), new numeric_1.Int(min_self_delegation), delegator_address, validator_address, PublicKey_1.ValConsPublicKey.fromAmino(pubkey), Coin_1.Coin.fromAmino(value));
    }
    toAmino(isClassic) {
        const { description, commission, min_self_delegation, delegator_address, validator_address, pubkey, value, } = this;
        return {
            type: isClassic
                ? 'staking/MsgCreateValidator'
                : 'cosmos-sdk/MsgCreateValidator',
            value: {
                description,
                commission: commission.toAmino(),
                min_self_delegation: min_self_delegation.toString(),
                delegator_address,
                validator_address,
                pubkey: pubkey.toAmino(),
                value: value.toAmino(),
            },
        };
    }
    static fromData(data, _) {
        _;
        const { description, commission, min_self_delegation, delegator_address, validator_address, pubkey, value, } = data;
        return new MsgCreateValidator(description, Validator_1.Validator.CommissionRates.fromData(commission), new numeric_1.Int(min_self_delegation), delegator_address, validator_address, PublicKey_1.ValConsPublicKey.fromData(pubkey), Coin_1.Coin.fromData(value));
    }
    toData(_) {
        _;
        const { description, commission, min_self_delegation, delegator_address, validator_address, pubkey, value, } = this;
        return {
            '@type': '/cosmos.staking.v1beta1.MsgCreateValidator',
            description,
            commission: commission.toData(),
            min_self_delegation: min_self_delegation.toString(),
            delegator_address,
            validator_address,
            pubkey: pubkey.toData(),
            value: value.toData(),
        };
    }
    static fromProto(proto, _) {
        _;
        return new MsgCreateValidator(Validator_1.Validator.Description.fromProto(proto.description), Validator_1.Validator.CommissionRates.fromProto(proto.commission), new numeric_1.Int(proto.minSelfDelegation), proto.delegatorAddress, proto.validatorAddress, PublicKey_1.PublicKey.fromProto(proto.pubkey), Coin_1.Coin.fromProto(proto.value));
    }
    toProto(_) {
        _;
        const { description, commission, min_self_delegation, delegator_address, validator_address, pubkey, value, } = this;
        return tx_1.MsgCreateValidator.fromPartial({
            commission: commission.toProto(),
            delegatorAddress: delegator_address,
            description: description.toProto(),
            minSelfDelegation: min_self_delegation.toString(),
            pubkey: pubkey.packAny(),
            validatorAddress: validator_address,
            value: value.toProto(),
        });
    }
    packAny(isClassic) {
        return any_1.Any.fromPartial({
            typeUrl: '/cosmos.staking.v1beta1.MsgCreateValidator',
            value: tx_1.MsgCreateValidator.encode(this.toProto(isClassic)).finish(),
        });
    }
    static unpackAny(msgAny, isClassic) {
        return MsgCreateValidator.fromProto(tx_1.MsgCreateValidator.decode(msgAny.value), isClassic);
    }
}
exports.MsgCreateValidator = MsgCreateValidator;
//# sourceMappingURL=MsgCreateValidator.js.map