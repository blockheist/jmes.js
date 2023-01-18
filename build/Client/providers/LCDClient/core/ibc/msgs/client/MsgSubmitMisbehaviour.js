"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MsgSubmitMisbehaviour = void 0;
const json_1 = require("../../../../util/json");
const any_1 = require("@terra-money/terra.proto/google/protobuf/any");
const tx_1 = require("@terra-money/terra.proto/ibc/core/client/v1/tx");
/**
 *  MsgSubmitMisbehaviour defines an sdk.Msg type that submits Evidence for light client misbehaviour.
 */
class MsgSubmitMisbehaviour extends json_1.JSONSerializable {
    /**
     * @param client_id client unique identifier
     * @param misbehaviour misbehaviour used for freezing the light client
     * @param signer signer address
     */
    constructor(client_id, misbehaviour, signer) {
        super();
        this.client_id = client_id;
        this.misbehaviour = misbehaviour;
        this.signer = signer;
    }
    static fromAmino(_, isClassic) {
        _;
        isClassic;
        throw new Error('Amino not supported');
    }
    toAmino(_) {
        _;
        throw new Error('Amino not supported');
    }
    static fromData(data, _) {
        _;
        const { client_id, misbehaviour, signer } = data;
        return new MsgSubmitMisbehaviour(client_id, misbehaviour, signer);
    }
    toData(_) {
        _;
        const { client_id, misbehaviour, signer } = this;
        return {
            '@type': '/ibc.core.client.v1.MsgSubmitMisbehaviour',
            client_id,
            misbehaviour,
            signer,
        };
    }
    static fromProto(proto, _) {
        _;
        return new MsgSubmitMisbehaviour(proto.clientId, proto.misbehaviour, proto.signer);
    }
    toProto(_) {
        _;
        const { client_id, misbehaviour, signer } = this;
        return tx_1.MsgSubmitMisbehaviour.fromPartial({
            clientId: client_id,
            misbehaviour,
            signer,
        });
    }
    packAny(_) {
        _;
        return any_1.Any.fromPartial({
            typeUrl: '/ibc.core.client.v1.MsgSubmitMisbehaviour',
            value: tx_1.MsgSubmitMisbehaviour.encode(this.toProto()).finish(),
        });
    }
    static unpackAny(msgAny, _) {
        _;
        return MsgSubmitMisbehaviour.fromProto(tx_1.MsgSubmitMisbehaviour.decode(msgAny.value));
    }
}
exports.MsgSubmitMisbehaviour = MsgSubmitMisbehaviour;
//# sourceMappingURL=MsgSubmitMisbehaviour.js.map