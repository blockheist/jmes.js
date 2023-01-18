"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PeriodicVestingAccount = void 0;
const json_1 = require("../../util/json");
const BaseVestingAccount_1 = require("./BaseVestingAccount");
const Coins_1 = require("../Coins");
const vesting_1 = require("@jmesworld/jmes.proto/src/cosmos/vesting/v1beta1/vesting");
const any_1 = require("@jmesworld/jmes.proto/src/google/protobuf/any");
const Long = __importStar(require("long"));
/**
 * PeriodicVestingAccount implements the VestingAccount interface. It
 * periodically vests by unlocking coins during each specified period.
 */
class PeriodicVestingAccount extends json_1.JSONSerializable {
    /**
     *
     * @param base_vesting_account account information
     * @param start_time vesting start time
     * @param vesting_periods vesting period entries
     */
    constructor(base_vesting_account, start_time, vesting_periods) {
        super();
        this.base_vesting_account = base_vesting_account;
        this.start_time = start_time;
        this.vesting_periods = vesting_periods;
    }
    getAccountNumber() {
        return this.base_vesting_account.getAccountNumber();
    }
    getSequenceNumber() {
        return this.base_vesting_account.getSequenceNumber();
    }
    getPublicKey() {
        return this.base_vesting_account.base_account.public_key;
    }
    toAmino(isClassic) {
        if (isClassic) {
            throw new Error('Not supported for the network');
        }
        const { base_vesting_account, start_time, vesting_periods } = this;
        return {
            type: 'cosmos-sdk/PeriodicVestingAccount',
            value: {
                base_vesting_account: base_vesting_account.toAmino().value,
                start_time: start_time.toFixed(),
                vesting_periods: vesting_periods.map(vs => vs.toAmino()),
            },
        };
    }
    static fromAmino(data, isClassic) {
        const base_vesting_account = BaseVestingAccount_1.BaseVestingAccount.fromAmino({
            type: 'cosmos-sdk/BaseVestingAccount',
            value: data.value.base_vesting_account,
        });
        if (isClassic) {
            throw new Error('Not supported for the network');
        }
        return new PeriodicVestingAccount(base_vesting_account, Number.parseInt(data.value.start_time), data.value.vesting_periods.map(vs => PeriodicVestingAccount.Period.fromAmino(vs)));
    }
    toData(isClassic) {
        if (isClassic) {
            throw new Error('Not supported for the network');
        }
        const { base_vesting_account, start_time, vesting_periods } = this;
        return {
            '@type': '/cosmos.vesting.v1beta1.PeriodicVestingAccount',
            base_vesting_account: base_vesting_account.toData(),
            start_time: start_time.toFixed(),
            vesting_periods: vesting_periods.map(vs => vs.toData()),
        };
    }
    static fromData(data, isClassic) {
        const base_vesting_account = BaseVestingAccount_1.BaseVestingAccount.fromData(Object.assign({ '@type': '/cosmos.vesting.v1beta1.BaseVestingAccount' }, data.base_vesting_account));
        if (isClassic) {
            throw new Error('Not supported for the network');
        }
        return new PeriodicVestingAccount(base_vesting_account, Number.parseInt(data.start_time), data.vesting_periods.map(vs => PeriodicVestingAccount.Period.fromData(vs)));
    }
    toProto(isClassic) {
        if (isClassic) {
            throw new Error('Not supported for the network');
        }
        const { base_vesting_account, vesting_periods } = this;
        return vesting_1.PeriodicVestingAccount.fromPartial({
            baseVestingAccount: base_vesting_account.toProto(),
            vestingPeriods: vesting_periods.map(s => s.toProto()),
        });
    }
    static fromProto(proto, isClassic) {
        if (isClassic) {
            throw new Error('Not supported for the network');
        }
        const baseVestingAccount = BaseVestingAccount_1.BaseVestingAccount.fromProto(proto.baseVestingAccount);
        return new PeriodicVestingAccount(baseVestingAccount, proto.startTime.toNumber(), proto.vestingPeriods.map(s => this.Period.fromProto(s)));
    }
    packAny(isClassic) {
        if (isClassic) {
            throw new Error('Not supported for the network');
        }
        return any_1.Any.fromPartial({
            typeUrl: '/cosmos.vesting.v1beta1.PeriodicVestingAccount',
            value: vesting_1.PeriodicVestingAccount.encode(this.toProto(isClassic)).finish(),
        });
    }
    static unpackAny(pubkeyAny, isClassic) {
        if (isClassic) {
            throw new Error('Not supported for the network');
        }
        return PeriodicVestingAccount.fromProto(vesting_1.PeriodicVestingAccount.decode(pubkeyAny.value), isClassic);
    }
}
exports.PeriodicVestingAccount = PeriodicVestingAccount;
(function (PeriodicVestingAccount) {
    class Period extends json_1.JSONSerializable {
        constructor(length, amount) {
            super();
            this.length = length;
            this.amount = amount;
        }
        toAmino() {
            const { length, amount } = this;
            return {
                length: length.toFixed(),
                amount: amount.toAmino(),
            };
        }
        static fromAmino(data) {
            const { length, amount } = data;
            return new Period(Number.parseInt(length), Coins_1.Coins.fromAmino(amount));
        }
        toData() {
            const { length, amount } = this;
            return {
                length: length.toFixed(),
                amount: amount.toData(),
            };
        }
        static fromData(data) {
            const { length, amount } = data;
            return new Period(Number.parseInt(length), Coins_1.Coins.fromData(amount));
        }
        toProto() {
            const { length, amount } = this;
            return vesting_1.Period.fromPartial({
                length: Long.fromNumber(length),
                amount: amount.toProto(),
            });
        }
        static fromProto(proto) {
            return new Period(proto.length.toNumber(), Coins_1.Coins.fromProto(proto.amount));
        }
    }
    PeriodicVestingAccount.Period = Period;
})(PeriodicVestingAccount = exports.PeriodicVestingAccount || (exports.PeriodicVestingAccount = {}));
//# sourceMappingURL=PeriodicVestingAccount.js.map