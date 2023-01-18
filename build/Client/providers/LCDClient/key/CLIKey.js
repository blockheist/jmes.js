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
exports.CLIKey = void 0;
const Key_1 = require("./Key");
const bech32_1 = require("../core/bech32");
const child_process_1 = require("child_process");
const tmp_1 = require("tmp");
const fs_1 = require("fs");
const SignatureV2_1 = require("../core/SignatureV2");
const PublicKey_1 = require("../core/PublicKey");
const path_1 = require("path");
const os_1 = require("os");
/**
 * Key implementation that uses `terrad` to sign transactions. Keys should be registered
 * in `terrad`'s OS keyring.
 *
 * NOTE: This Key implementation overrides `createSignature()` and only provide a shim
 * for `sign()`.
 */
class CLIKey extends Key_1.Key {
    /**
     *
     * @param keyName name of the key for terrad
     * @param multisig (optional) address of multisig account on behalf of which transaction shall be signed
     * @param cliPath (optional) path of terrad
     * @param home (optional) home option for terrad
     */
    constructor(params) {
        super();
        this.params = params;
        params.cliPath = params.cliPath || 'terrad';
        params.home = params.home || (0, path_1.resolve)((0, os_1.homedir)(), '.terrad', 'config');
    }
    generateCommand(args) {
        return `${this.params.cliPath} ${args} --output json ${this.params.home ? `--home ${this.params.home}` : ''}`;
    }
    loadAccountDetails() {
        const details = JSON.parse((0, child_process_1.execSync)(this.generateCommand(`keys show ${this.params.keyName}`)).toString());
        this._accAddress = details.address;
        this.publicKey = PublicKey_1.PublicKey.fromData(JSON.parse(details.pubkey));
    }
    /**
     * Terra account address. `terra-` prefixed.
     */
    get accAddress() {
        if (!this._accAddress) {
            this.loadAccountDetails();
            return this.accAddress;
        }
        return this._accAddress;
    }
    /**
     * Terra validator address. `terravaloper-` prefixed.
     */
    get valAddress() {
        if (!this._accAddress) {
            this.loadAccountDetails();
            return this.valAddress;
        }
        return bech32_1.ValAddress.fromAccAddress(this._accAddress);
    }
    sign() {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error('CLIKey does not use sign() -- use createSignature() directly.');
        });
    }
    createSignature(tx) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.params.multisig) {
                throw new Error('multisig is not supported in direct sign mode');
            }
            const tmpobj = (0, tmp_1.fileSync)({ postfix: '.json' });
            (0, fs_1.writeFileSync)(tmpobj.fd, JSON.stringify(tx.toUnSignedTx().toData()));
            const result = (0, child_process_1.execSync)(this.generateCommand(`tx sign ${tmpobj.name} --yes --signature-only --from ${this.params.keyName} --offline ` +
                `--chain-id ${tx.chain_id} --account-number ${tx.account_number} --sequence ${tx.sequence} ` +
                `${this.params.multisig ? `--multisig ${this.params.multisig}` : ''} --sign-mode direct`)).toString();
            tmpobj.removeCallback();
            return SignatureV2_1.SignatureV2.fromData(JSON.parse(result)['signatures'][0]);
        });
    }
    createSignatureAmino(tx) {
        return __awaiter(this, void 0, void 0, function* () {
            const tmpobj = (0, tmp_1.fileSync)({ postfix: '.json' });
            (0, fs_1.writeFileSync)(tmpobj.fd, JSON.stringify(tx.toUnSignedTx().toData()));
            const result = (0, child_process_1.execSync)(this.generateCommand(`tx sign ${tmpobj.name} --yes --signature-only --from ${this.params.keyName} --offline ` +
                `--chain-id ${tx.chain_id} --account-number ${tx.account_number} --sequence ${tx.sequence} ` +
                `${this.params.multisig ? `--multisig ${this.params.multisig}` : ''} --sign-mode amino-json`)).toString();
            tmpobj.removeCallback();
            return SignatureV2_1.SignatureV2.fromData(JSON.parse(result)['signatures'][0]);
        });
    }
}
exports.CLIKey = CLIKey;
//# sourceMappingURL=CLIKey.js.map