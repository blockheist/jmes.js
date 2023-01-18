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
exports.TendermintAPI = void 0;
const BaseAPI_1 = require("./BaseAPI");
class TendermintAPI extends BaseAPI_1.BaseAPI {
    constructor(lcd) {
        super(lcd.apiRequester);
        this.lcd = lcd;
    }
    /**
     * Gets the node's information.
     */
    nodeInfo(params = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.c.getRaw(`/cosmos/base/tendermint/v1beta1/node_info`, params);
        });
    }
    /**
     * Gets whether the node is currently in syncing mode to catch up with blocks.
     */
    syncing(params = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.c
                .getRaw(`/cosmos/base/tendermint/v1beta1/syncing`, params)
                .then(d => d.syncing);
        });
    }
    /**
     * Gets the validator (delegates) set at the specific height. If no height is given, the current set is returned.
     * @param height block height
     */
    validatorSet(height, params = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = height !== undefined
                ? `/cosmos/base/tendermint/v1beta1/validatorsets/${height}`
                : `/cosmos/base/tendermint/v1beta1/validatorsets/latest`;
            return this.c
                .get(url, params)
                .then(d => [d.validators, d.pagination]);
        });
    }
    /**
     * Gets the block information at the specified height. If no height is given, the latest block is returned.
     * @param height block height.
     */
    blockInfo(height, params = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = height !== undefined
                ? `/cosmos/base/tendermint/v1beta1/blocks/${height}`
                : `/cosmos/base/tendermint/v1beta1/blocks/latest`;
            return this.c.getRaw(url, params);
        });
    }
}
exports.TendermintAPI = TendermintAPI;
//# sourceMappingURL=TendermintAPI.js.map