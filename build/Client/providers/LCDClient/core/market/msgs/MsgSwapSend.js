"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MsgSwapSend = void 0;
const json_1 = require("../../../util/json");
const Coin_1 = require("../../Coin");
const any_1 = require("@terra-money/legacy.proto/google/protobuf/any");
const tx_1 = require("@terra-money/legacy.proto/terra/market/v1beta1/tx");
/**
 * Executes a market swap send between 2 denominations at the exchange rate registered by the
 * Oracle module. The sender account will lose the amount of coins offered, and receiver will receive funds
 * in the requested denomination after a swap and send fee has been applied.
 */
class MsgSwapSend extends json_1.JSONSerializable {
    /**
     * @param from_address sender's account address
     * @param to_address receiver's account address
     * @param offer_coin coin to be swapped (from)
     * @param ask_denom desired denomination (to)
     */
    constructor(from_address, to_address, offer_coin, ask_denom) {
        super();
        this.from_address = from_address;
        this.to_address = to_address;
        this.offer_coin = offer_coin;
        this.ask_denom = ask_denom;
    }
    static fromAmino(data, isClassic) {
        if (!isClassic) {
            throw new Error('Not supported for the network');
        }
        const { value: { from_address, to_address, offer_coin, ask_denom }, } = data;
        return new MsgSwapSend(from_address, to_address, Coin_1.Coin.fromAmino(offer_coin), ask_denom);
    }
    toAmino(isClassic) {
        if (!isClassic) {
            throw new Error('Not supported for the network');
        }
        const { from_address, to_address, offer_coin, ask_denom } = this;
        return {
            type: 'market/MsgSwapSend',
            value: {
                from_address,
                to_address,
                offer_coin: offer_coin.toAmino(),
                ask_denom,
            },
        };
    }
    static fromProto(proto, isClassic) {
        if (!isClassic) {
            throw new Error('Not supported for the network');
        }
        return new MsgSwapSend(proto.fromAddress, proto.toAddress, Coin_1.Coin.fromProto(proto.offerCoin), proto.askDenom);
    }
    toProto(isClassic) {
        if (!isClassic) {
            throw new Error('Not supported for the network');
        }
        const { from_address, to_address, offer_coin, ask_denom } = this;
        return tx_1.MsgSwapSend.fromPartial({
            askDenom: ask_denom,
            fromAddress: from_address,
            offerCoin: offer_coin.toProto(),
            toAddress: to_address,
        });
    }
    packAny(isClassic) {
        if (!isClassic) {
            throw new Error('Not supported for the network');
        }
        return any_1.Any.fromPartial({
            typeUrl: '/terra.market.v1beta1.MsgSwapSend',
            value: tx_1.MsgSwapSend.encode(this.toProto(isClassic)).finish(),
        });
    }
    static unpackAny(msgAny, isClassic) {
        if (!isClassic) {
            throw new Error('Not supported for the network');
        }
        return MsgSwapSend.fromProto(tx_1.MsgSwapSend.decode(msgAny.value), isClassic);
    }
    static fromData(data, isClassic) {
        if (!isClassic) {
            throw new Error('Not supported for the network');
        }
        const { from_address, to_address, offer_coin, ask_denom } = data;
        return new MsgSwapSend(from_address, to_address, Coin_1.Coin.fromData(offer_coin), ask_denom);
    }
    toData(isClassic) {
        if (!isClassic) {
            throw new Error('Not supported for the network');
        }
        const { from_address, to_address, offer_coin, ask_denom } = this;
        return {
            '@type': '/terra.market.v1beta1.MsgSwapSend',
            from_address,
            to_address,
            offer_coin: offer_coin.toData(),
            ask_denom,
        };
    }
}
exports.MsgSwapSend = MsgSwapSend;
//# sourceMappingURL=MsgSwapSend.js.map