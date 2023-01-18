"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextProposal = void 0;
const json_1 = require("../../../util/json");
const any_1 = require("@terra-money/terra.proto/google/protobuf/any");
const gov_1 = require("@terra-money/terra.proto/cosmos/gov/v1beta1/gov");
/**
 * Basic proposal which describes the candidate proposition that must be put into effect
 * manually if passed. Used as a general-purpose way of discovering community's
 * sentiment / interest for an arbitrary change.
 */
class TextProposal extends json_1.JSONSerializable {
    /**
     * @param title proposal's title
     * @param description proposal's description
     */
    constructor(title, description) {
        super();
        this.title = title;
        this.description = description;
    }
    static fromAmino(data, _) {
        _;
        const { value: { title, description }, } = data;
        return new TextProposal(title, description);
    }
    toAmino(isClassic) {
        const { title, description } = this;
        return {
            type: isClassic ? 'gov/TextProposal' : 'cosmos-sdk/TextProposal',
            value: {
                title,
                description,
            },
        };
    }
    static fromData(proto, _) {
        _;
        const { title, description } = proto;
        return new TextProposal(title, description);
    }
    toData(_) {
        _;
        const { title, description } = this;
        return {
            '@type': '/cosmos.gov.v1beta1.TextProposal',
            title,
            description,
        };
    }
    static fromProto(proto, _) {
        _;
        return new TextProposal(proto.title, proto.description);
    }
    toProto(_) {
        _;
        const { title, description } = this;
        return gov_1.TextProposal.fromPartial({
            description,
            title,
        });
    }
    packAny(isClassic) {
        return any_1.Any.fromPartial({
            typeUrl: '/cosmos.gov.v1beta1.TextProposal',
            value: gov_1.TextProposal.encode(this.toProto(isClassic)).finish(),
        });
    }
    static unpackAny(msgAny, isClassic) {
        return TextProposal.fromProto(gov_1.TextProposal.decode(msgAny.value), isClassic);
    }
}
exports.TextProposal = TextProposal;
//# sourceMappingURL=TextProposal.js.map