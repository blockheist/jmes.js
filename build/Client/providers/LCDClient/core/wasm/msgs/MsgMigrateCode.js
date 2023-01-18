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
exports.MsgMigrateCode = void 0;
const json_1 = require("../../../util/json");
const any_1 = require("@jmesworld/jmes.proto/src/google/protobuf/any");
const tx_1 = require("@terra-money/legacy.proto/terra/wasm/v1beta1/tx");
const Long = __importStar(require("long"));
class MsgMigrateCode extends json_1.JSONSerializable {
    /**
     * @param sender code migrator address
     * @param code_id reference to the code on the blockchain
     * @param wasm_byte_code base64-encoded bytecode contents
     */
    constructor(sender, code_id, wasm_byte_code) {
        super();
        this.sender = sender;
        this.code_id = code_id;
        this.wasm_byte_code = wasm_byte_code;
    }
    static fromAmino(data, isClassic) {
        if (!isClassic) {
            throw new Error('Not supported for the network');
        }
        const { value: { sender, code_id, wasm_byte_code }, } = data;
        return new MsgMigrateCode(sender, Number.parseInt(code_id), wasm_byte_code);
    }
    toAmino(isClassic) {
        if (!isClassic) {
            throw new Error('Not supported for the network');
        }
        const { sender, code_id, wasm_byte_code } = this;
        return {
            type: 'wasm/MsgMigrateCode',
            value: {
                sender,
                code_id: code_id.toFixed(),
                wasm_byte_code,
            },
        };
    }
    static fromProto(proto, isClassic) {
        if (!isClassic) {
            throw new Error('Not supported for the network');
        }
        return new MsgMigrateCode(proto.sender, proto.codeId.toNumber(), Buffer.from(proto.wasmByteCode).toString('base64'));
    }
    toProto(isClassic) {
        if (!isClassic) {
            throw new Error('Not supported for the network');
        }
        const { sender, code_id, wasm_byte_code } = this;
        return tx_1.MsgMigrateCode.fromPartial({
            codeId: Long.fromNumber(code_id),
            sender,
            wasmByteCode: Buffer.from(wasm_byte_code, 'base64'),
        });
    }
    packAny(isClassic) {
        if (!isClassic) {
            throw new Error('Not supported for the network');
        }
        return any_1.Any.fromPartial({
            typeUrl: '/jmes.wasm.v1beta1.MsgMigrateCode',
            value: tx_1.MsgMigrateCode.encode(this.toProto(isClassic)).finish(),
        });
    }
    static unpackAny(msgAny, isClassic) {
        if (!isClassic) {
            throw new Error('Not supported for the network');
        }
        return MsgMigrateCode.fromProto(tx_1.MsgMigrateCode.decode(msgAny.value), isClassic);
    }
    static fromData(data, isClassic) {
        if (!isClassic) {
            throw new Error('Not supported for the network');
        }
        const { sender, code_id, wasm_byte_code } = data;
        return new MsgMigrateCode(sender, Number.parseInt(code_id), wasm_byte_code);
    }
    toData(isClassic) {
        if (!isClassic) {
            throw new Error('Not supported for the network');
        }
        const { sender, code_id, wasm_byte_code } = this;
        return {
            '@type': '/jmes.wasm.v1beta1.MsgMigrateCode',
            sender,
            code_id: code_id.toFixed(),
            wasm_byte_code,
        };
    }
}
exports.MsgMigrateCode = MsgMigrateCode;
//# sourceMappingURL=MsgMigrateCode.js.map