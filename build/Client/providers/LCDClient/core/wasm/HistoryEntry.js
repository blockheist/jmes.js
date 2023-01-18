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
exports.HistoryEntry = void 0;
const types_1 = require("@jmesworld/jmes.proto/cosmwasm/wasm/v1/types");
const json_1 = require("../../util/json");
const Long = __importStar(require("long"));
const AbsoluteTxPosition_1 = require("./AbsoluteTxPosition");
/**
 *
 */
class HistoryEntry extends json_1.JSONSerializable {
    /**
     * @param operation access type
     * @param code_id
     */
    constructor(operation, code_id, updated, msg) {
        super();
        this.operation = operation;
        this.code_id = code_id;
        this.updated = updated;
        this.msg = msg;
    }
    static fromAmino(data) {
        return new HistoryEntry((0, types_1.contractCodeHistoryOperationTypeFromJSON)(data.operation), Number.parseInt(data.code_id), data.updated ? AbsoluteTxPosition_1.AbsoluteTxPosition.fromAmino(data.updated) : undefined, data.msg);
    }
    toAmino() {
        var _a;
        const res = {
            operation: (0, types_1.contractCodeHistoryOperationTypeToJSON)(this.operation),
            code_id: this.code_id.toFixed(),
            updated: (_a = this.updated) === null || _a === void 0 ? void 0 : _a.toAmino(),
            msg: this.msg,
        };
        return res;
    }
    static fromData(data) {
        return new HistoryEntry((0, types_1.contractCodeHistoryOperationTypeFromJSON)(data.operation), Number.parseInt(data.code_id), data.updated ? AbsoluteTxPosition_1.AbsoluteTxPosition.fromData(data.updated) : undefined, data.msg);
    }
    toData() {
        var _a;
        const res = {
            operation: (0, types_1.contractCodeHistoryOperationTypeToJSON)(this.operation),
            code_id: this.code_id.toFixed(),
            updated: (_a = this.updated) === null || _a === void 0 ? void 0 : _a.toData(),
            msg: this.msg,
        };
        return res;
    }
    static fromProto(proto) {
        return new HistoryEntry(proto.operation, proto.codeId.toNumber(), proto.updated ? AbsoluteTxPosition_1.AbsoluteTxPosition.fromProto(proto.updated) : undefined, JSON.parse(Buffer.from(proto.msg).toString('utf-8')));
    }
    toProto() {
        var _a;
        return types_1.ContractCodeHistoryEntry.fromPartial({
            operation: this.operation,
            codeId: Long.fromNumber(this.code_id),
            updated: (_a = this.updated) === null || _a === void 0 ? void 0 : _a.toProto(),
            msg: Buffer.from(JSON.stringify((0, json_1.removeNull)(this.msg)), 'utf-8'),
        });
    }
}
exports.HistoryEntry = HistoryEntry;
//# sourceMappingURL=HistoryEntry.js.map