"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DelayedVestingAccount = void 0;
const json_1 = require("../../util/json");
const BaseVestingAccount_1 = require("./BaseVestingAccount");
const vesting_1 = require("@jmesworld/jmes.proto/src/cosmos/vesting/v1beta1/vesting");
const any_1 = require("@jmesworld/jmes.proto/src/google/protobuf/any");
/**
 * DelayedVestingAccount implements the VestingAccount interface. It vests all
 * coins after a specific time, but non prior. In other words, it keeps them
 * locked until a specified time.
 */
class DelayedVestingAccount extends json_1.JSONSerializable {
    /**
     *
     * @param base_vesting_account account information
     */
    constructor(base_vesting_account) {
        super();
        this.base_vesting_account = base_vesting_account;
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
        const { base_vesting_account } = this;
        return {
            type: 'cosmos-sdk/DelayedVestingAccount',
            value: {
                base_vesting_account: base_vesting_account.toAmino().value,
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
        return new DelayedVestingAccount(base_vesting_account);
    }
    toData(isClassic) {
        if (isClassic) {
            throw new Error('Not supported for the network');
        }
        const { base_vesting_account } = this;
        return {
            '@type': '/cosmos.vesting.v1beta1.DelayedVestingAccount',
            base_vesting_account: base_vesting_account.toData(),
        };
    }
    static fromData(data, isClassic) {
        const base_vesting_account = BaseVestingAccount_1.BaseVestingAccount.fromData(Object.assign({ '@type': '/cosmos.vesting.v1beta1.BaseVestingAccount' }, data.base_vesting_account));
        if (isClassic) {
            throw new Error('Not supported for the network');
        }
        return new DelayedVestingAccount(base_vesting_account);
    }
    toProto(isClassic) {
        if (isClassic) {
            throw new Error('Not supported for the network');
        }
        const { base_vesting_account } = this;
        return vesting_1.DelayedVestingAccount.fromPartial({
            baseVestingAccount: base_vesting_account.toProto(),
        });
    }
    static fromProto(DelayedVestingAccountProto, isClassic) {
        const baseVestingAccount = BaseVestingAccount_1.BaseVestingAccount.fromProto(DelayedVestingAccountProto.baseVestingAccount);
        if (isClassic) {
            throw new Error('Not supported for the network');
        }
        return new DelayedVestingAccount(baseVestingAccount);
    }
    packAny(isClassic) {
        if (isClassic) {
            throw new Error('Not supported for the network');
        }
        return any_1.Any.fromPartial({
            typeUrl: '/cosmos.vesting.v1beta1.DelayedVestingAccount',
            value: vesting_1.DelayedVestingAccount.encode(this.toProto(isClassic)).finish(),
        });
    }
    static unpackAny(pubkeyAny, isClassic) {
        if (isClassic) {
            throw new Error('Not supported for the network');
        }
        return DelayedVestingAccount.fromProto(vesting_1.DelayedVestingAccount.decode(pubkeyAny.value), isClassic);
    }
}
exports.DelayedVestingAccount = DelayedVestingAccount;
//# sourceMappingURL=DelayedVestingAccount.js.map