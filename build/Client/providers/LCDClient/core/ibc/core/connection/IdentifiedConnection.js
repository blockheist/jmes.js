"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IdentifiedConnection = exports.stateToJSON = exports.stateFromJSON = exports.State = void 0;
const connection_1 = require("@terra-money/terra.proto/ibc/core/connection/v1/connection");
const json_1 = require("../../../../util/json");
const Version_1 = require("./Version");
const connection_2 = require("@terra-money/terra.proto/ibc/core/connection/v1/connection");
Object.defineProperty(exports, "State", { enumerable: true, get: function () { return connection_2.State; } });
Object.defineProperty(exports, "stateFromJSON", { enumerable: true, get: function () { return connection_2.stateFromJSON; } });
Object.defineProperty(exports, "stateToJSON", { enumerable: true, get: function () { return connection_2.stateToJSON; } });
const Counterparty_1 = require("./Counterparty");
const long_1 = __importDefault(require("long"));
/**
 * IdentifiedConnection defines a connection with additional connection identifier field
 */
class IdentifiedConnection extends json_1.JSONSerializable {
    /**
     * @param id connection identifier
     * @param client_id client associated with this connection.
     * @param versions IBC version which can be utilised to determine encodings or protocols for channels or packets utilising this connection
     * @param state current state of the connection end
     * @param counterparty counterparty chain associated with this connection
     * @param delay_period delay period associated with this connection
     */
    constructor(id, client_id, versions, state, counterparty, delay_period) {
        super();
        this.id = id;
        this.client_id = client_id;
        this.versions = versions;
        this.state = state;
        this.counterparty = counterparty;
        this.delay_period = delay_period;
    }
    static fromAmino(data) {
        const { id, client_id, versions, state, counterparty, delay_period } = data;
        return new IdentifiedConnection(id, client_id, versions.map(Version_1.Version.fromAmino), (0, connection_2.stateFromJSON)(state), counterparty ? Counterparty_1.Counterparty.fromAmino(counterparty) : undefined, Number.parseInt(delay_period));
    }
    toAmino() {
        const { id, client_id, versions, state, counterparty, delay_period } = this;
        const res = {
            id,
            client_id,
            versions: versions.map(version => version.toAmino()),
            state: (0, connection_2.stateToJSON)(state),
            counterparty: counterparty === null || counterparty === void 0 ? void 0 : counterparty.toAmino(),
            delay_period: delay_period.toFixed(),
        };
        return res;
    }
    static fromData(data) {
        const { id, client_id, versions, state, counterparty, delay_period } = data;
        return new IdentifiedConnection(id, client_id, versions.map(Version_1.Version.fromData), (0, connection_2.stateFromJSON)(state), counterparty ? Counterparty_1.Counterparty.fromData(counterparty) : undefined, Number.parseInt(delay_period));
    }
    toData() {
        const { id, client_id, versions, state, counterparty, delay_period } = this;
        const res = {
            id,
            client_id,
            versions: versions.map(version => version.toData()),
            state: (0, connection_2.stateToJSON)(state),
            counterparty: counterparty === null || counterparty === void 0 ? void 0 : counterparty.toData(),
            delay_period: delay_period.toFixed(),
        };
        return res;
    }
    static fromProto(proto) {
        return new IdentifiedConnection(proto.id, proto.clientId, proto.versions.map(Version_1.Version.fromProto), proto.state, proto.counterparty
            ? Counterparty_1.Counterparty.fromProto(proto.counterparty)
            : undefined, proto.delayPeriod.toNumber());
    }
    toProto() {
        const { id, client_id, versions, state, counterparty, delay_period } = this;
        return connection_1.IdentifiedConnection.fromPartial({
            id,
            clientId: client_id,
            versions: versions.map(v => v.toProto()),
            state,
            counterparty: counterparty === null || counterparty === void 0 ? void 0 : counterparty.toProto(),
            delayPeriod: long_1.default.fromNumber(delay_period),
        });
    }
}
exports.IdentifiedConnection = IdentifiedConnection;
//# sourceMappingURL=IdentifiedConnection.js.map