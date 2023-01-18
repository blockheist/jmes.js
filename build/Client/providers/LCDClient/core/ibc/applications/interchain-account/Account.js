"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InterchainAccount = void 0;
const account_1 = require("@terra-money/terra.proto/ibc/applications/interchain_accounts/v1/account");
const __1 = require("../../../");
const json_1 = require("../../../../util/json");
/**
 * An InterchainAccount is defined as a BaseAccount & the address of the account owner on the controller chain
 */
class InterchainAccount extends json_1.JSONSerializable {
    /**
     * @param base_account
     * @param account_owner
     */
    constructor(base_account, account_owner) {
        super();
        this.base_account = base_account;
        this.account_owner = account_owner;
    }
    static fromAmino(data) {
        const { base_account, account_owner } = data;
        return new InterchainAccount(base_account ? __1.BaseAccount.fromAmino(base_account) : undefined, account_owner);
    }
    toAmino() {
        const { base_account, account_owner } = this;
        const res = {
            base_account: base_account === null || base_account === void 0 ? void 0 : base_account.toAmino(),
            account_owner,
        };
        return res;
    }
    static fromData(data) {
        const { base_account, account_owner } = data;
        return new InterchainAccount(base_account ? __1.BaseAccount.fromData(base_account) : undefined, account_owner);
    }
    toData() {
        const { base_account, account_owner } = this;
        const res = {
            base_account: base_account === null || base_account === void 0 ? void 0 : base_account.toData(),
            account_owner,
        };
        return res;
    }
    static fromProto(proto) {
        return new InterchainAccount(proto.baseAccount ? __1.BaseAccount.fromProto(proto.baseAccount) : undefined, proto.accountOwner);
    }
    toProto() {
        const { base_account, account_owner } = this;
        return account_1.InterchainAccount.fromPartial({
            baseAccount: base_account === null || base_account === void 0 ? void 0 : base_account.toProto(),
            accountOwner: account_owner,
        });
    }
}
exports.InterchainAccount = InterchainAccount;
//# sourceMappingURL=Account.js.map