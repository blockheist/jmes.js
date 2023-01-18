"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExchangeRateTuple = exports.AggregateExchangeRateVote = void 0;
const json_1 = require("../../util/json");
const oracle_1 = require("@terra-money/legacy.proto/terra/oracle/v1beta1/oracle");
const numeric_1 = require("../numeric");
/**
 * Stores information about data about Oracle aggregate vote fetched from the blockchain.
 */
class AggregateExchangeRateVote extends json_1.JSONSerializable {
    /**
     * @param exchange_rate_tuples exchange rates for LUNA
     * @param voter validator
     */
    constructor(exchange_rate_tuples, voter) {
        super();
        this.exchange_rate_tuples = exchange_rate_tuples;
        this.voter = voter;
    }
    static fromAmino(data) {
        const { exchange_rate_tuples, voter } = data;
        return new AggregateExchangeRateVote(exchange_rate_tuples.map(t => ExchangeRateTuple.fromAmino(t)), voter);
    }
    toAmino() {
        const { exchange_rate_tuples, voter } = this;
        return {
            exchange_rate_tuples: exchange_rate_tuples.map(e => e.toAmino()),
            voter,
        };
    }
    static fromData(data) {
        const { exchange_rate_tuples, voter } = data;
        return new AggregateExchangeRateVote(exchange_rate_tuples.map(t => ExchangeRateTuple.fromData(t)), voter);
    }
    toData() {
        const { exchange_rate_tuples, voter } = this;
        return {
            exchange_rate_tuples: exchange_rate_tuples.map(e => e.toData()),
            voter,
        };
    }
    static fromProto(data) {
        return new AggregateExchangeRateVote(data.exchangeRateTuples.map(t => ExchangeRateTuple.fromProto(t)), data.voter);
    }
    toProto() {
        const { exchange_rate_tuples, voter } = this;
        return oracle_1.AggregateExchangeRateVote.fromPartial({
            exchangeRateTuples: exchange_rate_tuples.map(t => t.toProto()),
            voter,
        });
    }
}
exports.AggregateExchangeRateVote = AggregateExchangeRateVote;
class ExchangeRateTuple extends json_1.JSONSerializable {
    constructor(denom, exchange_rate) {
        super();
        this.denom = denom;
        this.exchange_rate = new numeric_1.Dec(exchange_rate);
    }
    static fromAmino(data) {
        const { denom, exchange_rate } = data;
        return new ExchangeRateTuple(denom, exchange_rate);
    }
    toAmino() {
        const { denom, exchange_rate } = this;
        return {
            denom,
            exchange_rate: exchange_rate.toString(),
        };
    }
    static fromData(data) {
        const { denom, exchange_rate } = data;
        return new ExchangeRateTuple(denom, exchange_rate);
    }
    toData() {
        const { denom, exchange_rate } = this;
        return {
            denom,
            exchange_rate: exchange_rate.toString(),
        };
    }
    static fromProto(proto) {
        return new ExchangeRateTuple(proto.denom, proto.exchangeRate);
    }
    toProto() {
        const { denom, exchange_rate } = this;
        return oracle_1.ExchangeRateTuple.fromPartial({
            denom,
            exchangeRate: exchange_rate.toString(),
        });
    }
}
exports.ExchangeRateTuple = ExchangeRateTuple;
//# sourceMappingURL=AggregateExchangeRateVote.js.map