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
exports.Height = void 0;
const client_1 = require("@terra-money/terra.proto/ibc/core/client/v1/client");
const Long = __importStar(require("long"));
const json_1 = require("../../../../util/json");
/**
 * Height is a monotonically increasing data type
 * that can be compared against another Height for the purposes of updating and
 * freezing clients
 *
 * Normally the RevisionHeight is incremented at each height while keeping
 * RevisionNumber the same. However some consensus algorithms may choose to
 * reset the height in certain conditions e.g. hard forks, state-machine
 * breaking changes In these cases, the RevisionNumber is incremented so that
 * height continues to be monitonically increasing even as the RevisionHeight
 * gets reset
 */
class Height extends json_1.JSONSerializable {
    /**
     * @param revision_number the revision that the client is currently on
     * @param revision_height the height within the given revision
     */
    constructor(revision_number, revision_height) {
        super();
        this.revision_number = revision_number;
        this.revision_height = revision_height;
    }
    static fromAmino(data) {
        const { revision_number, revision_height } = data;
        return new Height(parseInt(revision_number || '0'), parseInt(revision_height || '0'));
    }
    toAmino() {
        const { revision_number, revision_height } = this;
        const res = {
            revision_number: revision_number > 0 ? revision_number.toFixed() : undefined,
            revision_height: revision_height > 0 ? revision_height.toFixed() : undefined,
        };
        return res;
    }
    static fromData(data) {
        const { revision_number, revision_height } = data;
        return new Height(Number.parseInt(revision_number), Number.parseInt(revision_height));
    }
    toData() {
        const { revision_number, revision_height } = this;
        const res = {
            revision_number: revision_number.toFixed(),
            revision_height: revision_height.toFixed(),
        };
        return res;
    }
    static fromProto(proto) {
        return new Height(proto.revisionNumber.toNumber(), proto.revisionHeight.toNumber());
    }
    toProto() {
        const { revision_number, revision_height } = this;
        return client_1.Height.fromPartial({
            revisionNumber: Long.fromNumber(revision_number),
            revisionHeight: Long.fromNumber(revision_height),
        });
    }
}
exports.Height = Height;
//# sourceMappingURL=Height.js.map