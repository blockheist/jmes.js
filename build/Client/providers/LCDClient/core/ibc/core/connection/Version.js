"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Version = void 0;
const connection_1 = require("@terra-money/terra.proto/ibc/core/connection/v1/connection");
const json_1 = require("../../../../util/json");
/*
 * Version defines the versioning scheme used to negotiate the IBC verison in the connection handshake.
 */
class Version extends json_1.JSONSerializable {
    /**
     * @param identifier unique version identifier
     * @param features list of features compatible with the specified identifier
     */
    constructor(identifier, features) {
        super();
        this.identifier = identifier;
        this.features = features;
    }
    static fromAmino(data) {
        const { identifier, features } = data;
        return new Version(identifier, features);
    }
    toAmino() {
        const { identifier, features } = this;
        const res = {
            identifier,
            features,
        };
        return res;
    }
    static fromData(data) {
        const { identifier, features } = data;
        return new Version(identifier, features);
    }
    toData() {
        const { identifier, features } = this;
        const res = {
            identifier,
            features,
        };
        return res;
    }
    static fromProto(proto) {
        return new Version(proto.identifier, proto.features);
    }
    toProto() {
        const { identifier, features } = this;
        return connection_1.Version.fromPartial({ identifier, features });
    }
}
exports.Version = Version;
//# sourceMappingURL=Version.js.map