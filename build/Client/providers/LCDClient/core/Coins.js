"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Coins = void 0;
const Coin_1 = require("./Coin");
const json_1 = require("../util/json");
/**
 * Analagous to `sdk.Coins` and `sdk.DecCoins` from Cosmos-SDK, and represents a collection
 * of [[Coin]] objects.
 *
 */
class Coins extends json_1.JSONSerializable {
    /**
     * @param arg coins to input
     */
    constructor(arg = {}) {
        super();
        if (arg instanceof Coins) {
            this._coins = Object.assign({}, arg._coins);
        }
        else if (typeof arg === 'string') {
            this._coins = Coins.fromString(arg)._coins;
        }
        else {
            this._coins = {};
            let coins;
            if (!Array.isArray(arg)) {
                coins = [];
                Object.keys(arg).forEach(denom => coins.push(new Coin_1.Coin(denom, arg[denom])));
            }
            else {
                coins = arg;
            }
            for (const coin of coins) {
                const { denom } = coin;
                const x = this._coins[denom];
                if (x !== undefined) {
                    this._coins[denom] = x.add(coin);
                }
                else {
                    this._coins[denom] = coin;
                }
            }
            // convert all coins to Dec if one is Dec
            if (!this.toArray().every(c => c.isIntCoin())) {
                for (const denom of Object.keys(this._coins)) {
                    this._coins[denom] = this._coins[denom].toDecCoin();
                }
            }
        }
    }
    // implement iterator interface for interop
    [Symbol.iterator]() {
        let index = -1;
        const data = this.toArray();
        return {
            next: () => ({
                value: data[++index],
                done: (index === data.length),
            }),
        };
    }
    /**
     * Converts the Coins information to a comma-separated list.
     *
     * Eg: `15000ukrw,12000ujmes`
     */
    toString() {
        return this.toArray()
            .map(c => c.toString())
            .join(',');
    }
    /**
     * Converts a comma-separated list of coins to a Coins object
     *
     * Eg. `1500ukrw,12302ujmes`
     *
     * @param str comma-separated list of coins
     */
    static fromString(str) {
        const coin_strings = str.split(/,\s*/);
        const coins = coin_strings.map(s => Coin_1.Coin.fromString(s));
        return new Coins(coins);
    }
    /**
     * Gets the list of denominations
     */
    denoms() {
        return this.map(c => c.denom);
    }
    /**
     * Creates a new Coins object with all Decimal coins
     */
    toDecCoins() {
        return new Coins(this.map(c => c.toDecCoin()));
    }
    /**
     * Creates a new Coins object with all Integer coins
     */
    toIntCoins() {
        return new Coins(this.map(c => c.toIntCoin()));
    }
    /**
     * Creates a new Coins object with all Integer coins with ceiling the amount
     */
    toIntCeilCoins() {
        return new Coins(this.map(c => c.toIntCeilCoin()));
    }
    /**
     * Gets the Coin for denomination if it exists in the collection.
     * @param denom denomination to lookup
     */
    get(denom) {
        return this._coins[denom];
    }
    /**
     * Sets the Coin value for a denomination.
     * @param denom denomination to set
     * @param value value to set
     */
    set(denom, value) {
        let val;
        if (value instanceof Coin_1.Coin) {
            if (value.denom != denom) {
                throw new Error(`Denoms must match when setting: ${denom}, ${value.denom}`);
            }
            val = value;
        }
        else {
            val = new Coin_1.Coin(denom, value);
        }
        this._coins[denom] = val;
    }
    /**
     * Gets the individual elements of the collection.
     */
    toArray() {
        return Object.values(this._coins).sort((a, b) => a.denom.localeCompare(b.denom));
    }
    /**
     * Adds a value from the elements of the collection. Coins of a similar denomination
     * will be clobbered into one value containing their sum.
     * @param other
     */
    add(other) {
        if (other instanceof Coin_1.Coin) {
            return new Coins([other, ...Object.values(this._coins)]);
        }
        else {
            return new Coins([
                ...Object.values(other._coins),
                ...Object.values(this._coins),
            ]);
        }
    }
    /**
     * Subtracts a value from the elements of the collection.
     * @param other
     */
    sub(other) {
        return this.add(other.mul(-1));
    }
    /**
     * Multiplies the elements of the collection by a value.
     * @param other
     */
    mul(other) {
        return new Coins(this.map(c => c.mul(other)));
    }
    /**
     * Divides the elements of the collection by a value.
     * @param other
     */
    div(other) {
        return new Coins(this.map(c => c.div(other)));
    }
    /**
     * Modulos the elements of the collection with a value.
     * @param other
     */
    mod(other) {
        return new Coins(this.map(c => c.mod(other)));
    }
    /**
     * Map a value onto the elements of the Coin collection.
     * @param fn
     */
    map(fn) {
        return this.toArray().map(fn);
    }
    /**
     * Filters out the Coin objects that don't match the predicate
     * @param fn predicate
     */
    filter(fn) {
        return new Coins(this.toArray().filter(fn));
    }
    static fromAmino(data) {
        return new Coins((data !== null && data !== void 0 ? data : []).map(Coin_1.Coin.fromAmino));
    }
    toAmino() {
        return this.toArray().map(c => c.toAmino());
    }
    static fromData(data) {
        return new Coins((data !== null && data !== void 0 ? data : []).map(Coin_1.Coin.fromData));
    }
    toData() {
        return this.toArray().map(c => c.toData());
    }
    static fromProto(data) {
        return new Coins((data !== null && data !== void 0 ? data : []).map(Coin_1.Coin.fromProto));
    }
    toProto() {
        return this.toArray().map(c => c.toProto());
    }
}
exports.Coins = Coins;
//# sourceMappingURL=Coins.js.map