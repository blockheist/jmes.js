"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MsgDelegateFeedConsent = void 0;
const json_1 = require("../../../util/json");
const any_1 = require("@terra-money/terra.proto/google/protobuf/any");
const tx_1 = require("@terra-money/legacy.proto/terra/oracle/v1beta1/tx");
/**
 * A **feeeder** is an account which is responsible for signing transactions with Oracle vote
 * and prevote messages on behalf of the validator. The blockchain will reject
 * [[MsgExchangeRateVote]] and [[MsgExchangeRatePrevote]] messages in transactions
 * signed by an
 * account different than the registered feeder.
 *
 * The following message registers a validator's feeder address.
 */
class MsgDelegateFeedConsent extends json_1.JSONSerializable {
    /**
     * @param operator validator's operator address
     * @param delegate account address to set to feeder
     */
    constructor(operator, delegate) {
        super();
        this.operator = operator;
        this.delegate = delegate;
    }
    static fromAmino(data, isClassic) {
        if (!isClassic) {
            throw new Error('Not supported for the network');
        }
        const { value: { operator, delegate }, } = data;
        return new MsgDelegateFeedConsent(operator, delegate);
    }
    toAmino(isClassic) {
        if (!isClassic) {
            throw new Error('Not supported for the network');
        }
        const { operator, delegate } = this;
        return {
            type: 'oracle/MsgDelegateFeedConsent',
            value: {
                operator,
                delegate,
            },
        };
    }
    static fromData(data, isClassic) {
        if (!isClassic) {
            throw new Error('Not supported for the network');
        }
        const { operator, delegate } = data;
        return new MsgDelegateFeedConsent(operator, delegate);
    }
    toData(isClassic) {
        if (!isClassic) {
            throw new Error('Not supported for the network');
        }
        const { operator, delegate } = this;
        return {
            '@type': '/terra.oracle.v1beta1.MsgDelegateFeedConsent',
            operator,
            delegate,
        };
    }
    static fromProto(proto, isClassic) {
        if (!isClassic) {
            throw new Error('Not supported for the network');
        }
        return new MsgDelegateFeedConsent(proto.operator, proto.delegate);
    }
    toProto(isClassic) {
        if (!isClassic) {
            throw new Error('Not supported for the network');
        }
        const { operator, delegate } = this;
        return tx_1.MsgDelegateFeedConsent.fromPartial({
            delegate,
            operator,
        });
    }
    packAny(isClassic) {
        if (!isClassic) {
            throw new Error('Not supported for the network');
        }
        return any_1.Any.fromPartial({
            typeUrl: '/terra.oracle.v1beta1.MsgDelegateFeedConsent',
            value: tx_1.MsgDelegateFeedConsent.encode(this.toProto(isClassic)).finish(),
        });
    }
    static unpackAny(msgAny, isClassic) {
        if (!isClassic) {
            throw new Error('Not supported for the network');
        }
        return MsgDelegateFeedConsent.fromProto(tx_1.MsgDelegateFeedConsent.decode(msgAny.value), isClassic);
    }
}
exports.MsgDelegateFeedConsent = MsgDelegateFeedConsent;
//# sourceMappingURL=MsgDelegateFeedConsent.js.map