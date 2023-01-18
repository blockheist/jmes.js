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
exports.DerivableKey = void 0;
const hash_1 = require("../../Client/providers/LCDClient/util/hash");
const bech32_1 = require("bech32");
const elliptic = __importStar(require("elliptic"));
class DerivableKey {
    // @ts-ignore
    constructor(hdKey) {
        //@ts-ignore
        const buffPrivKey = Buffer.from(hdKey.privateKey);
        this.privateKey = buffPrivKey;
        this.hdKey = hdKey;
    }
    derivePath(path) {
        const derivedHD = this.hdKey.derive(path);
        return new DerivableKey(derivedHD);
    }
    toAddress() {
        const hash = (0, hash_1.ripemd160)((0, hash_1.sha256)(this.toPublic()));
        return bech32_1.bech32.encode('jmes', bech32_1.bech32.toWords(hash));
    }
    toPrivate() {
        return this.privateKey;
    }
    toPublic() {
        const ec = new elliptic.ec('secp256k1');
        const key = ec.keyFromPrivate(this.toPrivate());
        const publicKey = key.getPublic(true, 'hex');
        return Buffer.from(publicKey, 'hex');
    }
    sign(message) {
        return this.hdKey.sign(message);
    }
    verify(signature) {
        return this.hdKey.verify(signature);
    }
}
exports.DerivableKey = DerivableKey;
//# sourceMappingURL=DerivableKey.js.map