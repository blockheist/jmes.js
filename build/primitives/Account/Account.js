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
exports.Account = void 0;
const elliptic = __importStar(require("elliptic"));
const core_1 = require("../../Client/providers/LCDClient/core");
const key_1 = require("../../Client/providers/LCDClient/key");
const LCDClient_1 = require("../../Client/providers/LCDClient/lcd/LCDClient");
class Account {
    constructor(key, accountIndex = 0, lcdcUrl) {
        this.lcdc = null;
        this.lcdcUrl = lcdcUrl !== null && lcdcUrl !== void 0 ? lcdcUrl : 'http://51.38.52.37:1317';
        // this.privateKey = key.derivePath(`m/0/${index}`);
        // this.derivableAccountKey = key;
        this.derivableAccountKey = key.derivePath(`m/${accountIndex}'`);
        // this.test = key.derivePath(`m/${accountIndex}'/0/0`).toAddress();
        // this.test2 = key.derivePath(`m/${accountIndex}'`).derivePath('m/0/0').toAddress();
        this.accountIndex = accountIndex;
    }
    getAddress(index = 0) {
        return this.derivableAccountKey.derivePath(`m/0/${index}`).toAddress();
        // return this.derivableAccountKey.toAddress();
    }
    getPrivate(index = 0) {
        return this.derivableAccountKey.derivePath(`m/0/${index}`).toPrivate();
    }
    getPublic(index = 0) {
        return this.derivableAccountKey.derivePath(`m/0/${index}`).toPublic();
    }
    signMessage(message, index = 0) {
        const privateKey = this.getPrivate(index);
        const ec = new elliptic.ec('secp256k1');
        const key = ec.keyFromPrivate(privateKey);
        const sign = key.sign(message.toString()).toDER();
        // @ts-ignore
        return Buffer.from(sign);
    }
    verifySignature(signature, message, publicKey) {
        const ec = new elliptic.ec('secp256k1');
        let isValid = false;
        if (!publicKey) {
            throw new Error('Expected publicKey');
        }
        // We verify a publicKey
        const pubKey = ec.keyFromPublic(publicKey, 'hex');
        isValid = pubKey.verify(message.toString(), Buffer.from(signature, 'hex'));
        return isValid;
    }
    getLcdcClient(lcdcUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            const URL = lcdcUrl !== null && lcdcUrl !== void 0 ? lcdcUrl : this.lcdcUrl;
            console.log({ URL });
            if (!this.lcdc) {
                const lcdc = new LCDClient_1.LCDClient({
                    chainID: 'jmes-888',
                    // chainID: 'testing',
                    URL,
                    isClassic: true
                });
                this.lcdc = lcdc;
            }
            return this.lcdc;
        });
    }
    getBalance(address) {
        return __awaiter(this, void 0, void 0, function* () {
            const lcdcClient = yield this.getLcdcClient();
            try {
                const [balance] = yield lcdcClient.bank.balance(address !== null && address !== void 0 ? address : this.getAddress());
                return balance.get('ujmes') || new core_1.Coin("ujmes", 0);
            }
            catch (e) {
                console.log(e);
                throw e;
            }
        });
    }
    // @ts-ignore
    sendTransaction(transactionOpts, lcdcUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            // create a simple message that moves coin balances
            const send = new core_1.MsgSend(this.getAddress(), transactionOpts.recipientAddress, { ujmes: transactionOpts.recipientAmount });
            const txOpts = { msgs: [send] };
            if (transactionOpts.memo) {
                //@ts-ignore
                txOpts.memo = transactionOpts.memo;
            }
            const URL = lcdcUrl !== null && lcdcUrl !== void 0 ? lcdcUrl : 'http://51.38.52.37:1317';
            const lcdc = new LCDClient_1.LCDClient({
                chainID: 'jmes-888',
                // chainID: 'testing',
                URL,
                isClassic: true
            });
            // @ts-ignore
            return lcdc.wallet(new key_1.RawKey(this.getPrivate()))
                //@ts-ignore
                .createAndSignTx(txOpts)
                //@ts-ignore
                .then(tx => lcdc.tx.broadcast(tx))
                //@ts-ignore
                .then(result => {
                console.log(`TX hash: ${result.txhash}`);
                return result;
            }).catch((e) => {
                console.log(e);
                throw e;
            });
        });
    }
}
exports.Account = Account;
;
//# sourceMappingURL=Account.js.map