"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Params = void 0;
const controller_1 = require("@terra-money/terra.proto/ibc/applications/interchain_accounts/controller/v1/controller");
const json_1 = require("../../../../../util/json");
/**
 *  Params defines the set of on-chain interchain accounts parameters.
 *  The following parameters may be used to disable the controller submodule.
 */
class Params extends json_1.JSONSerializable {
    /**
     * @param controller_enabled controller_enabled enables or disables the controller submodule
     */
    constructor(controller_enabled) {
        super();
        this.controller_enabled = controller_enabled;
    }
    static fromAmino(data) {
        const { controller_enabled } = data;
        return new Params(controller_enabled);
    }
    toAmino() {
        const { controller_enabled } = this;
        const res = {
            controller_enabled: controller_enabled,
        };
        return res;
    }
    static fromData(data) {
        const { controller_enabled } = data;
        return new Params(controller_enabled);
    }
    toData() {
        const { controller_enabled } = this;
        const res = {
            controller_enabled,
        };
        return res;
    }
    static fromProto(proto) {
        return new Params(proto.controllerEnabled);
    }
    toProto() {
        const { controller_enabled } = this;
        return controller_1.Params.fromPartial({
            controllerEnabled: controller_enabled,
        });
    }
}
exports.Params = Params;
//# sourceMappingURL=Params.js.map