"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Wallet = void 0;
const signing_1 = require("@terra-money/legacy.proto/cosmos/tx/signing/v1beta1/signing");
const signing_2 = require("@jmesworld/jmes.proto/src/cosmos/tx/signing/v1beta1/signing");
class Wallet {
    constructor(lcd, key) {
        this.lcd = lcd;
        this.key = key;
    }
    accountNumberAndSequence() {
        return this.lcd.auth.accountInfo(this.key.accAddress).then(d => {
            return {
                account_number: d.getAccountNumber(),
                sequence: d.getSequenceNumber(),
            };
        });
    }
    accountNumber() {
        return this.lcd.auth.accountInfo(this.key.accAddress).then(d => {
            return d.getAccountNumber();
        });
    }
    sequence() {
        return this.lcd.auth.accountInfo(this.key.accAddress).then(d => {
            return d.getSequenceNumber();
        });
    }
    createTx(options) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.lcd.tx.create([
                {
                    address: this.key.accAddress,
                    sequenceNumber: options.sequence,
                    publicKey: this.key.publicKey,
                },
            ], options);
        });
    }
    createAndSignTx(options) {
        return __awaiter(this, void 0, void 0, function* () {
            let accountNumber = options.accountNumber;
            let sequence = options.sequence;
            if (accountNumber === undefined || sequence === undefined) {
                const res = yield this.accountNumberAndSequence();
                if (accountNumber === undefined) {
                    accountNumber = res.account_number;
                }
                if (sequence === undefined) {
                    sequence = res.sequence;
                }
            }
            options.sequence = sequence;
            options.accountNumber = accountNumber;
            console.log(this.lcd.config.chainID);
            const tx = yield this.createTx(options); // don't need isClassic because lcd already have it
            return this.key.signTx(tx, {
                accountNumber,
                sequence,
                chainID: this.lcd.config.chainID,
                signMode: options.signMode ||
                    (this.lcd.config.isClassic
                        ? signing_1.SignMode.SIGN_MODE_DIRECT
                        : signing_2.SignMode.SIGN_MODE_DIRECT),
            }, this.lcd.config.isClassic);
        });
    }
}
exports.Wallet = Wallet;
//# sourceMappingURL=Wallet.js.map