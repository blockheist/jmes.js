"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MerkleRoot = void 0;
const commitment_1 = require("@terra-money/terra.proto/ibc/core/commitment/v1/commitment");
const json_1 = require("../../../../util/json");
// MerkleRoot defines a merkle root hash.
// In the Cosmos SDK, the AppHash of a block header becomes the root.
class MerkleRoot extends json_1.JSONSerializable {
    /**
     * @param hash
     */
    constructor(hash) {
        super();
        this.hash = hash;
    }
    static fromAmino(_) {
        _;
        throw new Error('Amino not supported');
    }
    toAmino() {
        throw new Error('Amino not supported');
    }
    static fromData(data) {
        return new MerkleRoot(data.hash);
    }
    toData() {
        const res = {
            hash: this.hash
        };
        return res;
    }
    static fromProto(proto) {
        return new MerkleRoot(Buffer.from(proto.hash).toString('base64'));
    }
    toProto() {
        return commitment_1.MerkleRoot.fromPartial({
            hash: Buffer.from(this.hash, 'base64')
        });
    }
}
exports.MerkleRoot = MerkleRoot;
//# sourceMappingURL=MerkleRoot.js.map