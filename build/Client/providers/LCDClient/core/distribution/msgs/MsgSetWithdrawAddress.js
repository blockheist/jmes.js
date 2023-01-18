"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MsgSetWithdrawAddress = void 0;
const json_1 = require("../../../util/json");
const any_1 = require("@terra-money/terra.proto/google/protobuf/any");
// there's no difference between two protos
// import { MsgSetWithdrawAddress as MsgSetWithdrawAddress_legacy_pb } from '@terra-money/legacy.proto/cosmos/distribution/v1beta1/tx';
const tx_1 = require("@terra-money/terra.proto/cosmos/distribution/v1beta1/tx");
/**
 * A validator can withdraw their outstanding commission rewards accrued from all
 * delegations (not including its self-delegation) into their associated account's
 * withdraw address.
 */
class MsgSetWithdrawAddress extends json_1.JSONSerializable {
    /**
     * @param delegator_address delegator's account address
     * @param withdraw_address desired new withdraw address
     */
    constructor(delegator_address, withdraw_address) {
        super();
        this.delegator_address = delegator_address;
        this.withdraw_address = withdraw_address;
    }
    static fromAmino(data, _) {
        _;
        const { value: { delegator_address, withdraw_address }, } = data;
        return new MsgSetWithdrawAddress(delegator_address, withdraw_address);
    }
    toAmino(isClassic) {
        const { delegator_address, withdraw_address } = this;
        return {
            type: isClassic
                ? 'distribution/MsgModifyWithdrawAddress'
                : 'cosmos-sdk/MsgModifyWithdrawAddress',
            value: {
                delegator_address,
                withdraw_address,
            },
        };
    }
    static fromData(data, _) {
        _;
        const { delegator_address, withdraw_address } = data;
        return new MsgSetWithdrawAddress(delegator_address, withdraw_address);
    }
    toData(_) {
        _;
        const { delegator_address, withdraw_address } = this;
        return {
            '@type': '/cosmos.distribution.v1beta1.MsgSetWithdrawAddress',
            delegator_address,
            withdraw_address,
        };
    }
    static fromProto(proto, _) {
        _;
        return new MsgSetWithdrawAddress(proto.delegatorAddress, proto.withdrawAddress);
    }
    toProto(_) {
        _;
        const { delegator_address, withdraw_address } = this;
        return tx_1.MsgSetWithdrawAddress.fromPartial({
            delegatorAddress: delegator_address,
            withdrawAddress: withdraw_address,
        });
    }
    packAny(isClassic) {
        return any_1.Any.fromPartial({
            typeUrl: '/cosmos.distribution.v1beta1.MsgSetWithdrawAddress',
            value: tx_1.MsgSetWithdrawAddress.encode(this.toProto(isClassic)).finish(),
        });
    }
    static unpackAny(msgAny, isClassic) {
        return MsgSetWithdrawAddress.fromProto(tx_1.MsgSetWithdrawAddress.decode(msgAny.value), isClassic);
    }
}
exports.MsgSetWithdrawAddress = MsgSetWithdrawAddress;
//# sourceMappingURL=MsgSetWithdrawAddress.js.map