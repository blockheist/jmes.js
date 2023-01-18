"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MsgDonateAllVestingTokens = void 0;
const json_1 = require("../../../util/json");
const any_1 = require("@terra-money/terra.proto/google/protobuf/any");
const tx_1 = require("@terra-money/terra.proto/cosmos/vesting/v1beta1/tx");
/**
 * DonateAllVestingTokens defines a method that enables donating all vesting
 */
class MsgDonateAllVestingTokens extends json_1.JSONSerializable {
    /**
     * @param from_address donor's address
     */
    constructor(from_address) {
        super();
        this.from_address = from_address;
    }
    static fromAmino(data, isClassic) {
        if (isClassic) {
            throw new Error('Not supported for the network');
        }
        return new MsgDonateAllVestingTokens(data.value.from_address);
    }
    toAmino(isClassic) {
        if (isClassic) {
            throw new Error('Not supported for the network');
        }
        return {
            type: 'cosmos-sdk/MsgDonateAllVestingTokens',
            value: {
                from_address: this.from_address,
            },
        };
    }
    static fromData(data, isClassic) {
        if (isClassic) {
            throw new Error('Not supported for the network');
        }
        return new MsgDonateAllVestingTokens(data.from_address);
    }
    toData(isClassic) {
        if (isClassic) {
            throw new Error('Not supported for the network');
        }
        return {
            '@type': '/cosmos.vesting.v1beta1.MsgDonateAllVestingTokens',
            from_address: this.from_address,
        };
    }
    static fromProto(proto, isClassic) {
        if (isClassic) {
            throw new Error('Not supported for the network');
        }
        return new MsgDonateAllVestingTokens(proto.fromAddress);
    }
    toProto(isClassic) {
        if (isClassic) {
            throw new Error('Not supported for the network');
        }
        return tx_1.MsgDonateAllVestingTokens.fromPartial({
            fromAddress: this.from_address,
        });
    }
    packAny(isClassic) {
        if (isClassic) {
            throw new Error('Not supported for the network');
        }
        return any_1.Any.fromPartial({
            typeUrl: '/cosmos.vesting.v1beta1.MsgDonateAllVestingTokens',
            value: tx_1.MsgDonateAllVestingTokens.encode(this.toProto(isClassic)).finish(),
        });
    }
    static unpackAny(msgAny, isClassic) {
        if (isClassic) {
            throw new Error('Not supported for the network');
        }
        return MsgDonateAllVestingTokens.fromProto(tx_1.MsgDonateAllVestingTokens.decode(msgAny.value), isClassic);
    }
}
exports.MsgDonateAllVestingTokens = MsgDonateAllVestingTokens;
//# sourceMappingURL=MsgDonateAllVestingTokens.js.map