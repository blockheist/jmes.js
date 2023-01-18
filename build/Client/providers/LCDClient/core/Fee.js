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
exports.Fee = void 0;
const json_1 = require("../util/json");
const Coins_1 = require("./Coins");
const numeric_1 = require("./numeric");
const tx_1 = require("@jmesworld/jmes.proto/src/cosmos/tx/v1beta1/tx");
const Long = __importStar(require("long"));
/**
 * A transaction must include a fee, otherwise it will be rejected.
 */
class Fee extends json_1.JSONSerializable {
    /**
     * Creates a new Fee object.
     * @param gas gas limit
     * @param amount amount to be paid to validator
     */
    constructor(gas_limit, amount, payer, granter) {
        super();
        this.gas_limit = gas_limit;
        this.payer = payer;
        this.granter = granter;
        this.amount = new Coins_1.Coins(amount);
    }
    static fromAmino(data) {
        const { gas, amount } = data;
        return new Fee(Number.parseInt(gas), Coins_1.Coins.fromAmino(amount), '', '');
    }
    toAmino() {
        return {
            gas: new numeric_1.Int(this.gas_limit).toString(),
            amount: this.amount.toAmino(),
        };
    }
    static fromData(data) {
        return new Fee(Number.parseInt(data.gas_limit), Coins_1.Coins.fromData(data.amount), data.payer, data.granter);
    }
    toData() {
        const { amount, gas_limit, payer, granter } = this;
        return {
            amount: amount.toData(),
            gas_limit: gas_limit.toFixed(),
            granter: granter !== null && granter !== void 0 ? granter : '',
            payer: payer !== null && payer !== void 0 ? payer : '',
        };
    }
    static fromProto(proto) {
        return new Fee(proto.gasLimit.toNumber(), Coins_1.Coins.fromProto(proto.amount), proto.payer, proto.granter);
    }
    toProto() {
        const { amount, gas_limit, payer, granter } = this;
        return tx_1.Fee.fromPartial({
            amount: amount.toProto(),
            gasLimit: Long.fromNumber(gas_limit),
            granter,
            payer,
        });
    }
    /**
     * Gets the minimum gas prices implied by the fee. Minimum gas prices are `fee amount / gas`.
     */
    gasPrices() {
        return this.amount.toDecCoins().div(this.gas_limit);
    }
}
exports.Fee = Fee;
//# sourceMappingURL=Fee.js.map