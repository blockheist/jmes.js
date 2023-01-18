"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MsgStoreCode = void 0;
const json_1 = require("../../../util/json");
const any_1 = require("@jmesworld/jmes.proto/src/google/protobuf/any");
const tx_1 = require("@terra-money/legacy.proto/terra/wasm/v1beta1/tx");
const tx_2 = require("@jmesworld/jmes.proto/cosmwasm/wasm/v1/tx");
const AccessConfig_1 = require("../AccessConfig");
class MsgStoreCode extends json_1.JSONSerializable {
    /**
     * @param sender code creator
     * @param wasm_byte_code base64-encoded bytecode contents
     * @param instantiate_permission  InstantiatePermission access control to apply on contract creation, optional. v2 supported only
     */
    constructor(sender, wasm_byte_code, instantiate_permission) {
        super();
        this.sender = sender;
        this.wasm_byte_code = wasm_byte_code;
        this.instantiate_permission = instantiate_permission;
    }
    static fromAmino(data, isClassic) {
        if (isClassic) {
            const { value: { sender, wasm_byte_code }, } = data;
            return new MsgStoreCode(sender, wasm_byte_code);
        }
        else {
            const { value: { sender, wasm_byte_code, instantiate_permission }, } = data;
            return new MsgStoreCode(sender, wasm_byte_code, instantiate_permission
                ? AccessConfig_1.AccessConfig.fromAmino(instantiate_permission)
                : undefined);
        }
    }
    toAmino(isClassic) {
        const { sender, wasm_byte_code, instantiate_permission } = this;
        if (isClassic) {
            return {
                type: 'wasm/MsgStoreCode',
                value: {
                    sender,
                    wasm_byte_code,
                },
            };
        }
        else {
            return {
                type: 'wasm/MsgStoreCode',
                value: {
                    sender,
                    wasm_byte_code,
                    instantiate_permission: instantiate_permission === null || instantiate_permission === void 0 ? void 0 : instantiate_permission.toAmino(),
                },
            };
        }
    }
    static fromProto(proto, isClassic) {
        if (isClassic) {
            return new MsgStoreCode(proto.sender, Buffer.from(proto.wasmByteCode).toString('base64'));
        }
        else {
            const p = proto;
            return new MsgStoreCode(p.sender, Buffer.from(p.wasmByteCode).toString('base64'), p.instantiatePermission
                ? AccessConfig_1.AccessConfig.fromProto(p.instantiatePermission)
                : undefined);
        }
    }
    toProto(isClassic) {
        const { sender, wasm_byte_code, instantiate_permission } = this;
        if (isClassic) {
            return tx_1.MsgStoreCode.fromPartial({
                sender,
                wasmByteCode: Buffer.from(wasm_byte_code, 'base64'),
            });
        }
        else {
            return tx_2.MsgStoreCode.fromPartial({
                sender,
                wasmByteCode: Buffer.from(wasm_byte_code, 'base64'),
                instantiatePermission: instantiate_permission === null || instantiate_permission === void 0 ? void 0 : instantiate_permission.toProto(),
            });
        }
    }
    packAny(isClassic) {
        let typeUrl;
        if (isClassic) {
            typeUrl = '/jmes.wasm.v1beta1.MsgStoreCode';
        }
        else {
            typeUrl = '/cosmwasm.wasm.v1.MsgStoreCode';
        }
        const any = any_1.Any.fromPartial({
            typeUrl,
            value: isClassic
                ? tx_1.MsgStoreCode.encode(this.toProto(isClassic)).finish()
                : tx_2.MsgStoreCode.encode(this.toProto(isClassic)).finish(),
        });
        return any;
    }
    static unpackAny(msgAny, isClassic) {
        if (isClassic) {
            return MsgStoreCode.fromProto(tx_1.MsgStoreCode.decode(msgAny.value), isClassic);
        }
        else {
            return MsgStoreCode.fromProto(tx_2.MsgStoreCode.decode(msgAny.value), isClassic);
        }
    }
    static fromData(data, isClassic) {
        if (isClassic) {
            const { sender, wasm_byte_code } = data;
            return new MsgStoreCode(sender, wasm_byte_code);
        }
        else {
            const { sender, wasm_byte_code, instantiate_permission } = data;
            return new MsgStoreCode(sender, wasm_byte_code, instantiate_permission
                ? AccessConfig_1.AccessConfig.fromData(instantiate_permission)
                : undefined);
        }
    }
    toData(isClassic) {
        const { sender, wasm_byte_code, instantiate_permission } = this;
        if (isClassic) {
            return {
                '@type': '/jmes.wasm.v1beta1.MsgStoreCode',
                sender,
                wasm_byte_code,
            };
        }
        else {
            return {
                '@type': '/cosmwasm.wasm.v1.MsgStoreCode',
                sender,
                wasm_byte_code,
                instantiate_permission: instantiate_permission === null || instantiate_permission === void 0 ? void 0 : instantiate_permission.toData(),
            };
        }
    }
}
exports.MsgStoreCode = MsgStoreCode;
//# sourceMappingURL=MsgStoreCode.js.map