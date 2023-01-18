"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MsgAggregateExchangeRateVote = exports.aggregateVoteHash = void 0;
const SHA256_1 = require("jscrypto/SHA256");
const json_1 = require("../../../util/json");
const MsgAggregateExchangeRatePrevote_1 = require("./MsgAggregateExchangeRatePrevote");
const Coins_1 = require("../../Coins");
const any_1 = require("@terra-money/legacy.proto/google/protobuf/any");
const tx_1 = require("@terra-money/legacy.proto/terra/oracle/v1beta1/tx");
/**
 * Calculates the aggregate vote hash
 * @param exchangeRates exchange rates
 * @param salt salt
 * @param validator validator operator address
 */
function aggregateVoteHash(exchangeRates, salt, validator) {
    const payload = `${salt}:${exchangeRates
        .toDecCoins()
        .toString()}:${validator}`;
    return SHA256_1.SHA256.hash(payload).toString().substring(0, 40);
}
exports.aggregateVoteHash = aggregateVoteHash;
/**
 * Aggregate analog of MsgExchangeRateVote: submits an oracle vote for multiple denominations
 * through a single message rather than multiple messages.
 */
class MsgAggregateExchangeRateVote extends json_1.JSONSerializable {
    /**
     * @param exchange_rate exchange rates
     * @param salt salt
     * @param feeder feeder address
     * @param validator validator operator address
     */
    constructor(exchange_rates, salt, feeder, validator) {
        super();
        this.salt = salt;
        this.feeder = feeder;
        this.validator = validator;
        this.exchange_rates = new Coins_1.Coins(exchange_rates).toDecCoins();
    }
    static fromAmino(data, isClassic) {
        if (!isClassic) {
            throw new Error('Not supported for the network');
        }
        const { value: { exchange_rates, salt, feeder, validator }, } = data;
        const xrs = Coins_1.Coins.fromString(exchange_rates);
        return new MsgAggregateExchangeRateVote(xrs, salt, feeder, validator);
    }
    toAmino(isClassic) {
        if (!isClassic) {
            throw new Error('Not supported for the network');
        }
        const { exchange_rates, salt, feeder, validator } = this;
        return {
            type: 'oracle/MsgAggregateExchangeRateVote',
            value: {
                exchange_rates: exchange_rates.toDecCoins().toString(),
                salt,
                feeder,
                validator,
            },
        };
    }
    static fromData(proto, isClassic) {
        if (!isClassic) {
            throw new Error('Not supported for the network');
        }
        const { exchange_rates, salt, feeder, validator } = proto;
        const xrs = Coins_1.Coins.fromString(exchange_rates);
        return new MsgAggregateExchangeRateVote(xrs, salt, feeder, validator);
    }
    toData(isClassic) {
        if (!isClassic) {
            throw new Error('Not supported for the network');
        }
        const { exchange_rates, salt, feeder, validator } = this;
        return {
            '@type': '/terra.oracle.v1beta1.MsgAggregateExchangeRateVote',
            exchange_rates: exchange_rates.toDecCoins().toString(),
            salt,
            feeder,
            validator,
        };
    }
    static fromProto(proto, isClassic) {
        if (!isClassic) {
            throw new Error('Not supported for the network');
        }
        const xrs = Coins_1.Coins.fromString(proto.exchangeRates);
        return new MsgAggregateExchangeRateVote(xrs, proto.salt, proto.feeder, proto.validator);
    }
    toProto(isClassic) {
        if (!isClassic) {
            throw new Error('Not supported for the network');
        }
        const { exchange_rates, salt, feeder, validator } = this;
        return tx_1.MsgAggregateExchangeRateVote.fromPartial({
            exchangeRates: exchange_rates.toString(),
            feeder,
            salt,
            validator,
        });
    }
    /**
     * Gets the aggregate vote hash for the MsgAggregateExchangeRateVote, for the creation of
     *  the corresponding prevote message.
     */
    getAggregateVoteHash() {
        return aggregateVoteHash(this.exchange_rates, this.salt, this.validator);
    }
    /**
     * You can generate the corresponding aggregate prevote message.
     * This will return a [[MsgAggregateExchangeRatePrevote]] with the proper vote hash and values,
     * determined by the current attributes of the object.
     *
     * @returns the corresponding prevote message to send
     */
    getPrevote() {
        return new MsgAggregateExchangeRatePrevote_1.MsgAggregateExchangeRatePrevote(this.getAggregateVoteHash(), this.feeder, this.validator);
    }
    packAny(isClassic) {
        if (!isClassic) {
            throw new Error('Not supported for the network');
        }
        return any_1.Any.fromPartial({
            typeUrl: '/terra.oracle.v1beta1.MsgAggregateExchangeRateVote',
            value: tx_1.MsgAggregateExchangeRateVote.encode(this.toProto(isClassic)).finish(),
        });
    }
    static unpackAny(msgAny, isClassic) {
        if (!isClassic) {
            throw new Error('Not supported for the network');
        }
        return MsgAggregateExchangeRateVote.fromProto(tx_1.MsgAggregateExchangeRateVote.decode(msgAny.value), isClassic);
    }
}
exports.MsgAggregateExchangeRateVote = MsgAggregateExchangeRateVote;
//# sourceMappingURL=MsgAggregateExchangeRateVote.js.map