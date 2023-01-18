"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Plan = void 0;
const json_1 = require("../../util/json");
const upgrade_1 = require("@terra-money/terra.proto/cosmos/upgrade/v1beta1/upgrade");
const long_1 = __importDefault(require("long"));
/*
 * Plan specifies information about a planned upgrade and when it should occur.
 */
class Plan extends json_1.JSONSerializable {
    /**
     * @param name This name will be used by the upgraded  version of the software to apply any special "on-upgrade" commands during the first BeginBlock method after the upgrade is applied.
     * @param time Deprecated
     * @param height  The height at which the upgrade must be performed. Only used if Time is not set.
     * @param info Any application specific upgrade info to be included on-chain such as a git commit that validators could automatically upgrade to
     * @param upgraded_client_state Deprecated
     */
    constructor(name, time, height, info, upgraded_client_state) {
        super();
        this.name = name;
        this.time = time;
        this.height = height;
        this.info = info;
        this.upgraded_client_state = upgraded_client_state;
    }
    static fromAmino(data) {
        const { name, time, height, info, upgraded_client_state } = data;
        return new Plan(name, time ? new Date(time) : undefined, height, info, upgraded_client_state);
    }
    toAmino() {
        const { name, time, height, info, upgraded_client_state } = this;
        const res = {
            name,
            time: time ? time.toISOString().replace(/\.000Z$/, 'Z') : undefined,
            height,
            info,
            upgraded_client_state,
        };
        return res;
    }
    static fromData(data) {
        const { name, time, height, info, upgraded_client_state } = data;
        return new Plan(name, time ? new Date(time) : undefined, height, info, upgraded_client_state);
    }
    toData() {
        const { name, time, height, info, upgraded_client_state } = this;
        const res = {
            name,
            time: time ? time.toISOString().replace(/\.000Z$/, 'Z') : undefined,
            height,
            info,
            upgraded_client_state,
        };
        return res;
    }
    static fromProto(proto) {
        return new Plan(proto.name, proto.time, proto.height.toString(), proto.info, proto.upgradedClientState);
    }
    toProto() {
        const { name, time, height, info, upgraded_client_state } = this;
        return upgrade_1.Plan.fromPartial({
            name,
            time,
            height: long_1.default.fromString(height),
            info,
            upgradedClientState: upgraded_client_state,
        });
    }
}
exports.Plan = Plan;
//# sourceMappingURL=Plan.js.map