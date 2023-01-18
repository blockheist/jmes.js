"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MsgEditValidator = void 0;
const json_1 = require("../../../util/json");
const numeric_1 = require("../../numeric");
const Validator_1 = require("../Validator");
// import { Any } from '@terra-money/legacy.proto/google/protobuf/any';
// import { MsgEditValidator as MsgEditValidator_pb } from '@terra-money/legacy.proto/cosmos/staking/v1beta1/tx';
const any_1 = require("@terra-money/terra.proto/google/protobuf/any");
const tx_1 = require("@terra-money/terra.proto/cosmos/staking/v1beta1/tx");
/**
 * A validator can edit its delegate information, such as moniker, website, commission
 * rate, etc.
 *
 * You must use special or sentinel values to inform that you want to leave the current
 * field untouched. For `Description`,` you should start with [[MsgEditValidator.DESC_DO_NOT_MODIFY]] and
 * change each field you wish to modify individually.
 */
class MsgEditValidator extends json_1.JSONSerializable {
    /**
     * @param Description new description to apply
     * @param address new address to apply
     * @param commission_rate new commission rates to apply
     * @param min_self_delegation new min self delegation
     */
    constructor(description, validator_address, commission_rate, min_self_delegation) {
        super();
        this.description = description;
        this.validator_address = validator_address;
        this.commission_rate = commission_rate;
        this.min_self_delegation = min_self_delegation;
    }
    static fromAmino(data, _) {
        _;
        const { value: { description, validator_address, commission_rate, min_self_delegation, }, } = data;
        return new MsgEditValidator(Validator_1.Validator.Description.fromAmino(description), validator_address, commission_rate ? new numeric_1.Dec(commission_rate) : undefined, min_self_delegation ? new numeric_1.Int(min_self_delegation) : undefined);
    }
    toAmino(isClassic) {
        const { description, validator_address, commission_rate, min_self_delegation, } = this;
        return {
            type: isClassic
                ? 'staking/MsgEditValidator'
                : 'cosmos-sdk/MsgEditValidator',
            value: {
                description,
                validator_address,
                commission_rate: commission_rate
                    ? commission_rate.toString()
                    : undefined,
                min_self_delegation: min_self_delegation
                    ? min_self_delegation.toString()
                    : undefined,
            },
        };
    }
    static fromProto(data, _) {
        _;
        return new MsgEditValidator(Validator_1.Validator.Description.fromProto(data.description), data.validatorAddress, data.commissionRate !== '' ? new numeric_1.Dec(data.commissionRate) : undefined, data.minSelfDelegation !== ''
            ? new numeric_1.Int(data.minSelfDelegation)
            : undefined);
    }
    toProto(_) {
        _;
        const { description, validator_address, commission_rate, min_self_delegation, } = this;
        return tx_1.MsgEditValidator.fromPartial({
            description: description.toProto(),
            commissionRate: (commission_rate === null || commission_rate === void 0 ? void 0 : commission_rate.toString()) || '',
            minSelfDelegation: (min_self_delegation === null || min_self_delegation === void 0 ? void 0 : min_self_delegation.toString()) || '',
            validatorAddress: validator_address,
        });
    }
    packAny(isClassic) {
        return any_1.Any.fromPartial({
            typeUrl: '/cosmos.staking.v1beta1.MsgEditValidator',
            value: tx_1.MsgEditValidator.encode(this.toProto(isClassic)).finish(),
        });
    }
    static unpackAny(msgAny, isClassic) {
        return MsgEditValidator.fromProto(tx_1.MsgEditValidator.decode(msgAny.value), isClassic);
    }
    static fromData(data, _) {
        _;
        const { description, validator_address, commission_rate, min_self_delegation, } = data;
        return new MsgEditValidator(Validator_1.Validator.Description.fromData(description), validator_address, commission_rate ? new numeric_1.Dec(commission_rate) : undefined, min_self_delegation ? new numeric_1.Int(min_self_delegation) : undefined);
    }
    toData(_) {
        _;
        const { description, validator_address, commission_rate, min_self_delegation, } = this;
        return {
            '@type': '/cosmos.staking.v1beta1.MsgEditValidator',
            description,
            validator_address,
            commission_rate: commission_rate ? commission_rate.toString() : undefined,
            min_self_delegation: min_self_delegation
                ? min_self_delegation.toString()
                : undefined,
        };
    }
}
exports.MsgEditValidator = MsgEditValidator;
(function (MsgEditValidator) {
    MsgEditValidator.DESC_DO_NOT_MODIFY = {
        moniker: '[do-not-modify]',
        website: '[do-not-modify]',
        identity: '[do-not-modify]',
        details: '[do-not-modify]',
        security_contact: '[do-not-modify]',
    };
})(MsgEditValidator = exports.MsgEditValidator || (exports.MsgEditValidator = {}));
//# sourceMappingURL=MsgEditValidator.js.map