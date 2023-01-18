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
exports.SlashingAPI = void 0;
const BaseAPI_1 = require("./BaseAPI");
const core_1 = require("../../core");
class SlashingAPI extends BaseAPI_1.BaseAPI {
    constructor(lcd) {
        super(lcd.apiRequester);
        this.lcd = lcd;
    }
    /**
     * Gets all signing info, or just the signing info of a particular validator.
     *
     * @param valConsPubKey validator's consensus public key
     */
    signingInfo(valConsAddress, params = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.c
                .get(`/cosmos/slashing/v1beta1/signing_infos/${valConsAddress}`, params)
                .then(({ val_signing_info: d }) => ({
                address: d.address,
                start_height: Number.parseInt(d.start_height),
                index_offset: Number.parseInt(d.index_offset),
                jailed_until: new Date(d.jailed_until),
                tombstoned: d.tombstoned,
                missed_blocks_counter: Number.parseInt(d.missed_blocks_counter),
            }));
        });
    }
    signingInfos(params = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.c
                .get(`/cosmos/slashing/v1beta1/signing_infos`, params)
                .then(d => d.info.map(x => ({
                address: x.address,
                start_height: Number.parseInt(x.start_height),
                index_offset: Number.parseInt(x.index_offset),
                jailed_until: new Date(x.jailed_until),
                tombstoned: x.tombstoned,
                missed_blocks_counter: Number.parseInt(x.missed_blocks_counter),
            })));
        });
    }
    /**
     * Gets the current Slashing module's parameters.
     */
    parameters(params = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.c
                .get(`/cosmos/slashing/v1beta1/params`, params)
                .then(({ params: d }) => ({
                signed_blocks_window: Number.parseInt(d.signed_blocks_window),
                min_signed_per_window: new core_1.Dec(d.min_signed_per_window),
                downtime_jail_duration: Number.parseInt(d.downtime_jail_duration),
                slash_fraction_double_sign: new core_1.Dec(d.slash_fraction_double_sign),
                slash_fraction_downtime: new core_1.Dec(d.slash_fraction_downtime),
            }));
        });
    }
}
exports.SlashingAPI = SlashingAPI;
//# sourceMappingURL=SlashingAPI.js.map