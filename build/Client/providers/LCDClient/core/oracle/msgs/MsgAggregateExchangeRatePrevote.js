"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MsgAggregateExchangeRatePrevote = void 0;
const json_1 = require("../../../util/json");
const any_1 = require("@terra-money/legacy.proto/google/protobuf/any");
const tx_1 = require("@terra-money/legacy.proto/terra/oracle/v1beta1/tx");
/**
 * Aggregate analog of MsgExchangeRatePrevote
 */
class MsgAggregateExchangeRatePrevote extends json_1.JSONSerializable {
    /**
     * @param hash vote hash
     * @param feeder validator's feeder account address
     * @param validator validator's operator address
     */
    constructor(hash, feeder, validator) {
        super();
        this.hash = hash;
        this.feeder = feeder;
        this.validator = validator;
    }
    static fromAmino(data, isClassic) {
        if (!isClassic) {
            throw new Error('Not supported for the network');
        }
        const { value: { hash, feeder, validator }, } = data;
        return new MsgAggregateExchangeRatePrevote(hash, feeder, validator);
    }
    toAmino(isClassic) {
        if (!isClassic) {
            throw new Error('Not supported for the network');
        }
        const { hash, feeder, validator } = this;
        return {
            type: 'oracle/MsgAggregateExchangeRatePrevote',
            value: {
                hash,
                feeder,
                validator,
            },
        };
    }
    static fromData(data, isClassic) {
        if (!isClassic) {
            throw new Error('Not supported for the network');
        }
        const { hash, feeder, validator } = data;
        return new MsgAggregateExchangeRatePrevote(hash, feeder, validator);
    }
    toData(isClassic) {
        if (!isClassic) {
            throw new Error('Not supported for the network');
        }
        const { hash, feeder, validator } = this;
        return {
            '@type': '/terra.oracle.v1beta1.MsgAggregateExchangeRatePrevote',
            hash,
            feeder,
            validator,
        };
    }
    static fromProto(proto, isClassic) {
        if (!isClassic) {
            throw new Error('Not supported for the network');
        }
        return new MsgAggregateExchangeRatePrevote(proto.hash, proto.feeder, proto.validator);
    }
    toProto(isClassic) {
        if (!isClassic) {
            throw new Error('Not supported for the network');
        }
        const { hash, feeder, validator } = this;
        return tx_1.MsgAggregateExchangeRatePrevote.fromPartial({
            hash,
            feeder,
            validator,
        });
    }
    packAny(isClassic) {
        if (!isClassic) {
            throw new Error('Not supported for the network');
        }
        return any_1.Any.fromPartial({
            typeUrl: '/terra.oracle.v1beta1.MsgAggregateExchangeRatePrevote',
            value: tx_1.MsgAggregateExchangeRatePrevote.encode(this.toProto(isClassic)).finish(),
        });
    }
    static unpackAny(msgAny, isClassic) {
        if (!isClassic) {
            throw new Error('Not supported for the network');
        }
        return MsgAggregateExchangeRatePrevote.fromProto(tx_1.MsgAggregateExchangeRatePrevote.decode(msgAny.value), isClassic);
    }
}
exports.MsgAggregateExchangeRatePrevote = MsgAggregateExchangeRatePrevote;
//# sourceMappingURL=MsgAggregateExchangeRatePrevote.js.map