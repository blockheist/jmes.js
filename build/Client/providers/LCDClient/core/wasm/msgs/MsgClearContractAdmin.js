"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MsgClearContractAdmin = void 0;
const json_1 = require("../../../util/json");
const any_1 = require("@jmesworld/jmes.proto/src/google/protobuf/any");
const tx_1 = require("@terra-money/legacy.proto/terra/wasm/v1beta1/tx");
const tx_2 = require("@jmesworld/jmes.proto/cosmwasm/wasm/v1/tx");
class MsgClearContractAdmin extends json_1.JSONSerializable {
    /**
     * @param admin contract admin
     * @param contract contract address
     */
    constructor(admin, contract) {
        super();
        this.admin = admin;
        this.contract = contract;
    }
    static fromAmino(data, isClassic) {
        if (isClassic) {
            const { value: { admin, contract }, } = data;
            return new MsgClearContractAdmin(admin, contract);
        }
        else {
            const { value: { sender, contract }, } = data;
            return new MsgClearContractAdmin(sender, contract);
        }
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    toAmino(isClassic) {
        const { admin, contract } = this;
        if (isClassic) {
            return {
                type: 'wasm/MsgClearContractAdmin',
                value: {
                    admin,
                    contract,
                },
            };
        }
        else {
            return {
                type: 'wasm/MsgClearAdmin',
                value: {
                    sender: admin,
                    contract,
                },
            };
        }
    }
    static fromProto(data, isClassic) {
        if (isClassic) {
            const { admin, contract } = data;
            return new MsgClearContractAdmin(admin, contract);
        }
        else {
            const { sender, contract } = data;
            return new MsgClearContractAdmin(sender, contract);
        }
    }
    toProto(isClassic) {
        if (isClassic) {
            return tx_1.MsgClearContractAdmin.fromPartial({
                admin: this.admin,
                contract: this.contract,
            });
        }
        else {
            return tx_2.MsgClearAdmin.fromPartial({
                sender: this.admin,
                contract: this.contract,
            });
        }
    }
    packAny(isClassic) {
        if (isClassic) {
            return any_1.Any.fromPartial({
                typeUrl: '/jmes.wasm.v1beta1.MsgClearContractAdmin',
                value: tx_1.MsgClearContractAdmin.encode(this.toProto(isClassic)).finish(),
            });
        }
        else {
            return any_1.Any.fromPartial({
                typeUrl: '/cosmwasm.wasm.v1.MsgClearAdmin',
                value: tx_2.MsgClearAdmin.encode(this.toProto(isClassic)).finish(),
            });
        }
    }
    static unpackAny(msgAny, isClassic) {
        if (isClassic) {
            return MsgClearContractAdmin.fromProto(tx_1.MsgClearContractAdmin.decode(msgAny.value), isClassic);
        }
        else {
            return MsgClearContractAdmin.fromProto(tx_2.MsgClearAdmin.decode(msgAny.value), isClassic);
        }
    }
    static fromData(data, isClassic) {
        if (isClassic) {
            const { admin, contract } = data;
            return new MsgClearContractAdmin(admin, contract);
        }
        else {
            const { sender, contract } = data;
            return new MsgClearContractAdmin(sender, contract);
        }
    }
    toData(isClassic) {
        if (isClassic) {
            return {
                '@type': '/jmes.wasm.v1beta1.MsgClearContractAdmin',
                admin: this.admin,
                contract: this.contract,
            };
        }
        else {
            return {
                '@type': '/cosmwasm.wasm.v1.MsgClearAdmin',
                sender: this.admin,
                contract: this.contract,
            };
        }
    }
}
exports.MsgClearContractAdmin = MsgClearContractAdmin;
//# sourceMappingURL=MsgClearContractAdmin.js.map