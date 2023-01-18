"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MsgWithdrawValidatorCommission = void 0;
const json_1 = require("../../../util/json");
const any_1 = require("@terra-money/terra.proto/google/protobuf/any");
const tx_1 = require("@terra-money/legacy.proto/cosmos/distribution/v1beta1/tx");
/**
 * A validator can withdraw their outstanding commission rewards accrued from all
 * delegations (not including its self-delegation) into their associated account's
 * withdraw address.
 */
class MsgWithdrawValidatorCommission extends json_1.JSONSerializable {
    /**
     * @param validator_address validator's operator address
     */
    constructor(validator_address) {
        super();
        this.validator_address = validator_address;
    }
    static fromAmino(data, _) {
        _;
        const { value: { validator_address }, } = data;
        return new MsgWithdrawValidatorCommission(validator_address);
    }
    toAmino(isClassic) {
        const { validator_address } = this;
        return {
            type: isClassic
                ? 'distribution/MsgWithdrawValidatorCommission'
                : 'cosmos-sdk/MsgWithdrawValidatorCommission',
            value: {
                validator_address,
            },
        };
    }
    static fromData(proto, _) {
        _;
        const { validator_address } = proto;
        return new MsgWithdrawValidatorCommission(validator_address);
    }
    toData(_) {
        _;
        const { validator_address } = this;
        return {
            '@type': '/cosmos.distribution.v1beta1.MsgWithdrawValidatorCommission',
            validator_address,
        };
    }
    static fromProto(proto, _) {
        _;
        return new MsgWithdrawValidatorCommission(proto.validatorAddress);
    }
    toProto(_) {
        _;
        const { validator_address } = this;
        return tx_1.MsgWithdrawValidatorCommission.fromPartial({
            validatorAddress: validator_address,
        });
    }
    packAny(isClassic) {
        return any_1.Any.fromPartial({
            typeUrl: '/cosmos.distribution.v1beta1.MsgWithdrawValidatorCommission',
            value: tx_1.MsgWithdrawValidatorCommission.encode(this.toProto(isClassic)).finish(),
        });
    }
    static unpackAny(msgAny, isClassic) {
        return MsgWithdrawValidatorCommission.fromProto(tx_1.MsgWithdrawValidatorCommission.decode(msgAny.value), isClassic);
    }
}
exports.MsgWithdrawValidatorCommission = MsgWithdrawValidatorCommission;
//# sourceMappingURL=MsgWithdrawValidatorCommission.js.map