"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PolicyConstraints = void 0;
const json_1 = require("../../util/json");
const Coin_1 = require("../Coin");
const numeric_1 = require("../numeric");
const treasury_1 = require("@terra-money/legacy.proto/terra/treasury/v1beta1/treasury");
/**
 * This captures the Treasury module's `tax_policy` and `reward_policy` parameters, which
 * determine how the Tax Rate and Reward Weight values are allowed to change.
 */
class PolicyConstraints extends json_1.JSONSerializable {
    /**
     *
     * @param rate_min minimum value
     * @param rate_max maximum value
     * @param cap Tax Cap (only applicable for Tax Rate)
     * @param change_rate_max max change %
     */
    constructor(rate_min, rate_max, cap, change_rate_max) {
        super();
        this.cap = cap;
        this.rate_min = new numeric_1.Dec(rate_min);
        this.rate_max = new numeric_1.Dec(rate_max);
        this.change_rate_max = new numeric_1.Dec(change_rate_max);
    }
    static fromAmino(data) {
        const { rate_min, rate_max, cap, change_rate_max } = data;
        return new PolicyConstraints(rate_min, rate_max, Coin_1.Coin.fromAmino(cap), change_rate_max);
    }
    toAmino() {
        const { rate_min, rate_max, cap, change_rate_max } = this;
        return {
            rate_min: rate_min.toString(),
            rate_max: rate_max.toString(),
            cap: cap.toAmino(),
            change_rate_max: change_rate_max.toString(),
        };
    }
    static fromData(data) {
        const { rate_min, rate_max, cap, change_rate_max } = data;
        return new PolicyConstraints(rate_min, rate_max, Coin_1.Coin.fromData(cap), change_rate_max);
    }
    toData() {
        const { rate_min, rate_max, cap, change_rate_max } = this;
        return {
            rate_min: rate_min.toString(),
            rate_max: rate_max.toString(),
            cap: cap.toData(),
            change_rate_max: change_rate_max.toString(),
        };
    }
    static fromProto(proto) {
        return new PolicyConstraints(proto.rateMax, proto.rateMin, Coin_1.Coin.fromProto(proto.cap), proto.changeRateMax);
    }
    toProto() {
        const { rate_min, rate_max, cap, change_rate_max } = this;
        return treasury_1.PolicyConstraints.fromPartial({
            cap: cap.toProto(),
            changeRateMax: change_rate_max.toString(),
            rateMax: rate_max.toString(),
            rateMin: rate_min.toString(),
        });
    }
    /**
     * You can simulate the result of the clamping algorithm, which subjects updates in
     * rate to the rules defined by the `PolicyConstraints`.
     *
     * @param prevRate previous rate
     * @param newRate next rate
     * @returns New rate, after clamping constraints have been applied
     */
    clamp(prevRate, newRate) {
        const p = new numeric_1.Dec(prevRate); // prev
        let n = new numeric_1.Dec(newRate); // new
        if (n.lt(this.rate_min)) {
            n = this.rate_min;
        }
        else if (n.gt(this.rate_max)) {
            n = this.rate_max;
        }
        const delta = n.sub(p);
        if (n.gt(p)) {
            if (delta.gt(this.change_rate_max)) {
                n = p.add(this.change_rate_max);
            }
        }
        else {
            if (delta.abs().gt(this.change_rate_max)) {
                n = p.sub(this.change_rate_max);
            }
        }
        return n;
    }
}
exports.PolicyConstraints = PolicyConstraints;
//# sourceMappingURL=PolicyConstraints.js.map