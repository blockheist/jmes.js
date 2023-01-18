"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccessTypeParam = exports.AccessType = void 0;
const types_1 = require("@jmesworld/jmes.proto/cosmwasm/wasm/v1/types");
Object.defineProperty(exports, "AccessType", { enumerable: true, get: function () { return types_1.AccessType; } });
const json_1 = require("../../util/json");
const util_1 = require("./util");
/**
 *
 */
class AccessTypeParam extends json_1.JSONSerializable {
    /**
     * @param value access type
     */
    constructor(value) {
        super();
        this.value = value;
    }
    static fromAmino(data) {
        return new AccessTypeParam((0, util_1.convertAccessTypeFromJSON)(data.value));
    }
    toAmino() {
        const res = {
            value: (0, types_1.accessTypeToJSON)(this.value),
        };
        return res;
    }
    static fromData(data) {
        return new AccessTypeParam((0, util_1.convertAccessTypeFromJSON)(data.value));
    }
    toData() {
        const res = {
            value: (0, types_1.accessTypeToJSON)(this.value),
        };
        return res;
    }
    static fromProto(proto) {
        return new AccessTypeParam(proto.value);
    }
    toProto() {
        return types_1.AccessTypeParam.fromPartial({
            value: this.value,
        });
    }
}
exports.AccessTypeParam = AccessTypeParam;
//# sourceMappingURL=AccessTypeParam.js.map