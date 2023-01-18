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
exports.DistributionAPI = void 0;
const BaseAPI_1 = require("./BaseAPI");
const core_1 = require("../../core");
class DistributionAPI extends BaseAPI_1.BaseAPI {
    constructor(lcd) {
        super(lcd.apiRequester);
        this.lcd = lcd;
    }
    /**
     * Gets a delegator's rewards.
     * @param delegator delegator's account address
     */
    rewards(delegator, params = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const rewardsData = yield this.c
                .get(`/cosmos/distribution/v1beta1/delegators/${delegator}/rewards`, params)
                .then(d => d);
            const rewards = {};
            for (const reward of rewardsData.rewards) {
                rewards[reward.validator_address] = core_1.Coins.fromData(reward.reward);
            }
            return {
                rewards,
                total: core_1.Coins.fromData(rewardsData.total),
            };
        });
    }
    /**
     * Gets a validator's rewards.
     * @param validator validator's operator address
     */
    validatorCommission(validator, params = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.c
                .get(`/cosmos/distribution/v1beta1/validators/${validator}/commission`, params)
                .then(d => d.commission)
                .then(d => core_1.Coins.fromData(d.commission));
        });
    }
    /**
     * Gets the withdraw address of a delegator, the address to which rewards are withdrawn.
     * @param delegator
     */
    withdrawAddress(delegator, params = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.c
                .get(`/cosmos/distribution/v1beta1/delegators/${delegator}/withdraw_address`, params)
                .then(d => d.withdraw_address);
        });
    }
    /**
     * Gets the current value of the community pool.
     */
    communityPool(params = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.c
                .get(`/cosmos/distribution/v1beta1/community_pool`, params)
                .then(d => core_1.Coins.fromData(d.pool));
        });
    }
    /**
     * Gets the current distribution parameters.
     */
    parameters(params = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.c
                .get(`/cosmos/distribution/v1beta1/params`, params)
                .then(({ params: d }) => ({
                base_proposer_reward: new core_1.Dec(d.base_proposer_reward),
                community_tax: new core_1.Dec(d.community_tax),
                bonus_proposer_reward: new core_1.Dec(d.bonus_proposer_reward),
                withdraw_addr_enabled: d.withdraw_addr_enabled,
            }));
        });
    }
}
exports.DistributionAPI = DistributionAPI;
//# sourceMappingURL=DistributionAPI.js.map