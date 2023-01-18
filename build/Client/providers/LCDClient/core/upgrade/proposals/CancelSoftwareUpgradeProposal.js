"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CancelSoftwareUpgradeProposal = void 0;
const json_1 = require("../../../util/json");
const any_1 = require("@terra-money/legacy.proto/google/protobuf/any");
const upgrade_1 = require("@terra-money/legacy.proto/cosmos/upgrade/v1beta1/upgrade");
/**
 *  CancelSoftwareUpgradeProposal is a gov Content type for cancelling a software upgrade
 */
class CancelSoftwareUpgradeProposal extends json_1.JSONSerializable {
    /**
     *
     * @param title
     * @param description
     */
    constructor(title, description) {
        super();
        this.title = title;
        this.description = description;
    }
    static fromAmino(data, _) {
        _;
        const { value: { title, description }, } = data;
        return new CancelSoftwareUpgradeProposal(title, description);
    }
    toAmino(isClassic) {
        const { title, description } = this;
        return {
            type: isClassic
                ? 'upgrade/CancelSoftwareUpgradeProposal'
                : 'cosmos-sdk/CancelSoftwareUpgradeProposal',
            value: {
                title,
                description,
            },
        };
    }
    static fromData(data, _) {
        _;
        const { title, description } = data;
        return new CancelSoftwareUpgradeProposal(title, description);
    }
    toData(_) {
        _;
        const { title, description } = this;
        return {
            '@type': '/cosmos.upgrade.v1beta1.CancelSoftwareUpgradeProposal',
            title,
            description,
        };
    }
    static fromProto(proto, _) {
        _;
        return new CancelSoftwareUpgradeProposal(proto.title, proto.description);
    }
    toProto(_) {
        _;
        const { title, description } = this;
        return upgrade_1.CancelSoftwareUpgradeProposal.fromPartial({
            title,
            description,
        });
    }
    packAny(isClassic) {
        return any_1.Any.fromPartial({
            typeUrl: '/cosmos.upgrade.v1beta1.CancelSoftwareUpgradeProposal',
            value: upgrade_1.CancelSoftwareUpgradeProposal.encode(this.toProto(isClassic)).finish(),
        });
    }
    static unpackAny(msgAny, isClassic) {
        return CancelSoftwareUpgradeProposal.fromProto(upgrade_1.CancelSoftwareUpgradeProposal.decode(msgAny.value), isClassic);
    }
}
exports.CancelSoftwareUpgradeProposal = CancelSoftwareUpgradeProposal;
//# sourceMappingURL=CancelSoftwareUpgradeProposal.js.map