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
exports.WasmAPI = void 0;
const BaseAPI_1 = require("./BaseAPI");
const HistoryEntry_1 = require("../../core/wasm/HistoryEntry");
const AbsoluteTxPosition_1 = require("../../core/wasm/AbsoluteTxPosition");
const wasm_1 = require("../../core/wasm");
class WasmAPI extends BaseAPI_1.BaseAPI {
    constructor(lcd) {
        super(lcd.apiRequester);
        this.lcd = lcd;
    }
    codeInfo(codeID, params = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.lcd.config.isClassic) {
                const endpoint = `/jmes/wasm/v1beta1/codes/${codeID}`;
                return this.c
                    .get(endpoint, params)
                    .then(({ code_info: d }) => ({
                    code_id: Number.parseInt(d.code_id),
                    code_hash: d.code_hash,
                    creator: d.creator,
                }));
            }
            const endpoint = `/cosmwasm/wasm/v1/code/${codeID}`;
            return this.c
                .get(endpoint, params)
                .then(({ code_info: d }) => ({
                code_id: +d.code_id,
                code_hash: d.data_hash,
                creator: d.creator,
                instantiate_permission: d.instantiate_permission
                    ? wasm_1.AccessConfig.fromData(d.instantiate_permission)
                    : undefined,
            }));
        });
    }
    contractInfo(contractAddress, params = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.lcd.config.isClassic) {
                const endpoint = `/jmes/wasm/v1beta1/contracts/${contractAddress}`;
                return this.c
                    .get(endpoint, params)
                    .then(({ contract_info: d }) => ({
                    code_id: Number.parseInt(d.code_id),
                    address: d.address,
                    creator: d.creator,
                    admin: d.admin !== '' ? d.admin : undefined,
                    init_msg: d.init_msg,
                }));
            }
            // new endpoint doesn't return init_msg so have to retrieve it from history
            const [historyEntry, _] = yield this.contractHistory(contractAddress);
            const endpoint = `/cosmwasm/wasm/v1/contract/${contractAddress}`;
            return this.c
                .get(endpoint, params)
                .then(({ contract_info: d }) => ({
                code_id: Number.parseInt(d.code_id),
                address: contractAddress,
                creator: d.creator,
                admin: d.admin !== '' ? d.admin : undefined,
                label: d.label !== '' ? d.label : undefined,
                init_msg: historyEntry[0].msg,
                created: d.created ? AbsoluteTxPosition_1.AbsoluteTxPosition.fromData(d.created) : undefined,
                ibc_port_id: d.ibc_port_id !== '' ? d.ibc_port_id : undefined,
            }));
        });
    }
    contractQuery(contractAddress, query, params = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.lcd.config.isClassic) {
                const endpoint = `/jmes/wasm/v1beta1/contracts/${contractAddress}/store`;
                return this.c
                    .get(endpoint, Object.assign(Object.assign({}, params), { query_msg: Buffer.from(JSON.stringify(query), 'utf-8').toString('base64') }))
                    .then(d => d.query_result);
            }
            else {
                const query_msg = Buffer.from(JSON.stringify(query), 'utf-8').toString('base64');
                const endpoint = `/cosmwasm/wasm/v1/contract/${contractAddress}/smart/${query_msg}`;
                return this.c
                    .get(endpoint, Object.assign({}, params))
                    .then(d => d.data);
            }
        });
    }
    parameters(params = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.lcd.config.isClassic) {
                throw new Error('Not supported for the network');
            }
            return this.c
                .get(`/jmes/wasm/v1beta1/params`, params)
                .then(({ params: d }) => ({
                max_contract_size: Number.parseInt(d.max_contract_size),
                max_contract_gas: Number.parseInt(d.max_contract_gas),
                max_contract_msg_size: Number.parseInt(d.max_contract_msg_size),
            }));
        });
    }
    pinnedCodes(params = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.lcd.config.isClassic) {
                throw new Error('Not supported for the network');
            }
            return this.c
                .get(`/cosmwasm/wasm/v1/codes/pinned`, params)
                .then(({ pinned_code: d }) => ({
                code_ids: d.code_ids.map(code_id => Number.parseInt(code_id)),
            }));
        });
    }
    rawContractState(contractAddress, query_data, params = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.lcd.config.isClassic) {
                throw new Error('Not supported for the network');
            }
            return this.c
                .get(`/cosmwasm/wasm/v1/contract/${contractAddress}/raw/${Buffer.from(query_data, 'utf-8').toString('base64')}`, params)
                .then(({ result: d }) => ({
                data: Buffer.from(d.data, 'base64').toString(),
            }));
        });
    }
    smartContractState(contractAddress, query_data, params = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.lcd.config.isClassic) {
                throw new Error('Not supported for the network');
            }
            return this.c
                .get(`/cosmwasm/wasm/v1/contract/${contractAddress}/smart/${Buffer.from(JSON.stringify(query_data), 'utf-8').toString('base64')}`, params)
                .then(({ result: d }) => ({
                data: d.data,
            }));
        });
    }
    contractHistory(contractAddress, params = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.lcd.config.isClassic) {
                throw new Error('Not supported for the network');
            }
            return this.c
                .get(`/cosmwasm/wasm/v1/contract/${contractAddress}/history`, params)
                .then(d => [
                d.entries.map(entry => HistoryEntry_1.HistoryEntry.fromData(entry)),
                d.pagination,
            ]);
        });
    }
    contractStates(contractAddress, params = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.lcd.config.isClassic) {
                throw new Error('Not supported for the network');
            }
            return this.c
                .get(`/cosmwasm/wasm/v1/contract/${contractAddress}/state`, params)
                .then(d => [
                d.models.map(model => {
                    return {
                        key: model.key,
                        value: model.value,
                    };
                }),
                d.pagination,
            ]);
        });
    }
    allCodes(params = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.lcd.config.isClassic) {
                throw new Error('Not supported for the network');
            }
            return this.c
                .get(`/cosmwasm/wasm/v1/code`, params)
                .then(d => [
                d.codeInfos.map(codeInfo => {
                    return {
                        code_id: +codeInfo.code_id,
                        code_hash: codeInfo.data_hash,
                        creator: codeInfo.creator,
                        instantiate_permission: codeInfo.instantiate_permission
                            ? wasm_1.AccessConfig.fromData(codeInfo.instantiate_permission)
                            : undefined,
                    };
                }),
                d.pagination,
            ]);
        });
    }
}
exports.WasmAPI = WasmAPI;
//# sourceMappingURL=WasmAPI.js.map