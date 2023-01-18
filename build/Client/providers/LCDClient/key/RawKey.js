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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RawKey = void 0;
const jscrypto_1 = require("jscrypto");
const Key_1 = require("./Key");
const PublicKey_1 = require("../core/PublicKey");
const elliptic = __importStar(require("elliptic"));
/**
 * An implementation of the Key interfaces that uses a raw private key.
 */
class RawKey extends Key_1.Key {
    constructor(privateKey) {
        const ec = new elliptic.ec('secp256k1');
        const key = ec.keyFromPrivate(privateKey);
        const publicKey = key.getPublic(true, 'array');
        super(new PublicKey_1.SimplePublicKey(Buffer.from(publicKey).toString('base64')));
        this.privateKey = privateKey;
    }
    ecdsaSign(payload) {
        console.log({ payload });
        const ec = new elliptic.ec('secp256k1');
        const key = ec.keyFromPrivate(this.privateKey);
        const hash = Uint8Array.from(Buffer.from(jscrypto_1.SHA256.hash(new jscrypto_1.Word32Array(payload)).toString(), 'hex'));
        // @ts-ignore
        const sign = key.sign(hash, 'hex', { canonical: true });
        // @ts-ignore
        const r = sign.r.toArrayLike(Uint8Array, 'be', 32);
        // @ts-ignore
        const s = sign.s.toArrayLike(Uint8Array, 'be', 32);
        return {
            //@ts-ignore
            signature: Uint8Array.from(Buffer.concat([r, s])),
            //@ts-ignore
            recid: sign.recoveryParam
        };
    }
    sign(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const { signature } = this.ecdsaSign(payload);
            return Buffer.from(signature);
        });
    }
}
exports.RawKey = RawKey;
//# sourceMappingURL=RawKey.js.map