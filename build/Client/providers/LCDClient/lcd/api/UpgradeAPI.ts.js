"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpgradeAPI = void 0;
const BaseAPI_1 = require("./BaseAPI");
const core_1 = require("../../core");
class UpgradeAPI extends BaseAPI_1.BaseAPI {
    constructor(lcd) {
        super(lcd.apiRequester);
        this.lcd = lcd;
    }
    /**
     * queries a previously applied upgrade plan by its name.
     * it returns the height of the plan. if there's no plan with given name, it returns 0.
     */
    appliedPlan(name, params = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.c
                .get(`/cosmos/upgrade/v1beta1/applied_plan/${name}`, params)
                .then(d => Number.parseInt(d.height));
        });
    }
    /**
     * Look up the current plan
     */
    currentPlan(params = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.lcd.config.isClassic) {
                throw new Error('Not supported for the network');
            }
            return this.c
                .get(`/cosmos/upgrade/v1beta1/current_plan`, params)
                .then(d => (d.plan ? core_1.Plan.fromData(d.plan) : null));
        });
    }
    /**
     * Look up the versions of the modules
     */
    moduleVersions(params = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.lcd.config.isClassic) {
                throw new Error('Not supported for the network');
            }
            return this.c
                .get(`/cosmos/upgrade/v1beta1/module_versions`, params)
                .then(d => d.module_versions.map(mv => {
                return { name: mv.name, version: Number.parseInt(mv.version) };
            }));
        });
    }
}
exports.UpgradeAPI = UpgradeAPI;
//# sourceMappingURL=UpgradeAPI.ts.js.map