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
exports.LazyGradedVestingAccount = void 0;
const json_1 = require("../../util/json");
const BaseVestingAccount_1 = require("./BaseVestingAccount");
const numeric_1 = require("../numeric");
const vesting_1 = require("@terra-money/legacy.proto/terra/vesting/v1beta1/vesting");
const any_1 = require("@terra-money/legacy.proto/google/protobuf/any");
const Long = __importStar(require("long"));
/**
 * Holds information about a Account which has vesting information.
 */
class LazyGradedVestingAccount extends json_1.JSONSerializable {
    /**
     *
     * @param base_vesting_account account information
     * @param vesting_schedules Entries that make up vesting
     */
    constructor(base_vesting_account, vesting_schedules) {
        super();
        this.base_vesting_account = base_vesting_account;
        this.vesting_schedules = vesting_schedules;
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
    toAmino(_) {
        _;
        const { base_vesting_account, vesting_schedules } = this;
        return {
            type: 'core/LazyGradedVestingAccount',
            value: {
                base_vesting_account: base_vesting_account.toAmino().value,
                vesting_schedules: vesting_schedules.map(vs => vs.toAmino()),
            },
        };
    }
    static fromAmino(data, _) {
        _;
        const base_vesting_account = BaseVestingAccount_1.BaseVestingAccount.fromAmino({
            type: 'core/BaseVestingAccount',
            value: data.value.base_vesting_account,
        });
        return new LazyGradedVestingAccount(base_vesting_account, data.value.vesting_schedules.map(vs => LazyGradedVestingAccount.VestingSchedule.fromAmino(vs)));
    }
    toData(_) {
        _;
        const { base_vesting_account, vesting_schedules } = this;
        return {
            '@type': '/terra.vesting.v1beta1.LazyGradedVestingAccount',
            base_vesting_account: base_vesting_account.toData(),
            vesting_schedules: vesting_schedules.map(vs => vs.toData()),
        };
    }
    static fromData(data, _) {
        _;
        const base_vesting_account = BaseVestingAccount_1.BaseVestingAccount.fromData(Object.assign({ '@type': '/cosmos.vesting.v1beta1.BaseVestingAccount' }, data.base_vesting_account));
        return new LazyGradedVestingAccount(base_vesting_account, data.vesting_schedules.map(vs => LazyGradedVestingAccount.VestingSchedule.fromData(vs)));
    }
    toProto(_) {
        _;
        const { base_vesting_account, vesting_schedules } = this;
        return vesting_1.LazyGradedVestingAccount.fromPartial({
            baseVestingAccount: base_vesting_account.toProto(),
            vestingSchedules: vesting_schedules.map(s => s.toProto()),
        });
    }
    static fromProto(lazyGradedVestingAccountProto, _) {
        _;
        const baseVestingAccount = BaseVestingAccount_1.BaseVestingAccount.fromProto(lazyGradedVestingAccountProto.baseVestingAccount);
        return new LazyGradedVestingAccount(baseVestingAccount, lazyGradedVestingAccountProto.vestingSchedules.map(s => this.VestingSchedule.fromProto(s)));
    }
    packAny(isClassic) {
        return any_1.Any.fromPartial({
            typeUrl: '/terra.vesting.v1beta1.LazyGradedVestingAccount',
            value: vesting_1.LazyGradedVestingAccount.encode(this.toProto(isClassic)).finish(),
        });
    }
    static unpackAny(pubkeyAny, isClassic) {
        return LazyGradedVestingAccount.fromProto(vesting_1.LazyGradedVestingAccount.decode(pubkeyAny.value), isClassic);
    }
}
exports.LazyGradedVestingAccount = LazyGradedVestingAccount;
(function (LazyGradedVestingAccount) {
    class VestingSchedule extends json_1.JSONSerializable {
        constructor(denom, schedules) {
            super();
            this.denom = denom;
            this.schedules = schedules;
        }
        toAmino() {
            const { denom, schedules } = this;
            return {
                denom,
                schedules: schedules.map(s => s.toAmino()),
            };
        }
        static fromAmino(data) {
            const { denom, schedules } = data;
            return new VestingSchedule(denom, schedules.map(s => VestingSchedule.Entry.fromAmino(s)));
        }
        toData() {
            const { denom, schedules } = this;
            return {
                denom,
                schedules: schedules.map(s => s.toData()),
            };
        }
        static fromData(data) {
            const { denom, schedules } = data;
            return new VestingSchedule(denom, schedules.map(s => VestingSchedule.Entry.fromData(s)));
        }
        toProto() {
            const { denom, schedules } = this;
            return vesting_1.VestingSchedule.fromPartial({
                denom,
                schedules: schedules.map(s => s.toProto()),
            });
        }
        static fromProto(vestingScheduleProto) {
            return new VestingSchedule(vestingScheduleProto.denom, vestingScheduleProto.schedules.map(s => VestingSchedule.Entry.fromProto(s)));
        }
    }
    LazyGradedVestingAccount.VestingSchedule = VestingSchedule;
    (function (VestingSchedule) {
        class Entry extends json_1.JSONSerializable {
            /**
             *
             * @param start_time Starting time (block height)
             * @param end_time Ending time (block height)
             * @param ratio Ratio (percentage of vested funds that should be released)
             */
            constructor(start_time, end_time, ratio) {
                super();
                this.start_time = start_time;
                this.end_time = end_time;
                this.ratio = ratio;
            }
            static fromAmino(data) {
                const { start_time, end_time, ratio } = data;
                return new Entry(Number.parseInt(start_time), Number.parseInt(end_time), new numeric_1.Dec(ratio));
            }
            toAmino() {
                return {
                    start_time: this.start_time.toFixed(),
                    end_time: this.end_time.toFixed(),
                    ratio: this.ratio.toString(),
                };
            }
            static fromData(data) {
                const { start_time, end_time, ratio } = data;
                return new Entry(Number.parseInt(start_time), Number.parseInt(end_time), new numeric_1.Dec(ratio));
            }
            toData() {
                return {
                    start_time: this.start_time.toFixed(),
                    end_time: this.end_time.toFixed(),
                    ratio: this.ratio.toString(),
                };
            }
            static fromProto(entryProto) {
                return new Entry(entryProto.endTime.toNumber(), entryProto.startTime.toNumber(), new numeric_1.Dec(entryProto.ratio));
            }
            toProto() {
                return vesting_1.Schedule.fromPartial({
                    endTime: Long.fromNumber(this.end_time),
                    ratio: this.ratio.toString(),
                    startTime: Long.fromNumber(this.start_time),
                });
            }
        }
        VestingSchedule.Entry = Entry;
    })(VestingSchedule = LazyGradedVestingAccount.VestingSchedule || (LazyGradedVestingAccount.VestingSchedule = {}));
})(LazyGradedVestingAccount = exports.LazyGradedVestingAccount || (exports.LazyGradedVestingAccount = {}));
//# sourceMappingURL=LazyGradedVestingAccount.js.map