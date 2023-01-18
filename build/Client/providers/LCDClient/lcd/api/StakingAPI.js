"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StakingAPI = void 0;
const core_1 = require("../../core");
const BaseAPI_1 = require("./BaseAPI");
const Delegation_1 = require("../../core/staking/Delegation");
const Validator_1 = require("../../core/staking/Validator");
const Redelegation_1 = require("../../core/staking/Redelegation");
class StakingAPI extends BaseAPI_1.BaseAPI {
    constructor(lcd) {
        super(lcd.apiRequester);
        this.lcd = lcd;
    }
    /**
     * Queries all delegations, filtering by delegator, validator, or both.
     *
     * At least one of the parameters must be defined.
     * @param delegator delegator's account address
     * @param validator validator's operator address
     */
    delegations(delegator, validator, params = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            if (delegator !== undefined && validator !== undefined) {
                return this.c
                    .get(`/cosmos/staking/v1beta1/validators/${validator}/delegations/${delegator}`, params)
                    .then(({ delegation_response: data }) => [
                    [Delegation_1.Delegation.fromData(data)],
                    { total: 1, next_key: '' },
                ]);
            }
            else if (delegator !== undefined) {
                return this.c
                    .get(`/cosmos/staking/v1beta1/delegations/${delegator}`, params)
                    .then(data => [
                    data.delegation_responses.map(Delegation_1.Delegation.fromData),
                    data.pagination,
                ]);
            }
            else if (validator !== undefined) {
                return this.c
                    .get(`/cosmos/staking/v1beta1/validators/${validator}/delegations`, params)
                    .then(data => [
                    data.delegation_responses.map(Delegation_1.Delegation.fromData),
                    data.pagination,
                ]);
            }
            else {
                throw new TypeError('arguments delegator and validator cannot both be empty');
            }
        });
    }
    /**
     * Gets the delegation between a delegator and validator, if it exists.
     * @param delegator delegator's account address
     * @param validator validator's operator address
     */
    delegation(delegator, validator) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.delegations(delegator, validator).then(delgs => delgs[0][0]);
        });
    }
    /**
     * Queries all unbonding delegations, filtering by delegator, validator, or both.
     *
     * At least one of the parameters must be defined.
     * @param delegator delegator's account address
     * @param validator validator's operator address
     */
    unbondingDelegations(delegator, validator, params = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            if (delegator !== undefined && validator !== undefined) {
                return this.c
                    .get(`/cosmos/staking/v1beta1/validators/${validator}/delegations/${delegator}/unbonding_delegation`, params)
                    .then(({ unbond: data }) => [
                    [core_1.UnbondingDelegation.fromData(data)],
                    { next_key: '', total: 1 },
                ]);
            }
            else if (delegator !== undefined) {
                return this.c
                    .get(`/cosmos/staking/v1beta1/delegators/${delegator}/unbonding_delegations`, params)
                    .then(data => [
                    data.unbonding_responses.map(core_1.UnbondingDelegation.fromData),
                    data.pagination,
                ]);
            }
            else if (validator !== undefined) {
                return this.c
                    .get(`/cosmos/staking/v1beta1/validators/${validator}/unbonding_delegations`, params)
                    .then(data => [
                    data.unbonding_responses.map(core_1.UnbondingDelegation.fromData),
                    data.pagination,
                ]);
            }
            else {
                throw new TypeError('arguments delegator and validator cannot both be empty');
            }
        });
    }
    /**
     * Gets the unbonding delegation between a delegator and validator, if it exists.
     * @param delegator delegator's account address
     * @param validator validator's operator address
     */
    unbondingDelegation(delegator, validator) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.unbondingDelegations(delegator, validator).then(udelgs => udelgs[0][0]);
        });
    }
    /**
     * Queries all redelegations, filterable by delegator, source validator, and target validator.
     * @param delegator delegator's account address
     * @param validatorSrc source validator's operator address (from).
     * @param validatorDst destination validator's operator address (to).
     */
    redelegations(delegator, validatorSrc, validatorDst, _params = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const params = Object.assign(Object.assign({}, _params), { src_validator_addr: validatorSrc, dst_validator_addr: validatorDst });
            return this.c
                .get(`/cosmos/staking/v1beta1/delegators/${delegator}/redelegations`, params)
                .then(d => [
                d.redelegation_responses.map(Redelegation_1.Redelegation.fromData),
                d.pagination,
            ]);
        });
    }
    /**
     * Gets all bonded validators for a delegator given its address.
     * @param delegator delegator's account address
     */
    bondedValidators(delegator, params = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.c
                .get(`/cosmos/staking/v1beta1/delegators/${delegator}/validators`, params)
                .then(d => [d.validators.map(Validator_1.Validator.fromData), d.pagination]);
        });
    }
    /**
     * Get all current registered validators, including validators that are not currently in the validating set.
     */
    validators(params = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.c
                .get(`/cosmos/staking/v1beta1/validators`, params)
                .then(d => [d.validators.map(Validator_1.Validator.fromData), d.pagination]);
        });
    }
    /**
     * Gets the validator information for a specific validator.
     * @param validator validator's operator address
     */
    validator(validator, params = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.c
                .get(`/cosmos/staking/v1beta1/validators/${validator}`, params)
                .then(d => Validator_1.Validator.fromData(d.validator));
        });
    }
    /**
     * Gets the current staking pool.
     */
    pool(params = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.c
                .get(`/cosmos/staking/v1beta1/pool`, params)
                .then(({ pool: d }) => ({
                bonded_tokens: new core_1.Coin('ujmes', d.bonded_tokens),
                not_bonded_tokens: new core_1.Coin('ujmes', d.not_bonded_tokens),
            }));
        });
    }
    /**
     * Gets the current Staking module's parameters.
     */
    parameters(params = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.c
                .get(`/cosmos/staking/v1beta1/params`, params)
                .then(({ params: d }) => ({
                unbonding_time: Number.parseInt(d.unbonding_time),
                max_validators: d.max_validators,
                max_entries: d.max_entries,
                historical_entries: d.historical_entries,
                bond_denom: d.bond_denom,
            }));
        });
    }
}
exports.StakingAPI = StakingAPI;
//# sourceMappingURL=StakingAPI.js.map