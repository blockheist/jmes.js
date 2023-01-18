"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DenomTrace = void 0;
const transfer_1 = require("@terra-money/legacy.proto/ibc/applications/transfer/v1/transfer");
const json_1 = require("../../../../../util/json");
/**
 * DenomTrace is a monotonically increasing data type
 * that can be compared against another DenomTrace for the purposes of updating and
 * freezing clients
 *
 * Normally the RevisionDenomTrace is incremented at each height while keeping
 * RevisionNumber the same. However some consensus algorithms may choose to
 * reset the height in certain conditions e.g. hard forks, state-machine
 * breaking changes In these cases, the RevisionNumber is incremented so that
 * height continues to be monitonically increasing even as the RevisionDenomTrace
 * gets reset
 */
class DenomTrace extends json_1.JSONSerializable {
    /**
     * @param path the revision that the client is currently on
     * @param base_denom the height within the given revision
     */
    constructor(path, base_denom) {
        super();
        this.path = path;
        this.base_denom = base_denom;
    }
    static fromAmino(data) {
        const { path, base_denom } = data;
        return new DenomTrace(path, base_denom);
    }
    toAmino() {
        const { path, base_denom } = this;
        const res = {
            path,
            base_denom,
        };
        return res;
    }
    static fromData(data) {
        const { path, base_denom } = data;
        return new DenomTrace(path, base_denom);
    }
    toData() {
        const { path, base_denom } = this;
        const res = {
            path,
            base_denom,
        };
        return res;
    }
    static fromProto(proto) {
        return new DenomTrace(proto.path, proto.baseDenom);
    }
    toProto() {
        const { path, base_denom } = this;
        return transfer_1.DenomTrace.fromPartial({ path, baseDenom: base_denom });
    }
}
exports.DenomTrace = DenomTrace;
//# sourceMappingURL=DenomTrace.js.map