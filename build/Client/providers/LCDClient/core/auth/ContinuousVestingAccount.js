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
exports.ContinuousVestingAccount = void 0;
const json_1 = require("../../util/json");
const BaseVestingAccount_1 = require("./BaseVestingAccount");
const Long = __importStar(require("long"));
const vesting_1 = require("@jmesworld/jmes.proto/src/cosmos/vesting/v1beta1/vesting");
const any_1 = require("@jmesworld/jmes.proto/src/google/protobuf/any");
/**
 * ContinuousVestingAccount implements the VestingAccount interface. It
 * continuously vests by unlocking coins linearly with respect to time.
 */
class ContinuousVestingAccount extends json_1.JSONSerializable {
    /**
     *
     * @param base_vesting_account account information
     * @param start_time vesting start time
     */
    constructor(base_vesting_account, start_time) {
        super();
        this.base_vesting_account = base_vesting_account;
        this.start_time = start_time;
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
        const { base_vesting_account, start_time } = this;
        return {
            type: 'cosmos-sdk/ContinuousVestingAccount',
            value: {
                base_vesting_account: base_vesting_account.toAmino().value,
                start_time: start_time.toFixed(),
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
        return new ContinuousVestingAccount(base_vesting_account, Number.parseInt(data.value.start_time));
    }
    toData(isClassic) {
        if (isClassic) {
            throw new Error('Not supported for the network');
        }
        const { base_vesting_account, start_time } = this;
        return {
            '@type': '/cosmos.vesting.v1beta1.ContinuousVestingAccount',
            base_vesting_account: base_vesting_account.toData(),
            start_time: start_time.toFixed(),
        };
    }
    static fromData(data, isClassic) {
        if (isClassic) {
            throw new Error('Not supported for the network');
        }
        const base_vesting_account = BaseVestingAccount_1.BaseVestingAccount.fromData(Object.assign({ '@type': '/cosmos.vesting.v1beta1.BaseVestingAccount' }, data.base_vesting_account));
        return new ContinuousVestingAccount(base_vesting_account, Number.parseInt(data.start_time));
    }
    toProto(isClassic) {
        if (isClassic) {
            throw new Error('Not supported for the network');
        }
        const { base_vesting_account, start_time } = this;
        return vesting_1.ContinuousVestingAccount.fromPartial({
            baseVestingAccount: base_vesting_account.toProto(),
            startTime: Long.fromNumber(start_time),
        });
    }
    static fromProto(ContinuousVestingAccountProto, isClassic) {
        if (isClassic) {
            throw new Error('Not supported for the network');
        }
        const baseVestingAccount = BaseVestingAccount_1.BaseVestingAccount.fromProto(ContinuousVestingAccountProto.baseVestingAccount);
        return new ContinuousVestingAccount(baseVestingAccount, ContinuousVestingAccountProto.startTime.toNumber());
    }
    packAny(isClassic) {
        if (isClassic) {
            throw new Error('Not supported for the network');
        }
        return any_1.Any.fromPartial({
            typeUrl: '/cosmos.vesting.v1beta1.ContinuousVestingAccount',
            value: vesting_1.ContinuousVestingAccount.encode(this.toProto(isClassic)).finish(),
        });
    }
    static unpackAny(pubkeyAny, isClassic) {
        if (isClassic) {
            throw new Error('Not supported for the network');
        }
        return ContinuousVestingAccount.fromProto(vesting_1.ContinuousVestingAccount.decode(pubkeyAny.value), isClassic);
    }
}
exports.ContinuousVestingAccount = ContinuousVestingAccount;
//# sourceMappingURL=ContinuousVestingAccount.js.map