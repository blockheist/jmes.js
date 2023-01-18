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
exports.Period = void 0;
const Coins_1 = require("../Coins");
const vesting_1 = require("@terra-money/terra.proto/cosmos/vesting/v1beta1/vesting");
const json_1 = require("../../util/json");
const Long = __importStar(require("long"));
/**
 * Period defines a length of time and amount of coins that will vest.
 */
class Period extends json_1.JSONSerializable {
    /**
     * @param length
     * @param amount
     */
    constructor(length, amount) {
        super();
        this.length = length;
        this.amount = new Coins_1.Coins(amount);
    }
    static fromAmino(data, _) {
        _;
        const { length, amount } = data;
        return new Period(Number.parseInt(length), Coins_1.Coins.fromAmino(amount));
    }
    toAmino(_) {
        _;
        const { length, amount } = this;
        const res = {
            length: length.toFixed(),
            amount: amount.toAmino(),
        };
        return res;
    }
    static fromData(data, _) {
        _;
        const { length, amount } = data;
        return new Period(Number.parseInt(length), Coins_1.Coins.fromData(amount));
    }
    toData(_) {
        _;
        const { length, amount } = this;
        const res = {
            length: length.toFixed(),
            amount: amount.toData(),
        };
        return res;
    }
    static fromProto(proto, _) {
        _;
        return new Period(proto.length.toNumber(), Coins_1.Coins.fromProto(proto.amount));
    }
    toProto(_) {
        _;
        const { length, amount } = this;
        return vesting_1.Period.fromPartial({
            length: Long.fromNumber(length),
            amount: amount.toProto(),
        });
    }
}
exports.Period = Period;
//# sourceMappingURL=Period.js.map