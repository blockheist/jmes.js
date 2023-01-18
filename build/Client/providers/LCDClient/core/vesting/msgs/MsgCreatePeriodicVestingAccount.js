"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MsgCreatePeriodicVestingAccount = void 0;
const Period_1 = require("../Period");
const json_1 = require("../../../util/json");
const any_1 = require("@terra-money/terra.proto/google/protobuf/any");
const tx_1 = require("@terra-money/terra.proto/cosmos/vesting/v1beta1/tx");
const long_1 = __importDefault(require("long"));
/**
 * CreatePeriodicVestingAccount defines a method that enables creating a periodic vesting account.
 */
class MsgCreatePeriodicVestingAccount extends json_1.JSONSerializable {
    /**
     * @param from_address sender's address
     * @param to_address recipient's address
     */
    constructor(from_address, to_address, start_time, vesting_periods) {
        super();
        this.from_address = from_address;
        this.to_address = to_address;
        this.start_time = start_time;
        this.vesting_periods = vesting_periods;
    }
    static fromAmino(data, isClassic) {
        if (isClassic) {
            throw new Error('Not supported for the network');
        }
        const { value: { from_address, to_address, start_time, vesting_periods }, } = data;
        return new MsgCreatePeriodicVestingAccount(from_address, to_address, Number.parseInt(start_time), vesting_periods.map(p => Period_1.Period.fromAmino(p, isClassic)));
    }
    toAmino(isClassic) {
        if (isClassic) {
            throw new Error('Not supported for the network');
        }
        const { from_address, to_address, start_time, vesting_periods } = this;
        return {
            type: 'cosmos-sdk/MsgCreatePeriodicVestingAccount',
            value: {
                from_address,
                to_address,
                start_time: start_time.toFixed(),
                vesting_periods: vesting_periods.map(p => p.toAmino(isClassic)),
            },
        };
    }
    static fromData(data, isClassic) {
        if (isClassic) {
            throw new Error('Not supported for the network');
        }
        const { from_address, to_address, start_time, vesting_periods } = data;
        return new MsgCreatePeriodicVestingAccount(from_address, to_address, Number.parseInt(start_time), vesting_periods.map(p => Period_1.Period.fromData(p, isClassic)));
    }
    toData(isClassic) {
        if (isClassic) {
            throw new Error('Not supported for the network');
        }
        const { from_address, to_address, start_time, vesting_periods } = this;
        return {
            '@type': '/cosmos.vesting.v1beta1.MsgCreatePeriodicVestingAccount',
            from_address,
            to_address,
            start_time: start_time.toFixed(),
            vesting_periods: vesting_periods.map(p => p.toData(isClassic)),
        };
    }
    static fromProto(proto, isClassic) {
        if (isClassic) {
            throw new Error('Not supported for the network');
        }
        return new MsgCreatePeriodicVestingAccount(proto.fromAddress, proto.toAddress, proto.startTime.toNumber(), proto.vestingPeriods.map(p => Period_1.Period.fromProto(p, isClassic)));
    }
    toProto(isClassic) {
        if (isClassic) {
            throw new Error('Not supported for the network');
        }
        const { from_address, to_address, start_time, vesting_periods } = this;
        return tx_1.MsgCreatePeriodicVestingAccount.fromPartial({
            fromAddress: from_address,
            toAddress: to_address,
            startTime: long_1.default.fromNumber(start_time),
            vestingPeriods: vesting_periods.map(p => p.toProto(isClassic)),
        });
    }
    packAny(isClassic) {
        if (isClassic) {
            throw new Error('Not supported for the network');
        }
        return any_1.Any.fromPartial({
            typeUrl: '/cosmos.vesting.v1beta1.MsgCreatePeriodicVestingAccount',
            value: tx_1.MsgCreatePeriodicVestingAccount.encode(this.toProto(isClassic)).finish(),
        });
    }
    static unpackAny(msgAny, isClassic) {
        if (isClassic) {
            throw new Error('Not supported for the network');
        }
        return MsgCreatePeriodicVestingAccount.fromProto(tx_1.MsgCreatePeriodicVestingAccount.decode(msgAny.value), isClassic);
    }
}
exports.MsgCreatePeriodicVestingAccount = MsgCreatePeriodicVestingAccount;
//# sourceMappingURL=MsgCreatePeriodicVestingAccount.js.map