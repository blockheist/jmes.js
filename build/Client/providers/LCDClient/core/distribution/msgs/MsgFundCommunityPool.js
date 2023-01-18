"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MsgFundCommunityPool = void 0;
const json_1 = require("../../../util/json");
const Coins_1 = require("../../Coins");
const any_1 = require("@terra-money/terra.proto/google/protobuf/any");
// there's no difference between two protos
// import { MsgFundCommunityPool as MsgFundCommunityPool_legacy_pb } from '@terra-money/legacy.proto/cosmos/distribution/v1beta1/tx';
const tx_1 = require("@terra-money/terra.proto/cosmos/distribution/v1beta1/tx");
class MsgFundCommunityPool extends json_1.JSONSerializable {
    /**
     * @param depositor depositor's account address
     * @param amount coins to fund the community pool
     */
    constructor(depositor, amount) {
        super();
        this.depositor = depositor;
        this.amount = new Coins_1.Coins(amount);
    }
    static fromAmino(data, _) {
        const { value: { depositor, amount }, } = data;
        _;
        return new MsgFundCommunityPool(depositor, Coins_1.Coins.fromAmino(amount));
    }
    toAmino(isClassic) {
        const { depositor, amount } = this;
        return {
            type: isClassic
                ? 'distribution/MsgFundCommunityPool'
                : 'cosmos-sdk/MsgFundCommunityPool',
            value: {
                depositor,
                amount: amount.toAmino(),
            },
        };
    }
    static fromData(proto, _) {
        _;
        const { depositor, amount } = proto;
        return new MsgFundCommunityPool(depositor, Coins_1.Coins.fromData(amount));
    }
    toData(_) {
        _;
        const { depositor, amount } = this;
        return {
            '@type': '/cosmos.distribution.v1beta1.MsgFundCommunityPool',
            depositor,
            amount: amount.toData(),
        };
    }
    static fromProto(proto, _) {
        _;
        return new MsgFundCommunityPool(proto.depositor, Coins_1.Coins.fromProto(proto.amount));
    }
    toProto(_) {
        _;
        const { depositor, amount } = this;
        return tx_1.MsgFundCommunityPool.fromPartial({
            amount: amount.toProto(),
            depositor,
        });
    }
    packAny(isClassic) {
        return any_1.Any.fromPartial({
            typeUrl: '/cosmos.distribution.v1beta1.MsgFundCommunityPool',
            value: tx_1.MsgFundCommunityPool.encode(this.toProto(isClassic)).finish(),
        });
    }
    static unpackAny(msgAny, isClassic) {
        return MsgFundCommunityPool.fromProto(tx_1.MsgFundCommunityPool.decode(msgAny.value), isClassic);
    }
}
exports.MsgFundCommunityPool = MsgFundCommunityPool;
//# sourceMappingURL=MsgFundCommunityPool.js.map