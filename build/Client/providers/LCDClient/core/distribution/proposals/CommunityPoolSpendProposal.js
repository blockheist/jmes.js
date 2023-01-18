"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommunityPoolSpendProposal = void 0;
const json_1 = require("../../../util/json");
const Coins_1 = require("../../Coins");
const any_1 = require("@terra-money/legacy.proto/google/protobuf/any");
// there's no difference between two protos
// import { CommunityPoolSpendProposal as CommunityPoolSpendProposal_legacy_pb } from '@terra-money/legacy.proto/cosmos/distribution/v1beta1/distribution';
const distribution_1 = require("@terra-money/terra.proto/cosmos/distribution/v1beta1/distribution");
/**
 * Proposal that disburses funds from the Distribution module's community pool to the
 * specified recipient if passed.
 */
class CommunityPoolSpendProposal extends json_1.JSONSerializable {
    /**
     * @param title proposal's title
     * @param description proposal's description
     * @param recipient recipient address
     * @param amount amount to give recipient
     */
    constructor(title, description, recipient, amount) {
        super();
        this.title = title;
        this.description = description;
        this.recipient = recipient;
        this.amount = new Coins_1.Coins(amount);
    }
    static fromAmino(data, _) {
        _;
        const { value: { title, description, recipient, amount }, } = data;
        return new CommunityPoolSpendProposal(title, description, recipient, Coins_1.Coins.fromAmino(amount));
    }
    toAmino(isClassic) {
        const { title, description, recipient, amount } = this;
        return {
            type: isClassic
                ? 'distribution/CommunityPoolSpendProposal'
                : 'cosmos-sdk/CommunityPoolSpendProposal',
            value: {
                title,
                description,
                recipient,
                amount: amount.toAmino(),
            },
        };
    }
    static fromData(data, _) {
        _;
        const { title, description, recipient, amount } = data;
        return new CommunityPoolSpendProposal(title, description, recipient, Coins_1.Coins.fromData(amount));
    }
    toData(_) {
        _;
        const { title, description, recipient, amount } = this;
        return {
            '@type': '/cosmos.distribution.v1beta1.CommunityPoolSpendProposal',
            title,
            description,
            recipient,
            amount: amount.toData(),
        };
    }
    static fromProto(proto, _) {
        _;
        return new CommunityPoolSpendProposal(proto.title, proto.description, proto.recipient, Coins_1.Coins.fromProto(proto.amount));
    }
    toProto(_) {
        _;
        const { title, description, recipient, amount } = this;
        return distribution_1.CommunityPoolSpendProposal.fromPartial({
            amount: amount.toProto(),
            description,
            recipient,
            title,
        });
    }
    packAny(isClassic) {
        return any_1.Any.fromPartial({
            typeUrl: '/cosmos.distribution.v1beta1.CommunityPoolSpendProposal',
            value: distribution_1.CommunityPoolSpendProposal.encode(this.toProto(isClassic)).finish(),
        });
    }
    static unpackAny(msgAny, isClassic) {
        return CommunityPoolSpendProposal.fromProto(distribution_1.CommunityPoolSpendProposal.decode(msgAny.value), isClassic);
    }
}
exports.CommunityPoolSpendProposal = CommunityPoolSpendProposal;
//# sourceMappingURL=CommunityPoolSpendProposal.js.map