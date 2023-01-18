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
exports.AccessConfigUpdate = void 0;
const proposal_1 = require("@jmesworld/jmes.proto/cosmwasm/wasm/v1/proposal");
const json_1 = require("../../util/json");
const AccessConfig_1 = require("./AccessConfig");
const Long = __importStar(require("long"));
/**
 *
 */
class AccessConfigUpdate extends json_1.JSONSerializable {
    /**
     * @param code_id the reference to the stored WASM code to be updated
     * @param instantiate_permission to apply to the set of code ids
     */
    constructor(code_id, instantiate_permission) {
        super();
        this.code_id = code_id;
        this.instantiate_permission = instantiate_permission;
    }
    static fromAmino(data) {
        return new AccessConfigUpdate(Number.parseInt(data.code_id), data.instantiate_permission ? AccessConfig_1.AccessConfig.fromAmino(data.instantiate_permission) : undefined);
    }
    toAmino() {
        var _a;
        const res = {
            code_id: this.code_id.toFixed(),
            instantiate_permission: (_a = this.instantiate_permission) === null || _a === void 0 ? void 0 : _a.toAmino()
        };
        return res;
    }
    static fromData(data) {
        return new AccessConfigUpdate(Number.parseInt(data.code_id), data.instantiate_permission ? AccessConfig_1.AccessConfig.fromData(data.instantiate_permission) : undefined);
    }
    toData() {
        var _a;
        const res = {
            code_id: this.code_id.toFixed(),
            instantiate_permission: (_a = this.instantiate_permission) === null || _a === void 0 ? void 0 : _a.toData()
        };
        return res;
    }
    static fromProto(proto) {
        return new AccessConfigUpdate(proto.codeId.toNumber(), proto.instantiatePermission ? AccessConfig_1.AccessConfig.fromProto(proto.instantiatePermission) : undefined);
    }
    toProto() {
        var _a;
        return proposal_1.AccessConfigUpdate.fromPartial({
            codeId: Long.fromNumber(this.code_id),
            instantiatePermission: (_a = this.instantiate_permission) === null || _a === void 0 ? void 0 : _a.toProto()
        });
    }
}
exports.AccessConfigUpdate = AccessConfigUpdate;
//# sourceMappingURL=AccessConfigUpdate.js.map