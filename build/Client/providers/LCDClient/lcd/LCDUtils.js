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
exports.LCDUtils = void 0;
const Coin_1 = require("../core/Coin");
const numeric_1 = require("../core/numeric");
class LCDUtils {
    constructor(lcd) {
        this.lcd = lcd;
    }
    /**
     * Calculates the tax that would be applied for the Coin if sent.
     * Tax = min(taxCap, taxRate * amount)
     * @param coin
     */
    calculateTax(coin) {
        return __awaiter(this, void 0, void 0, function* () {
            const rate = yield this.lcd.treasury.taxRate();
            const cap = yield this.lcd.treasury.taxCap(coin.denom);
            return new Coin_1.Coin(coin.denom, numeric_1.Int.ceil(numeric_1.Dec.min(coin.amount.mul(rate), cap.amount)));
        });
    }
    /**
     * Gets current validators and merges their voting power from the validator set query.
     */
    validatorsWithVotingPower() {
        return __awaiter(this, void 0, void 0, function* () {
            const [validatorSet] = yield this.lcd.tendermint.validatorSet();
            const validatorSetByPubKey = validatorSet.reduce((m, o) => {
                m[o.pub_key.key] = o;
                return m;
            }, {});
            const validators = [];
            let next_key;
            for (;;) {
                const validatorsRes = yield this.lcd.staking.validators({
                    'pagination.key': next_key,
                });
                validators.push(...validatorsRes[0]);
                if (!validatorsRes[1].next_key)
                    break;
                next_key = validatorsRes[1].next_key;
            }
            const res = {};
            for (const v of validators) {
                const delegateInfo = validatorSetByPubKey[v.consensus_pubkey.toData().key];
                if (delegateInfo === undefined)
                    continue;
                res[v.operator_address] = {
                    validatorInfo: v,
                    votingPower: Number.parseInt(delegateInfo.voting_power),
                    proposerPriority: Number.parseInt(delegateInfo.proposer_priority),
                };
            }
            return res;
        });
    }
}
exports.LCDUtils = LCDUtils;
//# sourceMappingURL=LCDUtils.js.map