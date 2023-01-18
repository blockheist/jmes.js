"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MsgWithdrawDelegatorReward = void 0;
const json_1 = require("../../../util/json");
const any_1 = require("@terra-money/terra.proto/google/protobuf/any");
// there's no difference between two protos
// import { MsgWithdrawDelegatorReward as MsgWithdrawDelegatorReward_legacy_pb } from '@terra-money/legacy.proto/cosmos/distribution/v1beta1/tx';
const tx_1 = require("@terra-money/terra.proto/cosmos/distribution/v1beta1/tx");
/**
 * A delegator can withdraw currently outstanding rewards accrued from their delegation
 * toward a validator by submitting the following message.
 *
 * The rewards will be deposited to their Withdraw Address.
 */
class MsgWithdrawDelegatorReward extends json_1.JSONSerializable {
    /**
     *
     * @param delegator_address delegator's account address
     * @param validator_address validator's operator address
     */
    constructor(delegator_address, validator_address) {
        super();
        this.delegator_address = delegator_address;
        this.validator_address = validator_address;
    }
    static fromAmino(data, _) {
        _;
        const { value: { delegator_address, validator_address }, } = data;
        return new MsgWithdrawDelegatorReward(delegator_address, validator_address);
    }
    toAmino(isClassic) {
        const { delegator_address, validator_address } = this;
        return {
            type: isClassic
                ? 'distribution/MsgWithdrawDelegationReward'
                : 'cosmos-sdk/MsgWithdrawDelegationReward',
            value: {
                delegator_address,
                validator_address,
            },
        };
    }
    static fromData(proto, _) {
        _;
        const { delegator_address, validator_address } = proto;
        return new MsgWithdrawDelegatorReward(delegator_address, validator_address);
    }
    toData(_) {
        _;
        const { delegator_address, validator_address } = this;
        return {
            '@type': '/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward',
            delegator_address,
            validator_address,
        };
    }
    static fromProto(proto, _) {
        _;
        return new MsgWithdrawDelegatorReward(proto.delegatorAddress, proto.validatorAddress);
    }
    toProto(_) {
        _;
        const { delegator_address, validator_address } = this;
        return tx_1.MsgWithdrawDelegatorReward.fromPartial({
            delegatorAddress: delegator_address,
            validatorAddress: validator_address,
        });
    }
    packAny(isClassic) {
        return any_1.Any.fromPartial({
            typeUrl: '/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward',
            value: tx_1.MsgWithdrawDelegatorReward.encode(this.toProto(isClassic)).finish(),
        });
    }
    static unpackAny(msgAny, isClassic) {
        return MsgWithdrawDelegatorReward.fromProto(tx_1.MsgWithdrawDelegatorReward.decode(msgAny.value), isClassic);
    }
}
exports.MsgWithdrawDelegatorReward = MsgWithdrawDelegatorReward;
//# sourceMappingURL=MsgWithdrawDelegatorReward.js.map