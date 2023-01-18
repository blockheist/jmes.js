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
exports.AggregateExchangeRatePrevote = void 0;
const json_1 = require("../../util/json");
const oracle_1 = require("@terra-money/legacy.proto/terra/oracle/v1beta1/oracle");
const Long = __importStar(require("long"));
/**
 * Stores information about data about Oracle aggregate prevotes fetched from the blockchain.
 */
class AggregateExchangeRatePrevote extends json_1.JSONSerializable {
    /**
     * @param hash aggregate vote hash
     * @param voter validator
     * @param submit_block block during which aggregate prevote was submitted
     */
    constructor(hash, voter, submit_block) {
        super();
        this.hash = hash;
        this.voter = voter;
        this.submit_block = submit_block;
    }
    static fromAmino(data) {
        const { hash, voter, submit_block } = data;
        return new AggregateExchangeRatePrevote(hash, voter, Number.parseInt(submit_block));
    }
    toAmino() {
        const { hash, voter, submit_block } = this;
        return {
            hash,
            voter,
            submit_block: submit_block.toFixed(),
        };
    }
    static fromData(data) {
        const { hash, voter, submit_block } = data;
        return new AggregateExchangeRatePrevote(hash, voter, Number.parseInt(submit_block));
    }
    toData() {
        const { hash, voter, submit_block } = this;
        return {
            hash,
            voter,
            submit_block: submit_block.toFixed(),
        };
    }
    static fromProto(data) {
        return new AggregateExchangeRatePrevote(data.hash, data.voter, data.submitBlock.toNumber());
    }
    toProto() {
        const { hash, voter, submit_block } = this;
        return oracle_1.AggregateExchangeRatePrevote.fromPartial({
            hash,
            submitBlock: Long.fromNumber(submit_block),
            voter,
        });
    }
}
exports.AggregateExchangeRatePrevote = AggregateExchangeRatePrevote;
//# sourceMappingURL=AggregateExchangeRatePrevote.js.map