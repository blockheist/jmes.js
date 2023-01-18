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
exports.App = exports.Consensus = void 0;
const types_1 = require("@terra-money/terra.proto/tendermint/version/types");
const types_2 = require("@terra-money/terra.proto/tendermint/version/types");
const Long = __importStar(require("long"));
const json_1 = require("../../../../../util/json");
/**
 * Consensus captures the consensus rules for processing a block in the blockchain,
 * including all blockchain data structures and the rules of the application's
 * state transition machine.
 */
class Consensus extends json_1.JSONSerializable {
    /**
     * @param block
     * @param app
     */
    constructor(block, app) {
        super();
        this.block = block;
        this.app = app;
    }
    static fromAmino(_) {
        _;
        throw new Error('Amino not supported');
    }
    toAmino() {
        throw new Error('Amino not supported');
    }
    static fromData(data) {
        const { block, app } = data;
        return new Consensus(Number.parseInt(block), Number.parseInt(app));
    }
    toData() {
        const { block, app } = this;
        const res = {
            block: block.toFixed(),
            app: app.toFixed(),
        };
        return res;
    }
    static fromProto(proto) {
        return new Consensus(proto.block.toNumber(), proto.app.toNumber());
    }
    toProto() {
        const { block, app } = this;
        return types_1.Consensus.fromPartial({
            block: Long.fromNumber(block),
            app: Long.fromNumber(app),
        });
    }
}
exports.Consensus = Consensus;
/**
 * App captures the consensus rules for processing a block in the blockchain,
 * including all blockchain data structures and the rules of the application's
 * state transition machine.
 */
class App extends json_1.JSONSerializable {
    /**
     * @param protocol
     * @param software
     */
    constructor(protocol, software) {
        super();
        this.protocol = protocol;
        this.software = software;
    }
    static fromAmino(_) {
        _;
        throw new Error('Amino not supported');
    }
    toAmino() {
        throw new Error('Amino not supported');
    }
    static fromData(data) {
        const { protocol, software } = data;
        return new App(Number.parseInt(protocol), software);
    }
    toData() {
        const { protocol, software } = this;
        const res = {
            protocol: protocol.toFixed(),
            software: software,
        };
        return res;
    }
    static fromProto(proto) {
        return new App(proto.protocol.toNumber(), proto.software);
    }
    toProto() {
        const { protocol, software } = this;
        return types_2.App.fromPartial({
            protocol: Long.fromNumber(protocol),
            software: software,
        });
    }
}
exports.App = App;
//# sourceMappingURL=version.js.map