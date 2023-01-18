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
exports.PublicKey = exports.Proof = void 0;
const proof_1 = require("@terra-money/terra.proto/tendermint/crypto/proof");
const keys_1 = require("@terra-money/terra.proto/tendermint/crypto/keys");
const Long = __importStar(require("long"));
const json_1 = require("../../../../../util/json");
class Proof extends json_1.JSONSerializable {
    /**
     * @param total
     * @param index
     * @param leafHash
     * @param aunts
     */
    constructor(total, index, leafHash, aunts) {
        super();
        this.total = total;
        this.index = index;
        this.leafHash = leafHash;
        this.aunts = aunts;
    }
    static fromAmino(_) {
        _;
        throw new Error('Amino not supported');
    }
    toAmino() {
        throw new Error('Amino not supported');
    }
    static fromData(data) {
        const { total, index, leaf_hash: leafHash, aunts } = data;
        return new Proof(Number.parseInt(total), Number.parseInt(index), leafHash, aunts);
    }
    toData() {
        const { total, index, leafHash, aunts } = this;
        const res = {
            total: total.toFixed(),
            index: index.toFixed(),
            leaf_hash: leafHash,
            aunts,
        };
        return res;
    }
    static fromProto(proto) {
        return new Proof(proto.total.toNumber(), proto.index.toNumber(), Buffer.from(proto.leafHash).toString('base64'), proto.aunts.map(aunt => Buffer.from(aunt).toString('base64')));
    }
    toProto() {
        const { total, index, leafHash, aunts } = this;
        return proof_1.Proof.fromPartial({
            total: Long.fromNumber(total),
            index: Long.fromNumber(index),
            leafHash: Buffer.from(leafHash, 'base64'),
            aunts: aunts.map(aunt => Buffer.from(aunt, 'base64')),
        });
    }
}
exports.Proof = Proof;
/** PublicKey defines the keys available for use with Tendermint Validators */
class PublicKey extends json_1.JSONSerializable {
    /**
     * @param ed25519
     * @param secp256k1
     */
    constructor(ed25519, secp256k1) {
        super();
        this.ed25519 = ed25519;
        this.secp256k1 = secp256k1;
    }
    static fromAmino(_) {
        _;
        throw new Error('Amino not supported');
    }
    toAmino() {
        throw new Error('Amino not supported');
    }
    static fromData(data) {
        const { ed25519, secp256k1 } = data;
        return new PublicKey(ed25519, secp256k1);
    }
    toData() {
        const { ed25519, secp256k1 } = this;
        const res = {
            ed25519,
            secp256k1,
        };
        return res;
    }
    static fromProto(proto) {
        const { ed25519, secp256k1 } = proto;
        return new PublicKey(ed25519 ? Buffer.from(ed25519).toString('base64') : undefined, secp256k1 ? Buffer.from(secp256k1).toString('base64') : undefined);
    }
    toProto() {
        const { ed25519, secp256k1 } = this;
        return keys_1.PublicKey.fromPartial({
            ed25519: ed25519 ? Buffer.from(ed25519, 'base64') : undefined,
            secp256k1: secp256k1 ? Buffer.from(secp256k1, 'base64') : undefined,
        });
    }
}
exports.PublicKey = PublicKey;
//# sourceMappingURL=crypto.js.map