"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Coin = void 0;
const json_1 = require("../util/json");
const numeric_1 = require("./numeric");
const coin_1 = require("@jmesworld/jmes.proto/src/cosmos/base/v1beta1/coin");
/**
 * Captures `sdk.Coin` and `sdk.DecCoin` from Cosmos SDK. A composite value that combines
 * a denomination with an amount value. Coins are immutable once created, and operations
 * that return Coin will return a new Coin. See [[Coins]] for a collection of Coin objects.
 */
class Coin extends json_1.JSONSerializable {
    /**
     * Creates a new coin. Depending on the type of amount, it will be converted to an
     * integer coin or decimal coin.
     *
     * @param denom denomination
     * @param amount coin's amount
     */
    constructor(denom, amount) {
        super();
        this.denom = denom;
        this.amount = numeric_1.Numeric.parse(amount);
    }
    /**
     * Checks whether the Coin is an Integer coin.
     */
    isIntCoin() {
        // TODO: convert into typeguard
        return this.amount instanceof numeric_1.Int;
    }
    /**
     * Checks whether the Coin is a Decimal coin.
     */
    isDecCoin() {
        return this.amount instanceof numeric_1.Dec;
    }
    /**
     * Turns the Coin into an Integer coin.
     */
    toIntCoin() {
        return new Coin(this.denom, new numeric_1.Int(this.amount));
    }
    /**
     * Turns the Coin into an Integer coin with ceiling the amount.
     */
    toIntCeilCoin() {
        return new Coin(this.denom, new numeric_1.Int(this.amount.ceil()));
    }
    /**
     * Turns the Coin into a Decimal coin.
     */
    toDecCoin() {
        return new Coin(this.denom, new numeric_1.Dec(this.amount));
    }
    /**
     * Outputs `<amount><denom>`.
     *
     * Eg: `Coin('ujmes', 1500) -> 1500ujmes`
     */
    toString() {
        const amount = this.amount.toFixed();
        if (this.isDecCoin() && amount.indexOf('.') === -1) {
            return `${amount}.0${this.denom}`;
        }
        return `${amount}${this.denom}`;
    }
    static fromString(str) {
        const m = str.match(/^(-?[0-9]+(\.[0-9]+)?)([0-9a-zA-Z/]+)$/);
        if (m === null) {
            throw new Error(`failed to parse to Coin: ${str}`);
        }
        const amount = m[1];
        const denom = m[3];
        return new Coin(denom, amount);
    }
    /**
     * Creates a new Coin adding to the current value.
     *
     * @param other
     */
    add(other) {
        let otherAmount;
        if (other instanceof Coin) {
            if (other.denom !== this.denom) {
                throw new Coin.ArithmeticError(`cannot add two Coins of different denoms: ${this.denom} and ${other.denom}`);
            }
            otherAmount = other.amount;
        }
        else {
            otherAmount = other;
        }
        otherAmount = numeric_1.Numeric.parse(otherAmount);
        return new Coin(this.denom, this.amount.add(otherAmount));
    }
    /**
     * Creates a new Coin subtracting from the current value.
     * @param other
     */
    sub(other) {
        let otherAmount;
        if (other instanceof Coin) {
            if (other.denom !== this.denom) {
                throw new Coin.ArithmeticError(`cannot subtract two Coins of different denoms: ${this.denom} and ${other.denom}`);
            }
            otherAmount = other.amount;
        }
        else {
            otherAmount = other;
        }
        otherAmount = numeric_1.Numeric.parse(otherAmount);
        return new Coin(this.denom, this.amount.sub(otherAmount));
    }
    /**
     * Multiplies the current value with an amount.
     * @param other
     */
    mul(other) {
        const otherAmount = numeric_1.Numeric.parse(other);
        return new Coin(this.denom, this.amount.mul(otherAmount));
    }
    /**
     * Divides the current value with an amount.
     * @param other
     */
    div(other) {
        const otherAmount = numeric_1.Numeric.parse(other);
        return new Coin(this.denom, this.amount.div(otherAmount));
    }
    /**
     * Modulo the current value with an amount.
     * @param other
     */
    mod(other) {
        const otherAmount = numeric_1.Numeric.parse(other);
        return new Coin(this.denom, this.amount.mod(otherAmount));
    }
    static fromAmino(data) {
        const { denom, amount } = data;
        return new Coin(denom, amount);
    }
    toAmino() {
        const { denom, amount } = this;
        return {
            denom,
            amount: amount.toString(),
        };
    }
    static fromData(data) {
        const { denom, amount } = data;
        return new Coin(denom, amount);
    }
    toData() {
        const { denom, amount } = this;
        return {
            denom,
            amount: amount.toString(),
        };
    }
    static fromProto(proto) {
        return new Coin(proto.denom, numeric_1.Numeric.parse(proto.amount));
    }
    toProto() {
        return coin_1.Coin.fromPartial({
            denom: this.denom,
            amount: this.amount.toString(),
        });
    }
}
exports.Coin = Coin;
(function (Coin) {
    class ArithmeticError {
        constructor(message) {
            this.message = message;
        }
    }
    Coin.ArithmeticError = ArithmeticError;
})(Coin = exports.Coin || (exports.Coin = {}));
//# sourceMappingURL=Coin.js.map