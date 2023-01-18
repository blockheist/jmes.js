"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SoftwareUpgradeProposal = void 0;
const json_1 = require("../../../util/json");
const any_1 = require("@terra-money/legacy.proto/google/protobuf/any");
const upgrade_1 = require("@terra-money/legacy.proto/cosmos/upgrade/v1beta1/upgrade");
const Plan_1 = require("../Plan");
/**
 * Softwareupgradeproposal is a gov Content type for initiating a software upgrade.
 */
class SoftwareUpgradeProposal extends json_1.JSONSerializable {
    /**
     *
     * @param title
     * @param description
     * @param plan
     */
    constructor(title, description, plan) {
        super();
        this.title = title;
        this.description = description;
        this.plan = plan;
    }
    static fromAmino(data, _) {
        _;
        const { value: { title, description, plan }, } = data;
        return new SoftwareUpgradeProposal(title, description, plan ? Plan_1.Plan.fromAmino(plan) : undefined);
    }
    toAmino(isClassic) {
        const { title, description, plan } = this;
        return {
            type: isClassic
                ? 'upgrade/SoftwareUpgradeProposal'
                : 'cosmos-sdk/SoftwareUpgradeProposal',
            value: {
                title,
                description,
                plan: plan ? plan.toAmino() : undefined,
            },
        };
    }
    static fromData(data, _) {
        _;
        const { title, description, plan } = data;
        return new SoftwareUpgradeProposal(title, description, plan ? Plan_1.Plan.fromData(plan) : undefined);
    }
    toData(_) {
        _;
        const { title, description, plan } = this;
        return {
            '@type': '/cosmos.upgrade.v1beta1.SoftwareUpgradeProposal',
            title,
            description,
            plan: plan ? plan.toData() : undefined,
        };
    }
    static fromProto(proto, _) {
        _;
        return new SoftwareUpgradeProposal(proto.title, proto.description, proto.plan ? Plan_1.Plan.fromProto(proto.plan) : undefined);
    }
    toProto(_) {
        _;
        const { title, description, plan } = this;
        return upgrade_1.SoftwareUpgradeProposal.fromPartial({
            title,
            description,
            plan: plan ? plan.toProto() : undefined,
        });
    }
    packAny(isClassic) {
        return any_1.Any.fromPartial({
            typeUrl: '/cosmos.upgrade.v1beta1.SoftwareUpgradeProposal',
            value: upgrade_1.SoftwareUpgradeProposal.encode(this.toProto(isClassic)).finish(),
        });
    }
    static unpackAny(msgAny, isClassic) {
        return SoftwareUpgradeProposal.fromProto(upgrade_1.SoftwareUpgradeProposal.decode(msgAny.value), isClassic);
    }
}
exports.SoftwareUpgradeProposal = SoftwareUpgradeProposal;
//# sourceMappingURL=SoftwareUpgradeProposal.js.map