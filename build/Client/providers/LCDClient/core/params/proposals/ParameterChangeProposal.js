"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParameterChangeProposal = void 0;
const json_1 = require("../../../util/json");
const ParamChange_1 = require("../ParamChange");
const any_1 = require("@terra-money/terra.proto/google/protobuf/any");
const params_1 = require("@terra-money/terra.proto/cosmos/params/v1beta1/params");
/**
 * Describes a proposal for directly altering the value of the module parameters.
 * If you want to select a couple parameters to change for your proposal, you'll first
 * include the subspace (module it belongs to, such as "oracle" or "distribution"), and
 * then just the specific keys that you want to include in your changes as items in a
 * JavaScript object.
 *
 * ```ts
 * import {
 *    Dec,
 *    MsgSubmitProposal,
 *    ParameterChangeProposal
 * } from "@terra-money/terra.js";
 *
 * const proposal = new ParameterChangeProposal("title", "description", {
 *    market: {
 *      minspread: new Dec(0.25),
 *      basepool: new Dec(10000000)
 *    },
 *    staking: {
 *      UnbondingTime: 15000000
 *    }
 * });
 *
 * const msg = new MsgSubmitProposal();
 * ```
 */
class ParameterChangeProposal extends json_1.JSONSerializable {
    /**
     * @param title proposal's title
     * @param description proposal's description
     * @param changes an object whose keys are subspace names, and whose values are objects
     * with objects having for keys and values, the desired parameter changes.
     */
    constructor(title, description, changes) {
        super();
        this.title = title;
        this.description = description;
        if (Array.isArray(changes)) {
            this.changes = ParamChange_1.ParamChanges.fromData(changes);
        }
        else {
            this.changes = changes;
        }
    }
    static fromAmino(data, _) {
        _;
        const { value: { title, description, changes }, } = data;
        return new ParameterChangeProposal(title, description, ParamChange_1.ParamChanges.fromAmino(changes));
    }
    toAmino(isClassic) {
        const { title, description, changes } = this;
        return {
            type: isClassic
                ? 'params/ParameterChangeProposal'
                : 'cosmos-sdk/ParameterChangeProposal',
            value: {
                title,
                description,
                changes: changes.toAmino(),
            },
        };
    }
    static fromData(proto, _) {
        _;
        const { title, description, changes } = proto;
        return new ParameterChangeProposal(title, description, ParamChange_1.ParamChanges.fromData(changes));
    }
    toData(_) {
        _;
        const { title, description, changes } = this;
        return {
            '@type': '/cosmos.params.v1beta1.ParameterChangeProposal',
            title,
            description,
            changes: changes.toData(),
        };
    }
    static fromProto(proto, _) {
        _;
        return new ParameterChangeProposal(proto.title, proto.description, ParamChange_1.ParamChanges.fromProto(proto.changes));
    }
    toProto(_) {
        _;
        const { title, description, changes } = this;
        return params_1.ParameterChangeProposal.fromPartial({
            changes: changes.toProto(),
            description,
            title,
        });
    }
    packAny(isClassic) {
        return any_1.Any.fromPartial({
            typeUrl: '/cosmos.params.v1beta1.ParameterChangeProposal',
            value: params_1.ParameterChangeProposal.encode(this.toProto(isClassic)).finish(),
        });
    }
    static unpackAny(msgAny, isClassic) {
        return ParameterChangeProposal.fromProto(params_1.ParameterChangeProposal.decode(msgAny.value), isClassic);
    }
}
exports.ParameterChangeProposal = ParameterChangeProposal;
//# sourceMappingURL=ParameterChangeProposal.js.map