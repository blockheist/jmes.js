"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MsgConnectionOpenInit = void 0;
const json_1 = require("../../../../util/json");
const any_1 = require("@terra-money/terra.proto/google/protobuf/any");
const Counterparty_1 = require("../../core/connection/Counterparty");
const Version_1 = require("../../core/connection/Version");
const tx_1 = require("@terra-money/terra.proto/ibc/core/connection/v1/tx");
const long_1 = __importDefault(require("long"));
/**
 * MsgConnectionOpenInit defines the msg sent by an account on Chain A to initialize a connection with Chain B.
 */
class MsgConnectionOpenInit extends json_1.JSONSerializable {
    /**
     * @param client_id identifier of the port to use
     * @param counterparty
     * @param version
     * @param delay_period
     * @param signer signer address
     */
    constructor(client_id, delay_period, signer, counterparty, version) {
        super();
        this.client_id = client_id;
        this.delay_period = delay_period;
        this.signer = signer;
        this.counterparty = counterparty;
        this.version = version;
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
        const { client_id, counterparty, version, delay_period, signer } = data;
        return new MsgConnectionOpenInit(client_id, Number.parseInt(delay_period), signer, counterparty ? Counterparty_1.Counterparty.fromData(counterparty) : undefined, version ? Version_1.Version.fromData(version) : undefined);
    }
    toData(_) {
        _;
        const { client_id, counterparty, version, delay_period, signer } = this;
        return {
            '@type': '/ibc.core.connection.v1.MsgConnectionOpenInit',
            client_id,
            delay_period: delay_period.toFixed(),
            signer,
            counterparty: counterparty ? counterparty.toData() : undefined,
            version: version ? version.toData() : undefined,
        };
    }
    static fromProto(proto, _) {
        _;
        return new MsgConnectionOpenInit(proto.clientId, proto.delayPeriod.toNumber(), proto.signer, proto.counterparty
            ? Counterparty_1.Counterparty.fromProto(proto.counterparty)
            : undefined, proto.version ? Version_1.Version.fromProto(proto.version) : undefined);
    }
    toProto(_) {
        _;
        const { client_id, counterparty, version, delay_period, signer } = this;
        return tx_1.MsgConnectionOpenInit.fromPartial({
            clientId: client_id,
            delayPeriod: long_1.default.fromNumber(delay_period),
            signer,
            counterparty: counterparty ? counterparty.toProto() : undefined,
            version: version ? version.toProto() : undefined,
        });
    }
    packAny(_) {
        _;
        return any_1.Any.fromPartial({
            typeUrl: '/ibc.core.connection.v1.MsgConnectionOpenInit',
            value: tx_1.MsgConnectionOpenInit.encode(this.toProto()).finish(),
        });
    }
    static unpackAny(msgAny, _) {
        _;
        return MsgConnectionOpenInit.fromProto(tx_1.MsgConnectionOpenInit.decode(msgAny.value));
    }
}
exports.MsgConnectionOpenInit = MsgConnectionOpenInit;
//# sourceMappingURL=MsgConnectionOpenInit.js.map