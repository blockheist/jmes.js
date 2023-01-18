"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MsgUpdateClient = void 0;
const json_1 = require("../../../../util/json");
const any_1 = require("@terra-money/terra.proto/google/protobuf/any");
const tx_1 = require("@terra-money/terra.proto/ibc/core/client/v1/tx");
const Header_1 = require("../../lightclient/tendermint/Header");
/**
 * MsgUpdateClient defines an sdk.Msg to update a IBC client state using the given header
 */
class MsgUpdateClient extends json_1.JSONSerializable {
    /**
     * @param client_id client unique identifier
     * @param header header to update the light client
     * @param signer signer address
     */
    constructor(client_id, header, signer) {
        super();
        this.client_id = client_id;
        this.header = header;
        this.signer = signer;
    }
    static fromAmino(_, isClassic) {
        _;
        isClassic;
        throw new Error('Amino not supported');
    }
    toAmino() {
        throw new Error('Amino not supported');
    }
    static fromData(data, _) {
        _;
        const { client_id, header, signer } = data;
        return new MsgUpdateClient(client_id, header ? Header_1.Header.fromData(header) : undefined, signer);
    }
    toData(_) {
        _;
        const { client_id, header, signer } = this;
        return {
            '@type': '/ibc.core.client.v1.MsgUpdateClient',
            client_id,
            header: (header === null || header === void 0 ? void 0 : header.toData()) || undefined,
            signer,
        };
    }
    static fromProto(proto, _) {
        _;
        return new MsgUpdateClient(proto.clientId, proto.header ? Header_1.Header.unpackAny(proto.header) : undefined, proto.signer);
    }
    toProto(_) {
        _;
        const { client_id, header, signer } = this;
        return tx_1.MsgUpdateClient.fromPartial({
            clientId: client_id,
            header: (header === null || header === void 0 ? void 0 : header.packAny()) || undefined,
            signer,
        });
    }
    packAny(_) {
        _;
        return any_1.Any.fromPartial({
            typeUrl: '/ibc.core.client.v1.MsgUpdateClient',
            value: tx_1.MsgUpdateClient.encode(this.toProto()).finish(),
        });
    }
    static unpackAny(msgAny, _) {
        _;
        return MsgUpdateClient.fromProto(tx_1.MsgUpdateClient.decode(msgAny.value));
    }
}
exports.MsgUpdateClient = MsgUpdateClient;
//# sourceMappingURL=MsgUpdateClient.js.map