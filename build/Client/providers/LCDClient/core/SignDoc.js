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
exports.SignDoc = void 0;
const json_1 = require("../util/json");
const Long = __importStar(require("long"));
const tx_1 = require("@jmesworld/jmes.proto/src/cosmos/tx/v1beta1/tx");
const Tx_1 = require("./Tx");
/**
 * A sign message is a data structure that is used to create a [[StdSignature]] to be later
 * appended to the list of signatures in an [[StdTx]]. Essentially, it contains all the
 * information needed to sign and build a transaction, and can be described as an
 * "unsigned transaction."
 */
class SignDoc extends json_1.JSONSerializable {
    /**
     *
     * @param chain_id ID of blockchain to submit transaction to
     * @param account_number account number on blockchain
     * @param sequence Sequence number (nonce), number of signed previous transactions by
     *    account included on the blockchain at time of broadcast.
     * @param fee transaction fee
     * @param msgs list of messages to include
     * @param memo optional note
     * @param timeout_height optional transaction timeout height, does not support amino
     * @param public_key Signer's public key, only used at direct sign mode
     */
    constructor(chain_id, account_number, sequence, auth_info, tx_body) {
        super();
        this.chain_id = chain_id;
        this.account_number = account_number;
        this.sequence = sequence;
        this.auth_info = auth_info;
        this.tx_body = tx_body;
    }
    toAmino(isClassic) {
        const { chain_id, account_number, sequence, tx_body: { memo, messages, timeout_height }, auth_info: { fee }, } = this;
        return {
            chain_id,
            account_number: account_number.toString(),
            sequence: sequence.toString(),
            timeout_height: timeout_height && timeout_height !== 0
                ? timeout_height.toString()
                : undefined,
            fee: fee.toAmino(),
            msgs: messages.map(m => m.toAmino(isClassic)),
            memo: memo !== null && memo !== void 0 ? memo : '',
        };
    }
    toData(isClassic) {
        const { account_number, chain_id, tx_body, auth_info } = this;
        return {
            body_bytes: Buffer.from(tx_body.toBytes(isClassic)).toString('base64'),
            auth_info_bytes: Buffer.from(auth_info.toBytes()).toString('base64'),
            account_number: account_number.toFixed(),
            chain_id,
        };
    }
    toProto(isClassic) {
        const { account_number, chain_id, tx_body, auth_info } = this;
        return tx_1.SignDoc.fromPartial({
            bodyBytes: tx_body.toBytes(isClassic),
            authInfoBytes: auth_info.toBytes(),
            accountNumber: Long.fromNumber(account_number),
            chainId: chain_id,
        });
    }
    toUnSignedTx() {
        return new Tx_1.Tx(this.tx_body, this.auth_info, []);
    }
    toBytes(isClassic) {
        return tx_1.SignDoc.encode(this.toProto(isClassic)).finish();
    }
}
exports.SignDoc = SignDoc;
//# sourceMappingURL=SignDoc.js.map