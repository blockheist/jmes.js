"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MsgSwap = void 0;
const json_1 = require("../../../util/json");
const Coin_1 = require("../../Coin");
const tx_1 = require("@terra-money/legacy.proto/terra/market/v1beta1/tx");
const any_1 = require("@terra-money/legacy.proto/google/protobuf/any");
/**
 * Executes a market swap between 2 denominations at the exchange rate registered by the
 * Oracle module. The account will lose the amount of coins offered, and receive funds
 * in the requested denomination after a swap fee has been applied.
 */
class MsgSwap extends json_1.JSONSerializable {
    /**
     * @param trader trader's account address
     * @param offer_coin coin to be swapped (from)
     * @param ask_denom desired denomination (to)
     */
    constructor(trader, offer_coin, ask_denom) {
        super();
        this.trader = trader;
        this.offer_coin = offer_coin;
        this.ask_denom = ask_denom;
    }
    static fromAmino(data, isClassic) {
        if (!isClassic) {
            throw new Error('Not supported for the network');
        }
        const { value: { trader, offer_coin, ask_denom }, } = data;
        return new MsgSwap(trader, Coin_1.Coin.fromAmino(offer_coin), ask_denom);
    }
    toAmino(isClassic) {
        if (!isClassic) {
            throw new Error('Not supported for the network');
        }
        const { trader, offer_coin, ask_denom } = this;
        return {
            type: 'market/MsgSwap',
            value: {
                trader,
                offer_coin: offer_coin.toAmino(),
                ask_denom,
            },
        };
    }
    static fromProto(proto, isClassic) {
        if (!isClassic) {
            throw new Error('Not supported for the network');
        }
        return new MsgSwap(proto.trader, Coin_1.Coin.fromProto(proto.offerCoin), proto.askDenom);
    }
    toProto(isClassic) {
        if (!isClassic) {
            throw new Error('Not supported for the network');
        }
        const { trader, offer_coin, ask_denom } = this;
        return tx_1.MsgSwap.fromPartial({
            askDenom: ask_denom,
            offerCoin: offer_coin.toProto(),
            trader,
        });
    }
    packAny(isClassic) {
        if (!isClassic) {
            throw new Error('Not supported for the network');
        }
        return any_1.Any.fromPartial({
            typeUrl: '/terra.market.v1beta1.MsgSwap',
            value: tx_1.MsgSwap.encode(this.toProto(isClassic)).finish(),
        });
    }
    static unpackAny(msgAny, isClassic) {
        if (!isClassic) {
            throw new Error('Not supported for the network');
        }
        return MsgSwap.fromProto(tx_1.MsgSwap.decode(msgAny.value), isClassic);
    }
    static fromData(data, isClassic) {
        if (!isClassic) {
            throw new Error('Not supported for the network');
        }
        const { trader, offer_coin, ask_denom } = data;
        return new MsgSwap(trader, Coin_1.Coin.fromData(offer_coin), ask_denom);
    }
    toData(isClassic) {
        if (!isClassic) {
            throw new Error('Not supported for the network');
        }
        const { trader, offer_coin, ask_denom } = this;
        return {
            '@type': '/terra.market.v1beta1.MsgSwap',
            trader,
            offer_coin: offer_coin.toData(),
            ask_denom,
        };
    }
}
exports.MsgSwap = MsgSwap;
//# sourceMappingURL=MsgSwap.js.map