"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoreCodeProposal = void 0;
const json_1 = require("../../../util/json");
const any_1 = require("@terra-money/legacy.proto/google/protobuf/any");
const proposal_1 = require("@jmesworld/jmes.proto/cosmwasm/wasm/v1/proposal");
const AccessConfig_1 = require("../AccessConfig");
/**
 * StoreCodeProposal gov proposal content type to submit WASM code to the system
 */
class StoreCodeProposal extends json_1.JSONSerializable {
    /**
     * @param title a short summary
     * @param description a human readable text
     * @param run_as the address that is passed to the contract's environment as sender
     * @param wasm_byte_code can be raw or gzip compressed
     * @param instantiate_permission to apply on contract creation, optional
     */
    constructor(title, description, run_as, wasm_byte_code, instantiate_permission) {
        super();
        this.title = title;
        this.description = description;
        this.run_as = run_as;
        this.wasm_byte_code = wasm_byte_code;
        this.instantiate_permission = instantiate_permission;
    }
    static fromAmino(data, isClassic) {
        if (isClassic) {
            throw new Error('Not supported for the network');
        }
        const { value: { title, description, run_as, wasm_byte_code, instantiate_permission, }, } = data;
        return new StoreCodeProposal(title, description, run_as, wasm_byte_code, instantiate_permission
            ? AccessConfig_1.AccessConfig.fromAmino(instantiate_permission)
            : undefined);
    }
    toAmino(isClassic) {
        if (isClassic) {
            throw new Error('Not supported for the network');
        }
        const { title, description, run_as, wasm_byte_code, instantiate_permission, } = this;
        return {
            type: 'wasm/StoreCodeProposal',
            value: {
                title,
                description,
                run_as,
                wasm_byte_code,
                instantiate_permission: instantiate_permission === null || instantiate_permission === void 0 ? void 0 : instantiate_permission.toAmino(),
            },
        };
    }
    static fromData(data, isClassic) {
        if (isClassic) {
            throw new Error('Not supported for the network');
        }
        const { title, description, run_as, wasm_byte_code, instantiate_permission, } = data;
        return new StoreCodeProposal(title, description, run_as, wasm_byte_code, instantiate_permission
            ? AccessConfig_1.AccessConfig.fromData(instantiate_permission)
            : undefined);
    }
    toData(isClassic) {
        if (isClassic) {
            throw new Error('Not supported for the network');
        }
        const { title, description, run_as, wasm_byte_code, instantiate_permission, } = this;
        return {
            '@type': '/cosmwasm.wasm.v1.StoreCodeProposal',
            title,
            description,
            run_as,
            wasm_byte_code,
            instantiate_permission: instantiate_permission === null || instantiate_permission === void 0 ? void 0 : instantiate_permission.toData(),
        };
    }
    static fromProto(proto, isClassic) {
        if (isClassic) {
            throw new Error('Not supported for the network');
        }
        return new StoreCodeProposal(proto.title, proto.description, proto.runAs, Buffer.from(proto.wasmByteCode).toString('base64'), proto.instantiatePermission
            ? AccessConfig_1.AccessConfig.fromProto(proto.instantiatePermission)
            : undefined);
    }
    toProto(isClassic) {
        if (isClassic) {
            throw new Error('Not supported for the network');
        }
        const { title, description, run_as, wasm_byte_code, instantiate_permission, } = this;
        return proposal_1.StoreCodeProposal.fromPartial({
            title,
            description,
            runAs: run_as,
            wasmByteCode: Buffer.from(wasm_byte_code, 'base64'),
            instantiatePermission: instantiate_permission === null || instantiate_permission === void 0 ? void 0 : instantiate_permission.toProto(),
        });
    }
    packAny(isClassic) {
        if (isClassic) {
            throw new Error('Not supported for the network');
        }
        return any_1.Any.fromPartial({
            typeUrl: '/cosmwasm.wasm.v1.StoreCodeProposal',
            value: proposal_1.StoreCodeProposal.encode(this.toProto(isClassic)).finish(),
        });
    }
    static unpackAny(msgAny, isClassic) {
        if (isClassic) {
            throw new Error('Not supported for the network');
        }
        return StoreCodeProposal.fromProto(proposal_1.StoreCodeProposal.decode(msgAny.value), isClassic);
    }
}
exports.StoreCodeProposal = StoreCodeProposal;
//# sourceMappingURL=StoreCodeProposal.js.map