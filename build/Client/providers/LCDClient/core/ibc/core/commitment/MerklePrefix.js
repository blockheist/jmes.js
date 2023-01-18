"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MerklePrefix = void 0;
const commitment_1 = require("@terra-money/terra.proto/ibc/core/commitment/v1/commitment");
const json_1 = require("../../../../util/json");
/*
 * MerklePrefix is merkle path prefixed to the key.
 * The constructed key from the Path and the key will be append(Path.KeyPath,
 * append(Path.KeyPrefix, key...))
 */
class MerklePrefix extends json_1.JSONSerializable {
    /**
     * @param key_prefix
     */
    constructor(key_prefix) {
        super();
        this.key_prefix = key_prefix;
    }
    static fromAmino(data) {
        const { key_prefix } = data;
        return new MerklePrefix(key_prefix);
    }
    toAmino() {
        const { key_prefix } = this;
        const res = {
            key_prefix,
        };
        return res;
    }
    static fromData(data) {
        const { key_prefix } = data;
        return new MerklePrefix(key_prefix);
    }
    toData() {
        const { key_prefix } = this;
        const res = {
            key_prefix,
        };
        return res;
    }
    static fromProto(proto) {
        return new MerklePrefix(Buffer.from(proto.keyPrefix).toString('base64'));
    }
    toProto() {
        const { key_prefix } = this;
        return commitment_1.MerklePrefix.fromPartial({
            keyPrefix: Buffer.from(key_prefix, 'base64'),
        });
    }
}
exports.MerklePrefix = MerklePrefix;
//# sourceMappingURL=MerklePrefix.js.map