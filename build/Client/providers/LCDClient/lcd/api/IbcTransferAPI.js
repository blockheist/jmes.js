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
exports.IbcTransferAPI = void 0;
const BaseAPI_1 = require("./BaseAPI");
//import { DenomTrace } from '@terra-money/legacy.proto/ibc/applications/transfer/v1/query'
const DenomTrace_1 = require("../../core/ibc/applications/transfer/v1/DenomTrace");
class IbcTransferAPI extends BaseAPI_1.BaseAPI {
    constructor(lcd) {
        super(lcd.apiRequester);
        this.lcd = lcd;
    }
    /** Gets a denomTrace for the hash */
    denomTrace(hash) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.c
                .get(`/ibc/apps/transfer/v1/denom_traces/${hash}`)
                .then(d => DenomTrace_1.DenomTrace.fromData(d.denom_trace));
        });
    }
    /** Gets a list of denomTraces */
    denomTraces(params = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.c
                .get(`/ibc/apps/transfer/v1/denom_traces`, params)
                .then(d => [d.denom_traces.map(DenomTrace_1.DenomTrace.fromData), d.pagination]);
        });
    }
    /** Gets a denomination hash information */
    denomHash(trace, params = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.lcd.config.isClassic) {
                throw new Error('Not supported for the network');
            }
            return yield this.c.get(`/ibc/apps/transfer/v1/denom_hashes/${trace}`, params);
        });
    }
    /**
     * Gets the current transfer application parameters.
     */
    parameters(params = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.c
                .get(`/ibc/apps/transfer/v1/params`, params)
                .then(({ params: d }) => ({
                send_enabled: d.send_enabled,
                receive_enabled: d.receive_enabled,
            }));
        });
    }
}
exports.IbcTransferAPI = IbcTransferAPI;
//# sourceMappingURL=IbcTransferAPI.js.map