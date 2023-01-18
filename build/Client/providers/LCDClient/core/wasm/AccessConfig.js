"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccessConfig = exports.AccessType = void 0;
const types_1 = require("@jmesworld/jmes.proto/cosmwasm/wasm/v1/types");
Object.defineProperty(exports, "AccessType", { enumerable: true, get: function () { return types_1.AccessType; } });
const json_1 = require("../../util/json");
const util_1 = require("./util");
/**
 *
 */
class AccessConfig extends json_1.JSONSerializable {
    /**
     * @param permission access type
     * @param address
     */
    constructor(permission, address) {
        super();
        this.permission = permission;
        this.address = address;
    }
    static fromAmino(data) {
        return new AccessConfig((0, util_1.convertAccessTypeFromJSON)(data.permission), data.address);
    }
    toAmino() {
        const res = {
            permission: (0, types_1.accessTypeToJSON)(this.permission),
            address: this.address,
        };
        return res;
    }
    static fromData(data) {
        // FIXME: new core returns human-friendly string like 'Everybody'.
        // but convertAccessTypeFromJSON requires "ACCESS_TYPE_EVERYBODY"
        // TODO: find out why the strings arent't matching
        return new AccessConfig((0, util_1.convertAccessTypeFromJSON)(data.permission), data.address);
    }
    toData() {
        const res = {
            permission: (0, types_1.accessTypeToJSON)(this.permission),
            address: this.address,
        };
        return res;
    }
    static fromProto(proto) {
        return new AccessConfig(proto.permission, proto.address);
    }
    toProto() {
        return types_1.AccessConfig.fromPartial({
            permission: this.permission,
            address: this.address,
        });
    }
}
exports.AccessConfig = AccessConfig;
//# sourceMappingURL=AccessConfig.js.map