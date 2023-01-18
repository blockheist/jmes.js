"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MsgUnjail = void 0;
const json_1 = require("../../../util/json");
const any_1 = require("@terra-money/terra.proto/google/protobuf/any");
const tx_1 = require("@terra-money/terra.proto/cosmos/slashing/v1beta1/tx");
/**
 * A validator can be jailed by the blockchain if misbehavior is detected, such as
 * double-signing or having missed too many vote periods in the Oracle ballot.
 *
 * This is done to protect delegators' funds from getting slashed further, until the
 * validator's issues have been addressed. A jailed validator cannot participate in
 * block rewards, and must be manually unjailed by submitting this message.
 */
class MsgUnjail extends json_1.JSONSerializable {
    /**
     * @param address validator's operator address
     */
    constructor(address) {
        super();
        this.address = address;
    }
    static fromAmino(data, _) {
        _;
        const { value: { address }, } = data;
        return new MsgUnjail(address);
    }
    toAmino(isClassic) {
        const { address } = this;
        return {
            type: isClassic ? 'slashing/MsgUnjail' : 'cosmos-sdk/MsgUnjail',
            value: {
                address,
            },
        };
    }
    static fromData(proto, _) {
        _;
        const { address } = proto;
        return new MsgUnjail(address);
    }
    toData(_) {
        _;
        const { address } = this;
        return {
            '@type': '/cosmos.slashing.v1beta1.MsgUnjail',
            address,
        };
    }
    static fromProto(proto, _) {
        _;
        return new MsgUnjail(proto.validatorAddr);
    }
    toProto(_) {
        _;
        const { address } = this;
        return tx_1.MsgUnjail.fromPartial({
            validatorAddr: address,
        });
    }
    packAny(isClassic) {
        return any_1.Any.fromPartial({
            typeUrl: '/cosmos.slashing.v1beta1.MsgUnjail',
            value: tx_1.MsgUnjail.encode(this.toProto(isClassic)).finish(),
        });
    }
    static unpackAny(msgAny, isClassic) {
        return MsgUnjail.fromProto(tx_1.MsgUnjail.decode(msgAny.value), isClassic);
    }
}
exports.MsgUnjail = MsgUnjail;
//# sourceMappingURL=MsgUnjail.js.map