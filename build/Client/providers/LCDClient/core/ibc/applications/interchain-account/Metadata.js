"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Metadata = void 0;
const metadata_1 = require("@terra-money/terra.proto/ibc/applications/interchain_accounts/v1/metadata");
const json_1 = require("../../../../util/json");
/**
 * Metadata defines a set of protocol specific data encoded into the ICS27 channel version bytestring
 * See ICS004: https://github.com/cosmos/ibc/tree/master/spec/core/ics-004-channel-and-packet-semantics#Versioning
 */
class Metadata extends json_1.JSONSerializable {
    /**
     * @param version defines the ICS27 protocol version
     * @param controller_connection_id is the connection identifier associated with the controller chain
     * @param host_connection_id is the connection identifier associated with the host chain
     * @param address defines the interchain account address to be fulfilled upon the OnChanOpenTry handshake step ( NOTE: the address field is empty on the OnChanOpenInit handshake step)
     * @param encoding defines the supported codec format
     * @param tx_type defines the type of transactions the interchain account can execute
     */
    constructor(version, controller_connection_id, host_connection_id, address, encoding, tx_type) {
        super();
        this.version = version;
        this.controller_connection_id = controller_connection_id;
        this.host_connection_id = host_connection_id;
        this.address = address;
        this.encoding = encoding;
        this.tx_type = tx_type;
    }
    static fromAmino(data) {
        const { version, controller_connection_id, host_connection_id, address, encoding, tx_type } = data;
        return new Metadata(version, controller_connection_id, host_connection_id, address, encoding, tx_type);
    }
    toAmino() {
        const { version, controller_connection_id, host_connection_id, address, encoding, tx_type } = this;
        const res = {
            version,
            controller_connection_id,
            host_connection_id,
            address,
            encoding,
            tx_type
        };
        return res;
    }
    static fromData(data) {
        const { version, controller_connection_id, host_connection_id, address, encoding, tx_type } = data;
        return new Metadata(version, controller_connection_id, host_connection_id, address, encoding, tx_type);
    }
    toData() {
        const { version, controller_connection_id, host_connection_id, address, encoding, tx_type } = this;
        const res = {
            version,
            controller_connection_id,
            host_connection_id,
            address,
            encoding,
            tx_type
        };
        return res;
    }
    static fromProto(proto) {
        return new Metadata(proto.version, proto.controllerConnectionId, proto.hostConnectionId, proto.address, proto.encoding, proto.txType);
    }
    toProto() {
        const { version, controller_connection_id, host_connection_id, address, encoding, tx_type } = this;
        return metadata_1.Metadata.fromPartial({
            version: version,
            controllerConnectionId: controller_connection_id,
            hostConnectionId: host_connection_id,
            address: address,
            encoding: encoding,
            txType: tx_type,
        });
    }
}
exports.Metadata = Metadata;
//# sourceMappingURL=Metadata.js.map