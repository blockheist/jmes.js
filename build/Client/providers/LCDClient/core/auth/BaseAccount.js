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
exports.BaseAccount = void 0;
const PublicKey_1 = require("../PublicKey");
const json_1 = require("../../util/json");
// import { BaseAccount as BaseAccount_pb } from '@terra-money/legacy.proto/cosmos/auth/v1beta1/auth';
// import { Any } from '@terra-money/legacy.proto/google/protobuf/any';
const auth_1 = require("@jmesworld/jmes.proto/src/cosmos/auth/v1beta1/auth");
const any_1 = require("@jmesworld/jmes.proto/src/google/protobuf/any");
const Long = __importStar(require("long"));
/**
 * Stores information about an account fetched from the blockchain.
 */
class BaseAccount extends json_1.JSONSerializable {
    /**
     * Creates a new Account object, holding information about a basic account.
     *
     * @param address account address
     * @param public_key account's public key information
     * @param account_number account number on the blockchain
     * @param sequence sequence number, or number of transactions that have been posted
     */
    constructor(address, public_key, account_number, sequence) {
        super();
        this.address = address;
        this.public_key = public_key;
        this.account_number = account_number;
        this.sequence = sequence;
    }
    getAccountNumber() {
        return this.account_number;
    }
    getSequenceNumber() {
        return this.sequence;
    }
    getPublicKey() {
        return this.public_key;
    }
    toAmino(isClassic) {
        const { address, public_key, account_number, sequence } = this;
        return {
            type: isClassic ? 'core/Account' : 'cosmos-sdk/BaseAccount',
            value: {
                address,
                public_key: public_key ? public_key.toAmino() : null,
                account_number: account_number.toFixed(),
                sequence: sequence.toFixed(),
            },
        };
    }
    static fromAmino(data, _) {
        _;
        const { value: { address, public_key, account_number, sequence }, } = data;
        return new BaseAccount(address || '', public_key ? PublicKey_1.PublicKey.fromAmino(public_key) : null, Number.parseInt(account_number) || 0, Number.parseInt(sequence) || 0);
    }
    static fromData(data, _) {
        _;
        const { address, pub_key, account_number, sequence } = data;
        return new BaseAccount(address || '', pub_key ? PublicKey_1.PublicKey.fromData(pub_key) : null, Number.parseInt(account_number) || 0, Number.parseInt(sequence) || 0);
    }
    toData(_) {
        _;
        const { address, public_key, account_number, sequence } = this;
        return {
            '@type': '/cosmos.auth.v1beta1.BaseAccount',
            address,
            pub_key: public_key ? public_key.toData() : null,
            account_number: account_number.toFixed(),
            sequence: sequence.toFixed(),
        };
    }
    toProto(_) {
        _;
        const { address, public_key, account_number, sequence } = this;
        return auth_1.BaseAccount.fromPartial({
            address,
            pubKey: public_key === null || public_key === void 0 ? void 0 : public_key.packAny(),
            accountNumber: Long.fromNumber(account_number),
            sequence: Long.fromNumber(sequence),
        });
    }
    static fromProto(baseAccountProto, _) {
        _;
        const pubkey = baseAccountProto.pubKey;
        return new BaseAccount(baseAccountProto.address, pubkey ? PublicKey_1.PublicKey.fromProto(pubkey) : null, baseAccountProto.accountNumber.toNumber(), baseAccountProto.sequence.toNumber());
    }
    packAny(isClassic) {
        return any_1.Any.fromPartial({
            typeUrl: '/cosmos.auth.v1beta1.BaseAccount',
            value: auth_1.BaseAccount.encode(this.toProto(isClassic)).finish(),
        });
    }
    static unpackAny(pubkeyAny, isClassic) {
        return BaseAccount.fromProto(auth_1.BaseAccount.decode(pubkeyAny.value), isClassic);
    }
}
exports.BaseAccount = BaseAccount;
//# sourceMappingURL=BaseAccount.js.map