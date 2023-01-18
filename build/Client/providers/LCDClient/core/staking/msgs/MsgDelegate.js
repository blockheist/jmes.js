"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MsgDelegate = void 0;
const Coin_1 = require("../../Coin");
const json_1 = require("../../../util/json");
// import { Any } from '@terra-money/legacy.proto/google/protobuf/any';
// import { MsgDelegate as MsgDelegate_pb } from '@terra-money/legacy.proto/cosmos/staking/v1beta1/tx';
const any_1 = require("@terra-money/terra.proto/google/protobuf/any");
const tx_1 = require("@terra-money/terra.proto/cosmos/staking/v1beta1/tx");
/**
 * A delegator can submit this message to send more Luna to be staked through a
 * validator delegate.
 */
class MsgDelegate extends json_1.JSONSerializable {
    /**
     *
     * @param delegator_address delegator's account address
     * @param validator_address validator's operator address
     * @param amount amount of LUNA to be sent for delegation
     */
    constructor(delegator_address, validator_address, amount) {
        super();
        this.delegator_address = delegator_address;
        this.validator_address = validator_address;
        this.amount = amount;
    }
    static fromAmino(data, _) {
        _;
        const { value: { delegator_address, validator_address, amount }, } = data;
        return new MsgDelegate(delegator_address, validator_address, Coin_1.Coin.fromAmino(amount));
    }
    toAmino(isClassic) {
        const { delegator_address, validator_address, amount } = this;
        return {
            type: isClassic ? 'staking/MsgDelegate' : 'cosmos-sdk/MsgDelegate',
            value: {
                delegator_address,
                validator_address,
                amount: amount.toAmino(),
            },
        };
    }
    static fromProto(proto, _) {
        _;
        return new MsgDelegate(proto.delegatorAddress, proto.validatorAddress, Coin_1.Coin.fromProto(proto.amount));
    }
    toProto(_) {
        _;
        const { delegator_address, validator_address, amount } = this;
        return tx_1.MsgDelegate.fromPartial({
            amount: amount.toProto(),
            delegatorAddress: delegator_address,
            validatorAddress: validator_address,
        });
    }
    packAny(isClassic) {
        return any_1.Any.fromPartial({
            typeUrl: '/cosmos.staking.v1beta1.MsgDelegate',
            value: tx_1.MsgDelegate.encode(this.toProto(isClassic)).finish(),
        });
    }
    static unpackAny(msgAny, isClassic) {
        return MsgDelegate.fromProto(tx_1.MsgDelegate.decode(msgAny.value), isClassic);
    }
    static fromData(data, _) {
        _;
        const { delegator_address, validator_address, amount } = data;
        return new MsgDelegate(delegator_address, validator_address, Coin_1.Coin.fromData(amount));
    }
    toData(_) {
        _;
        const { delegator_address, validator_address, amount } = this;
        return {
            '@type': '/cosmos.staking.v1beta1.MsgDelegate',
            delegator_address,
            validator_address,
            amount: amount.toData(),
        };
    }
}
exports.MsgDelegate = MsgDelegate;
//# sourceMappingURL=MsgDelegate.js.map