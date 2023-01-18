"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MsgRegisterCounterpartyAddress = void 0;
const json_1 = require("../../../../../util/json");
const any_1 = require("@terra-money/terra.proto/google/protobuf/any");
const tx_1 = require("@terra-money/terra.proto/ibc/applications/fee/v1/tx");
/**
 * MsgRegisterCounterpartyAddress defines the request type for the RegisterCounterpartyAddress rpc
 */
class MsgRegisterCounterpartyAddress extends json_1.JSONSerializable {
    /**
     * @param address the relayer address
     * @param counterparty_adress the counterparty relayer address
     * @param channel_id unique channel identifier
     */
    constructor(address, counterparty_address, channel_id) {
        super();
        this.address = address;
        this.counterparty_address = counterparty_address;
        this.channel_id = channel_id;
    }
    static fromAmino(_, isClassic) {
        if (isClassic) {
            throw new Error('Not supported for the network');
        }
        _;
        throw new Error('Amino not supported');
    }
    toAmino(isClassic) {
        if (isClassic) {
            throw new Error('Not supported for the network');
        }
        throw new Error('Amino not supported');
    }
    static fromData(data, isClassic) {
        if (isClassic) {
            throw new Error('Not supported for the network');
        }
        const { address, counterparty_address, channel_id } = data;
        return new MsgRegisterCounterpartyAddress(address, counterparty_address, channel_id);
    }
    toData(isClassic) {
        if (isClassic) {
            throw new Error('Not supported for the network');
        }
        const { address, counterparty_address, channel_id } = this;
        return {
            '@type': '/ibc.applications.fee.v1.MsgRegisterCounterpartyAddress',
            address,
            counterparty_address,
            channel_id,
        };
    }
    static fromProto(proto, isClassic) {
        if (isClassic) {
            throw new Error('Not supported for the network');
        }
        return new MsgRegisterCounterpartyAddress(proto.address, proto.counterpartyAddress, proto.channelId);
    }
    toProto(isClassic) {
        if (isClassic) {
            throw new Error('Not supported for the network');
        }
        const { address, counterparty_address, channel_id } = this;
        return tx_1.MsgRegisterCounterpartyAddress.fromPartial({
            address,
            counterpartyAddress: counterparty_address,
            channelId: channel_id,
        });
    }
    packAny(isClassic) {
        if (isClassic) {
            throw new Error('Not supported for the network');
        }
        return any_1.Any.fromPartial({
            typeUrl: '/ibc.applications.fee.v1.MsgRegisterCounterpartyAddress',
            value: tx_1.MsgRegisterCounterpartyAddress.encode(this.toProto(isClassic)).finish(),
        });
    }
    static unpackAny(msgAny, isClassic) {
        if (isClassic) {
            throw new Error('Not supported for the network');
        }
        return MsgRegisterCounterpartyAddress.fromProto(tx_1.MsgRegisterCounterpartyAddress.decode(msgAny.value));
    }
}
exports.MsgRegisterCounterpartyAddress = MsgRegisterCounterpartyAddress;
//# sourceMappingURL=MsgRegisterCounterpartAddress.js.map