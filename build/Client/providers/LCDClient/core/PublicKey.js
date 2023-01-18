"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValConsPublicKey = exports.LegacyAminoMultisigPublicKey = exports.SimplePublicKey = exports.PublicKey = void 0;
const json_1 = require("../util/json");
const hash_1 = require("../util/hash");
const keys_1 = require("@jmesworld/jmes.proto/src/cosmos/crypto/multisig/keys");
const any_1 = require("@jmesworld/jmes.proto/src/google/protobuf/any");
const keys_2 = require("@jmesworld/jmes.proto/src/cosmos/crypto/secp256k1/keys");
const keys_3 = require("@jmesworld/jmes.proto/src/cosmos/crypto/ed25519/keys");
const bech32_1 = require("bech32");
// As discussed in https://github.com/binance-chain/javascript-sdk/issues/163
// Prefixes listed here: https://github.com/tendermint/tendermint/blob/d419fffe18531317c28c29a292ad7d253f6cafdf/docs/spec/blockchain/encoding.md#public-key-cryptography
// Last bytes is varint-encoded length prefix
const pubkeyAminoPrefixSecp256k1 = Buffer.from('eb5ae987' + '21' /* fixed length */, 'hex');
const pubkeyAminoPrefixEd25519 = Buffer.from('1624de64' + '20' /* fixed length */, 'hex');
/** See https://github.com/tendermint/tendermint/commit/38b401657e4ad7a7eeb3c30a3cbf512037df3740 */
const pubkeyAminoPrefixMultisigThreshold = Buffer.from('22c1f7e2' /* variable length not included */, 'hex');
const encodeUvarint = (value) => {
    const checked = Number.parseInt(value.toString());
    if (checked > 127) {
        throw new Error('Encoding numbers > 127 is not supported here. Please tell those lazy CosmJS maintainers to port the binary.PutUvarint implementation from the Go standard library and write some tests.');
    }
    return [checked];
};
var PublicKey;
(function (PublicKey) {
    function fromAmino(data) {
        switch (data.type) {
            case 'tendermint/PubKeySecp256k1':
                return SimplePublicKey.fromAmino(data);
            case 'tendermint/PubKeyMultisigThreshold':
                return LegacyAminoMultisigPublicKey.fromAmino(data);
            case 'tendermint/PubKeyEd25519':
                return ValConsPublicKey.fromAmino(data);
        }
    }
    PublicKey.fromAmino = fromAmino;
    function fromData(data) {
        switch (data['@type']) {
            case '/cosmos.crypto.secp256k1.PubKey':
                return SimplePublicKey.fromData(data);
            case '/cosmos.crypto.multisig.LegacyAminoPubKey':
                return LegacyAminoMultisigPublicKey.fromData(data);
            case '/cosmos.crypto.ed25519.PubKey':
                return ValConsPublicKey.fromData(data);
        }
    }
    PublicKey.fromData = fromData;
    function fromProto(pubkeyAny) {
        const typeUrl = pubkeyAny.typeUrl;
        if (typeUrl === '/cosmos.crypto.secp256k1.PubKey') {
            return SimplePublicKey.unpackAny(pubkeyAny);
        }
        else if (typeUrl === '/cosmos.crypto.multisig.LegacyAminoPubKey') {
            return LegacyAminoMultisigPublicKey.unpackAny(pubkeyAny);
        }
        else if (typeUrl === '/cosmos.crypto.ed25519.PubKey') {
            return ValConsPublicKey.unpackAny(pubkeyAny);
        }
        throw new Error(`Pubkey type ${typeUrl} not recognized`);
    }
    PublicKey.fromProto = fromProto;
})(PublicKey = exports.PublicKey || (exports.PublicKey = {}));
class SimplePublicKey extends json_1.JSONSerializable {
    constructor(key) {
        super();
        this.key = key;
    }
    static fromAmino(data) {
        return new SimplePublicKey(data.value);
    }
    toAmino() {
        return {
            type: 'tendermint/PubKeySecp256k1',
            value: this.key,
        };
    }
    static fromData(data) {
        return new SimplePublicKey(data.key);
    }
    toData() {
        return {
            '@type': '/cosmos.crypto.secp256k1.PubKey',
            key: this.key,
        };
    }
    static fromProto(pubkeyProto) {
        return new SimplePublicKey(Buffer.from(pubkeyProto.key).toString('base64'));
    }
    toProto() {
        return keys_2.PubKey.fromPartial({
            key: Buffer.from(this.key, 'base64'),
        });
    }
    packAny() {
        return any_1.Any.fromPartial({
            typeUrl: '/cosmos.crypto.secp256k1.PubKey',
            value: keys_2.PubKey.encode(this.toProto()).finish(),
        });
    }
    static unpackAny(pubkeyAny) {
        return SimplePublicKey.fromProto(keys_2.PubKey.decode(pubkeyAny.value));
    }
    encodeAminoPubkey() {
        return Buffer.concat([
            pubkeyAminoPrefixSecp256k1,
            Buffer.from(this.key, 'base64'),
        ]);
    }
    rawAddress() {
        const pubkeyData = Buffer.from(this.key, 'base64');
        return (0, hash_1.ripemd160)((0, hash_1.sha256)(pubkeyData));
    }
    address() {
        return bech32_1.bech32.encode('jmes', bech32_1.bech32.toWords(this.rawAddress()));
    }
    pubkeyAddress() {
        return bech32_1.bech32.encode('jmespub', bech32_1.bech32.toWords(this.encodeAminoPubkey()));
    }
}
exports.SimplePublicKey = SimplePublicKey;
class LegacyAminoMultisigPublicKey extends json_1.JSONSerializable {
    constructor(threshold, pubkeys) {
        super();
        this.threshold = threshold;
        this.pubkeys = pubkeys;
    }
    encodeAminoPubkey() {
        const out = Array.from(pubkeyAminoPrefixMultisigThreshold);
        out.push(0x08);
        out.push(...encodeUvarint(this.threshold));
        for (const pubkeyData of this.pubkeys.map(p => p.encodeAminoPubkey())) {
            out.push(0x12);
            out.push(...encodeUvarint(pubkeyData.length));
            out.push(...Array.from(pubkeyData));
        }
        return new Uint8Array(out);
    }
    rawAddress() {
        const pubkeyData = this.encodeAminoPubkey();
        return (0, hash_1.sha256)(pubkeyData).slice(0, 20);
    }
    address() {
        return bech32_1.bech32.encode('jmes', bech32_1.bech32.toWords(this.rawAddress()));
    }
    pubkeyAddress() {
        return bech32_1.bech32.encode('jmespub', bech32_1.bech32.toWords(this.encodeAminoPubkey()));
    }
    static fromAmino(data) {
        return new LegacyAminoMultisigPublicKey(Number.parseInt(data.value.threshold), data.value.pubkeys.map(p => SimplePublicKey.fromAmino(p)));
    }
    toAmino() {
        return {
            type: 'tendermint/PubKeyMultisigThreshold',
            value: {
                threshold: this.threshold.toFixed(),
                pubkeys: this.pubkeys.map(p => p.toAmino()),
            },
        };
    }
    static fromData(data) {
        return new LegacyAminoMultisigPublicKey(Number.parseInt(data.threshold), data.public_keys.map(v => SimplePublicKey.fromData(v)));
    }
    toData() {
        return {
            '@type': '/cosmos.crypto.multisig.LegacyAminoPubKey',
            threshold: this.threshold.toFixed(),
            public_keys: this.pubkeys.map(p => p.toData()),
        };
    }
    static fromProto(pubkeyProto) {
        return new LegacyAminoMultisigPublicKey(pubkeyProto.threshold, pubkeyProto.publicKeys.map(v => SimplePublicKey.unpackAny(v)));
    }
    toProto() {
        return keys_1.LegacyAminoPubKey.fromPartial({
            threshold: this.threshold,
            publicKeys: this.pubkeys.map(v => v.packAny()),
        });
    }
    packAny() {
        return any_1.Any.fromPartial({
            typeUrl: '/cosmos.crypto.multisig.LegacyAminoPubKey',
            value: keys_1.LegacyAminoPubKey.encode(this.toProto()).finish(),
        });
    }
    static unpackAny(pubkeyAny) {
        return LegacyAminoMultisigPublicKey.fromProto(keys_1.LegacyAminoPubKey.decode(pubkeyAny.value));
    }
}
exports.LegacyAminoMultisigPublicKey = LegacyAminoMultisigPublicKey;
class ValConsPublicKey extends json_1.JSONSerializable {
    constructor(key) {
        super();
        this.key = key;
    }
    static fromAmino(data) {
        return new ValConsPublicKey(data.value);
    }
    toAmino() {
        return {
            type: 'tendermint/PubKeyEd25519',
            value: this.key,
        };
    }
    static fromData(data) {
        return new ValConsPublicKey(data.key);
    }
    toData() {
        return {
            '@type': '/cosmos.crypto.ed25519.PubKey',
            key: this.key,
        };
    }
    static fromProto(pubkeyProto) {
        return new ValConsPublicKey(Buffer.from(pubkeyProto.key).toString('base64'));
    }
    toProto() {
        return keys_2.PubKey.fromPartial({
            key: Buffer.from(this.key, 'base64'),
        });
    }
    packAny() {
        return any_1.Any.fromPartial({
            typeUrl: '/cosmos.crypto.ed25519.PubKey',
            value: keys_3.PubKey.encode(this.toProto()).finish(),
        });
    }
    static unpackAny(pubkeyAny) {
        return ValConsPublicKey.fromProto(keys_3.PubKey.decode(pubkeyAny.value));
    }
    encodeAminoPubkey() {
        return Buffer.concat([
            pubkeyAminoPrefixEd25519,
            Buffer.from(this.key, 'base64'),
        ]);
    }
    rawAddress() {
        const pubkeyData = Buffer.from(this.key, 'base64');
        return (0, hash_1.sha256)(pubkeyData).slice(0, 20);
    }
    address() {
        return bech32_1.bech32.encode('jmesvalcons', bech32_1.bech32.toWords(this.rawAddress()));
    }
    pubkeyAddress() {
        return bech32_1.bech32.encode('jmesvalconspub', bech32_1.bech32.toWords(this.encodeAminoPubkey()));
    }
}
exports.ValConsPublicKey = ValConsPublicKey;
//# sourceMappingURL=PublicKey.js.map