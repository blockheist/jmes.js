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
exports.BaseVestingAccount = void 0;
const json_1 = require("../../util/json");
const Coins_1 = require("../Coins");
const BaseAccount_1 = require("./BaseAccount");
const vesting_1 = require("@jmesworld/jmes.proto/src/cosmos/vesting/v1beta1/vesting");
const Long = __importStar(require("long"));
/**
 * Holds information about a Account which has vesting information.
 */
class BaseVestingAccount extends json_1.JSONSerializable {
    /**
     *
     * @param base_account account information
     * @param original_vesting initial vesting amount
     * @param delegated_free
     * @param delegated_vesting
     * @param end_time
     */
    constructor(base_account, original_vesting, delegated_free, delegated_vesting, end_time) {
        super();
        this.base_account = base_account;
        this.original_vesting = original_vesting;
        this.delegated_free = delegated_free;
        this.delegated_vesting = delegated_vesting;
        this.end_time = end_time;
    }
    getAccountNumber() {
        return this.base_account.account_number;
    }
    getSequenceNumber() {
        return this.base_account.sequence;
    }
    getPublicKey() {
        return this.base_account.public_key;
    }
    toAmino(isClassic) {
        const { base_account, original_vesting, delegated_free, delegated_vesting, end_time, } = this;
        return {
            type: isClassic
                ? 'core/BaseVestingAccount'
                : 'cosmos-sdk/BaseVestingAccount',
            value: {
                base_account: base_account.toAmino().value,
                delegated_free: delegated_free.toAmino(),
                delegated_vesting: delegated_vesting.toAmino(),
                end_time: end_time.toFixed(),
                original_vesting: original_vesting.toAmino(),
            },
        };
    }
    static fromAmino(amino, isClassic) {
        const base_account = BaseAccount_1.BaseAccount.fromAmino({
            type: isClassic ? 'core/Account' : 'cosmos-sdk/BaseAccount',
            value: amino.value.base_account,
        });
        return new BaseVestingAccount(base_account, Coins_1.Coins.fromAmino(amino.value.original_vesting), Coins_1.Coins.fromAmino(amino.value.delegated_free), Coins_1.Coins.fromAmino(amino.value.delegated_vesting), Number.parseInt(amino.value.end_time));
    }
    toData(_) {
        _;
        const { base_account, original_vesting, delegated_free, delegated_vesting, end_time, } = this;
        return {
            '@type': '/cosmos.vesting.v1beta1.BaseVestingAccount',
            base_account: base_account.toData(),
            delegated_free: delegated_free.toData(),
            delegated_vesting: delegated_vesting.toData(),
            end_time: end_time.toFixed(),
            original_vesting: original_vesting.toData(),
        };
    }
    static fromData(data, _) {
        _;
        const base_account = BaseAccount_1.BaseAccount.fromData(Object.assign({ '@type': '/cosmos.auth.v1beta1.BaseAccount' }, data.base_account));
        return new BaseVestingAccount(base_account, Coins_1.Coins.fromData(data.original_vesting), Coins_1.Coins.fromData(data.delegated_free), Coins_1.Coins.fromData(data.delegated_vesting), Number.parseInt(data.end_time));
    }
    toProto(_) {
        _;
        const { base_account, original_vesting, delegated_free, delegated_vesting, end_time, } = this;
        return vesting_1.BaseVestingAccount.fromPartial({
            baseAccount: base_account.toProto(),
            delegatedFree: delegated_free.toProto(),
            delegatedVesting: delegated_vesting.toProto(),
            endTime: Long.fromNumber(end_time),
            originalVesting: original_vesting.toProto(),
        });
    }
    static fromProto(proto, _) {
        _;
        const baseAccount = BaseAccount_1.BaseAccount.fromProto(proto.baseAccount);
        return new BaseVestingAccount(baseAccount, Coins_1.Coins.fromProto(proto.originalVesting), Coins_1.Coins.fromProto(proto.delegatedFree), Coins_1.Coins.fromProto(proto.delegatedVesting), proto.endTime.toNumber());
    }
}
exports.BaseVestingAccount = BaseVestingAccount;
//# sourceMappingURL=BaseVestingAccount.js.map