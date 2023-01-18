"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Counterparty = void 0;
const connection_1 = require("@terra-money/terra.proto/ibc/core/connection/v1/connection");
const json_1 = require("../../../../util/json");
const MerklePrefix_1 = require("../commitment/MerklePrefix");
/** Counterparty defines a channel end counterparty */
class Counterparty extends json_1.JSONSerializable {
    /**
     * @param client_id identifies the client on the counterparty chain associated with a given connection.
     * @param connection_id identifies the connection end on the counterparty chain associated with a given connection.
     * @param prefix commitment merkle prefix of the counterparty chain.
     */
    constructor(client_id, connection_id, prefix) {
        super();
        this.client_id = client_id;
        this.connection_id = connection_id;
        this.prefix = prefix;
    }
    static fromAmino(data) {
        const { client_id, connection_id, prefix } = data;
        return new Counterparty(client_id, connection_id, prefix ? MerklePrefix_1.MerklePrefix.fromAmino(prefix) : undefined);
    }
    toAmino() {
        const { client_id, connection_id, prefix } = this;
        const res = {
            client_id,
            connection_id,
            prefix,
        };
        return res;
    }
    static fromData(data) {
        const { client_id, connection_id, prefix } = data;
        return new Counterparty(client_id, connection_id, prefix ? MerklePrefix_1.MerklePrefix.fromData(prefix) : undefined);
    }
    toData() {
        const { client_id, connection_id, prefix } = this;
        const res = {
            client_id,
            connection_id,
            prefix: prefix ? prefix.toData() : undefined,
        };
        return res;
    }
    static fromProto(proto) {
        return new Counterparty(proto.clientId, proto.connectionId, proto.prefix ? MerklePrefix_1.MerklePrefix.fromProto(proto.prefix) : undefined);
    }
    toProto() {
        const { client_id, connection_id, prefix } = this;
        return connection_1.Counterparty.fromPartial({
            clientId: client_id,
            connectionId: connection_id,
            prefix: prefix ? prefix.toProto() : undefined,
        });
    }
}
exports.Counterparty = Counterparty;
//# sourceMappingURL=Counterparty.js.map