"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MsgBeginRedelegate = void 0;
const json_1 = require("../../../util/json");
const Coin_1 = require("../../Coin");
// import { Any } from '@terra-money/legacy.proto/google/protobuf/any';
// import { MsgBeginRedelegate as MsgBeginRedelegate_pb } from '@terra-money/legacy.proto/cosmos/staking/v1beta1/tx';
const any_1 = require("@terra-money/terra.proto/google/protobuf/any");
const tx_1 = require("@terra-money/terra.proto/cosmos/staking/v1beta1/tx");
/**
 * A delegator can choose to redelegate their bonded Luna and transfer a delegation
 * amount from one validator to another. Unlike undelegating, redelegations do not incur
 * a 21-day unbonding period and happen immediately.
 */
class MsgBeginRedelegate extends json_1.JSONSerializable {
    /**
     *
     * @param delegator_address delegator's account address
     * @param validator_src_address validator to undelegate from
     * @param validator_dst_address validator to delegate to
     * @param amount LUNA to be redelegated
     */
    constructor(delegator_address, validator_src_address, validator_dst_address, amount) {
        super();
        this.delegator_address = delegator_address;
        this.validator_src_address = validator_src_address;
        this.validator_dst_address = validator_dst_address;
        this.amount = amount;
    }
    static fromAmino(data, _) {
        _;
        const { value: { delegator_address, validator_src_address, validator_dst_address, amount, }, } = data;
        return new MsgBeginRedelegate(delegator_address, validator_src_address, validator_dst_address, Coin_1.Coin.fromAmino(amount));
    }
    toAmino(isClassic) {
        const { delegator_address, validator_src_address, validator_dst_address, amount, } = this;
        return {
            type: isClassic
                ? 'staking/MsgBeginRedelegate'
                : 'cosmos-sdk/MsgBeginRedelegate',
            value: {
                delegator_address,
                validator_src_address,
                validator_dst_address,
                amount: amount.toAmino(),
            },
        };
    }
    static fromData(data, _) {
        _;
        const { delegator_address, validator_src_address, validator_dst_address, amount, } = data;
        return new MsgBeginRedelegate(delegator_address, validator_src_address, validator_dst_address, Coin_1.Coin.fromData(amount));
    }
    toData(_) {
        _;
        const { delegator_address, validator_src_address, validator_dst_address, amount, } = this;
        return {
            '@type': '/cosmos.staking.v1beta1.MsgBeginRedelegate',
            delegator_address,
            validator_src_address,
            validator_dst_address,
            amount: amount.toData(),
        };
    }
    static fromProto(proto, _) {
        _;
        return new MsgBeginRedelegate(proto.delegatorAddress, proto.validatorSrcAddress, proto.validatorDstAddress, Coin_1.Coin.fromProto(proto.amount));
    }
    toProto(_) {
        _;
        const { delegator_address, validator_src_address, validator_dst_address, amount, } = this;
        return tx_1.MsgBeginRedelegate.fromPartial({
            amount: amount.toProto(),
            delegatorAddress: delegator_address,
            validatorDstAddress: validator_dst_address,
            validatorSrcAddress: validator_src_address,
        });
    }
    packAny(isClassic) {
        return any_1.Any.fromPartial({
            typeUrl: '/cosmos.staking.v1beta1.MsgBeginRedelegate',
            value: tx_1.MsgBeginRedelegate.encode(this.toProto(isClassic)).finish(),
        });
    }
    static unpackAny(msgAny, isClassic) {
        return MsgBeginRedelegate.fromProto(tx_1.MsgBeginRedelegate.decode(msgAny.value), isClassic);
    }
}
exports.MsgBeginRedelegate = MsgBeginRedelegate;
//# sourceMappingURL=MsgBeginRedelegate.js.map