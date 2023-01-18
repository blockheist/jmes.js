"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PeriodicAllowance = void 0;
const json_1 = require("../../../util/json");
const Coins_1 = require("../../Coins");
const BasicAllowance_1 = require("./BasicAllowance");
const any_1 = require("@terra-money/terra.proto/google/protobuf/any");
const feegrant_1 = require("@terra-money/terra.proto/cosmos/feegrant/v1beta1/feegrant");
const Long = __importStar(require("long"));
/**
 * PeriodicAllowance extends Allowance to allow for both a maximum cap,
 * as well as a limit per time period.
 */
class PeriodicAllowance extends json_1.JSONSerializable {
    /**
     * @param basic basic allowance given per period
     * @param period the time duration in which period_spend_limit coins can be spent before that allowance is reset
     * @param period_spend_limit the maximum number of coins that can be spent in the period
     * @param period_can_spend the number of coins left to be spent before the period_reset time
     * @param period_reset the time at which this period resets and a new one begins
     */
    constructor(basic, period, period_spend_limit, period_can_spend, period_reset) {
        super();
        this.basic = basic;
        this.period = period;
        this.period_reset = period_reset;
        this.period_spend_limit = new Coins_1.Coins(period_spend_limit);
        this.period_can_spend = new Coins_1.Coins(period_can_spend);
    }
    static fromAmino(data, isClassic) {
        const { value: { basic, period, period_spend_limit, period_can_spend, period_reset, }, } = data;
        return new PeriodicAllowance(BasicAllowance_1.BasicAllowance.fromAmino(basic, isClassic), Number.parseInt(period), Coins_1.Coins.fromAmino(period_spend_limit), Coins_1.Coins.fromAmino(period_can_spend), new Date(period_reset));
    }
    toAmino(isClassic) {
        const { basic, period, period_spend_limit, period_can_spend, period_reset, } = this;
        return {
            type: isClassic
                ? 'feegrant/PeriodicAllowance'
                : 'cosmos-sdk/PeriodicAllowance',
            value: {
                basic: basic.toAmino(isClassic),
                period: period.toString(),
                period_spend_limit: period_spend_limit.toAmino(),
                period_can_spend: period_can_spend.toAmino(),
                period_reset: period_reset.toISOString().replace(/\.000Z$/, 'Z'),
            },
        };
    }
    static fromData(proto, _) {
        _;
        const { basic, period, period_spend_limit, period_can_spend, period_reset, } = proto;
        return new PeriodicAllowance(BasicAllowance_1.BasicAllowance.fromData(basic), Number.parseInt(period), Coins_1.Coins.fromData(period_spend_limit), Coins_1.Coins.fromData(period_can_spend), new Date(period_reset));
    }
    toData(_) {
        _;
        const { basic, period, period_spend_limit, period_can_spend, period_reset, } = this;
        return {
            '@type': '/cosmos.feegrant.v1beta1.PeriodicAllowance',
            basic: basic.toData(),
            period: period.toString(),
            period_spend_limit: period_spend_limit.toData(),
            period_can_spend: period_can_spend.toData(),
            period_reset: period_reset.toISOString().replace(/\.000Z$/, 'Z'),
        };
    }
    static fromProto(proto, _) {
        var _a;
        _;
        return new PeriodicAllowance(BasicAllowance_1.BasicAllowance.fromProto(proto.basic), (_a = proto.period) === null || _a === void 0 ? void 0 : _a.seconds.toNumber(), Coins_1.Coins.fromProto(proto.periodSpendLimit), Coins_1.Coins.fromProto(proto.periodCanSpend), proto.periodReset);
    }
    toProto(_) {
        _;
        const { basic, period, period_spend_limit, period_can_spend, period_reset, } = this;
        return feegrant_1.PeriodicAllowance.fromPartial({
            basic,
            period: { seconds: Long.fromNumber(period) },
            periodCanSpend: period_can_spend.toProto(),
            periodReset: period_reset,
            periodSpendLimit: period_spend_limit.toProto(),
        });
    }
    packAny(isClassic) {
        return any_1.Any.fromPartial({
            typeUrl: '/cosmos.feegrant.v1beta1.PeriodicAllowance',
            value: feegrant_1.PeriodicAllowance.encode(this.toProto(isClassic)).finish(),
        });
    }
    static unpackAny(msgAny, isClassic) {
        return PeriodicAllowance.fromProto(feegrant_1.PeriodicAllowance.decode(msgAny.value), isClassic);
    }
}
exports.PeriodicAllowance = PeriodicAllowance;
//# sourceMappingURL=PeriodicAllowance.js.map