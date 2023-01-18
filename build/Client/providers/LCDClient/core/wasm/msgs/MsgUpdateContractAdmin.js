"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MsgUpdateContractAdmin = void 0;
const json_1 = require("../../../util/json");
const any_1 = require("@jmesworld/jmes.proto/src/google/protobuf/any");
const tx_1 = require("@terra-money/legacy.proto/terra/wasm/v1beta1/tx");
const tx_2 = require("@jmesworld/jmes.proto/cosmwasm/wasm/v1/tx");
class MsgUpdateContractAdmin extends json_1.JSONSerializable {
    /**
     * @param admin contract admin
     * @param new_admin new admin
     * @param contract contract address
     */
    constructor(admin, new_admin, contract) {
        super();
        this.admin = admin;
        this.new_admin = new_admin;
        this.contract = contract;
    }
    static fromAmino(data, isClassic) {
        if (isClassic) {
            const { value: { admin, new_admin, contract }, } = data;
            return new MsgUpdateContractAdmin(admin, new_admin, contract);
        }
        else {
            const { value: { sender, new_admin, contract }, } = data;
            return new MsgUpdateContractAdmin(sender, new_admin, contract);
        }
    }
    toAmino(isClassic) {
        const { admin, new_admin, contract } = this;
        if (isClassic) {
            return {
                type: 'wasm/MsgUpdateContractAdmin',
                value: {
                    admin,
                    new_admin,
                    contract,
                },
            };
        }
        else {
            return {
                type: 'wasm/MsgUpdateAdmin',
                value: {
                    sender: admin,
                    new_admin,
                    contract,
                },
            };
        }
    }
    static fromProto(proto, isClassic) {
        if (isClassic) {
            const p = proto;
            return new MsgUpdateContractAdmin(p.admin, p.newAdmin, p.contract);
        }
        else {
            const p = proto;
            return new MsgUpdateContractAdmin(p.sender, p.newAdmin, p.contract);
        }
    }
    toProto(isClassic) {
        const { admin, new_admin, contract } = this;
        if (isClassic) {
            return tx_1.MsgUpdateContractAdmin.fromPartial({
                admin,
                contract,
                newAdmin: new_admin,
            });
        }
        else {
            return tx_2.MsgUpdateAdmin.fromPartial({
                sender: admin,
                contract,
                newAdmin: new_admin,
            });
        }
    }
    packAny(isClassic) {
        if (isClassic) {
            return any_1.Any.fromPartial({
                typeUrl: '/jmes.wasm.v1beta1.MsgUpdateContractAdmin',
                value: tx_1.MsgUpdateContractAdmin.encode(this.toProto(isClassic)).finish(),
            });
        }
        else {
            return any_1.Any.fromPartial({
                typeUrl: '/cosmwasm.wasm.v1.MsgUpdateAdmin',
                value: tx_2.MsgUpdateAdmin.encode(this.toProto(isClassic)).finish(),
            });
        }
    }
    static unpackAny(msgAny, isClassic) {
        if (isClassic) {
            return MsgUpdateContractAdmin.fromProto(tx_1.MsgUpdateContractAdmin.decode(msgAny.value), isClassic);
        }
        else {
            return MsgUpdateContractAdmin.fromProto(tx_2.MsgUpdateAdmin.decode(msgAny.value), isClassic);
        }
    }
    static fromData(data, isClassic) {
        if (isClassic) {
            const { admin, new_admin, contract } = data;
            return new MsgUpdateContractAdmin(admin, new_admin, contract);
        }
        else {
            const { sender, new_admin, contract } = data;
            return new MsgUpdateContractAdmin(sender, new_admin, contract);
        }
    }
    toData(isClassic) {
        const { admin, new_admin, contract } = this;
        if (isClassic) {
            return {
                '@type': '/jmes.wasm.v1beta1.MsgUpdateContractAdmin',
                admin,
                new_admin,
                contract,
            };
        }
        else {
            return {
                '@type': '/cosmwasm.wasm.v1.MsgUpdateAdmin',
                sender: admin,
                new_admin,
                contract,
            };
        }
    }
}
exports.MsgUpdateContractAdmin = MsgUpdateContractAdmin;
//# sourceMappingURL=MsgUpdateContractAdmin.js.map