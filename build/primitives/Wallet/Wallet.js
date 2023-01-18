"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Wallet = void 0;
const Account_1 = require("../Account");
class Wallet {
    constructor(chainDerivedKey, lcdcUrl) {
        this.chainDerivedKey = chainDerivedKey;
        this.lcdcUrl = lcdcUrl !== null && lcdcUrl !== void 0 ? lcdcUrl : null;
    }
    getAccount(index = 0) {
        return new Account_1.Account(this.chainDerivedKey, index, this.lcdcUrl);
    }
    signMessage(message) {
        console.log({ message });
    }
    broadcastSignedMessage(signedMessage) {
        console.log({ signedMessage });
    }
}
exports.Wallet = Wallet;
;
//# sourceMappingURL=Wallet.js.map