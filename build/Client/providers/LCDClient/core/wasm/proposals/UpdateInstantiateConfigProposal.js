"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateInstantiateConfigProposal = void 0;
const json_1 = require("../../../util/json");
const any_1 = require("@jmesworld/jmes.proto/src/google/protobuf/any");
const proposal_1 = require("@jmesworld/jmes.proto/cosmwasm/wasm/v1/proposal");
const AccessConfigUpdate_1 = require("../AccessConfigUpdate");
/**
 * UpdateInstantiateConfigProposal gov proposal content type to pin a set of code ids in the
 * wasmvm cache.
 */
class UpdateInstantiateConfigProposal extends json_1.JSONSerializable {
    /**
     * @param title a short summary
     * @param description a human readable text
     * @param access_config_updates the address of the smart access_config_updates
     */
    constructor(title, description, access_config_updates) {
        super();
        this.title = title;
        this.description = description;
        this.access_config_updates = access_config_updates;
    }
    static fromAmino(data, isClassic) {
        if (isClassic) {
            throw new Error('Not supported for the network');
        }
        const { value: { title, description, access_config_updates }, } = data;
        return new UpdateInstantiateConfigProposal(title, description, access_config_updates.map(acu => AccessConfigUpdate_1.AccessConfigUpdate.fromAmino(acu)));
    }
    toAmino(isClassic) {
        if (isClassic) {
            throw new Error('Not supported for the network');
        }
        const { title, description, access_config_updates } = this;
        return {
            type: 'wasm/UpdateInstantiateConfigProposal',
            value: {
                title,
                description,
                access_config_updates: access_config_updates.map(acu => acu.toAmino()),
            },
        };
    }
    static fromProto(proto, isClassic) {
        if (isClassic) {
            throw new Error('Not supported for the network');
        }
        return new UpdateInstantiateConfigProposal(proto.title, proto.description, proto.accessConfigUpdates.map(acu => AccessConfigUpdate_1.AccessConfigUpdate.fromProto(acu)));
    }
    toProto(isClassic) {
        if (isClassic) {
            throw new Error('Not supported for the network');
        }
        const { title, description, access_config_updates } = this;
        return proposal_1.UpdateInstantiateConfigProposal.fromPartial({
            title,
            description,
            accessConfigUpdates: access_config_updates.map(acu => acu.toProto()),
        });
    }
    packAny(isClassic) {
        if (isClassic) {
            throw new Error('Not supported for the network');
        }
        return any_1.Any.fromPartial({
            typeUrl: '/cosmwasm.wasm.v1.UpdateInstantiateConfigProposal',
            value: proposal_1.UpdateInstantiateConfigProposal.encode(this.toProto(isClassic)).finish(),
        });
    }
    static unpackAny(msgAny, isClassic) {
        if (isClassic) {
            throw new Error('Not supported for the network');
        }
        return UpdateInstantiateConfigProposal.fromProto(proposal_1.UpdateInstantiateConfigProposal.decode(msgAny.value), isClassic);
    }
    static fromData(data, isClassic) {
        if (isClassic) {
            throw new Error('Not supported for the network');
        }
        const { title, description, access_config_updates } = data;
        return new UpdateInstantiateConfigProposal(title, description, access_config_updates.map(acu => AccessConfigUpdate_1.AccessConfigUpdate.fromData(acu)));
    }
    toData(isClassic) {
        if (isClassic) {
            throw new Error('Not supported for the network');
        }
        const { title, description, access_config_updates } = this;
        return {
            '@type': '/cosmwasm.wasm.v1.UpdateInstantiateConfigProposal',
            title,
            description,
            access_config_updates: access_config_updates.map(acu => acu.toData()),
        };
    }
}
exports.UpdateInstantiateConfigProposal = UpdateInstantiateConfigProposal;
//# sourceMappingURL=UpdateInstantiateConfigProposal.js.map