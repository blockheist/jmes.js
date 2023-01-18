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
exports.AbsoluteTxPosition = void 0;
const types_1 = require("@jmesworld/jmes.proto/cosmwasm/wasm/v1/types");
const json_1 = require("../../util/json");
const Long = __importStar(require("long"));
/**
 *
 */
class AbsoluteTxPosition extends json_1.JSONSerializable {
    /**
     * @param block_height
     * @param tx_index
     */
    constructor(block_height, tx_index) {
        super();
        this.block_height = block_height;
        this.tx_index = tx_index;
    }
    static fromAmino(data) {
        return new AbsoluteTxPosition(Number.parseInt(data.block_height), Number.parseInt(data.tx_index));
    }
    toAmino() {
        const res = {
            block_height: this.block_height.toFixed(),
            tx_index: this.tx_index.toFixed(),
        };
        return res;
    }
    static fromData(data) {
        return new AbsoluteTxPosition(Number.parseInt(data.block_height), Number.parseInt(data.tx_index));
    }
    toData() {
        const res = {
            block_height: this.block_height.toFixed(),
            tx_index: this.tx_index.toFixed(),
        };
        return res;
    }
    static fromProto(proto) {
        return new AbsoluteTxPosition(proto.blockHeight.toNumber(), proto.txIndex.toNumber());
    }
    toProto() {
        return types_1.AbsoluteTxPosition.fromPartial({
            blockHeight: Long.fromNumber(this.block_height),
            txIndex: Long.fromNumber(this.tx_index),
        });
    }
}
exports.AbsoluteTxPosition = AbsoluteTxPosition;
//# sourceMappingURL=AbsoluteTxPosition.js.map