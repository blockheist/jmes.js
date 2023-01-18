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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.APIRequester = exports.OrderBy = void 0;
const axios_1 = __importDefault(require("axios"));
const service_1 = require("@terra-money/legacy.proto/cosmos/tx/v1beta1/service");
exports.OrderBy = service_1.OrderBy;
class APIRequester {
    constructor(baseURL) {
        this.baseURL = baseURL;
        this.axios = axios_1.default.create({
            headers: {
                Accept: 'application/json',
            },
            timeout: 30000,
        });
    }
    computeEndpoint(endpoint) {
        const url = new URL(this.baseURL);
        url.pathname === '/'
            ? (url.pathname = endpoint)
            : (url.pathname += endpoint);
        return url.toString();
    }
    getRaw(endpoint, params = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = this.computeEndpoint(endpoint);
            return this.axios.get(url, { params }).then(d => d.data);
        });
    }
    get(endpoint, params = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = this.computeEndpoint(endpoint);
            return this.axios.get(url, { params }).then(d => d.data);
        });
    }
    postRaw(endpoint, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = this.computeEndpoint(endpoint);
            return this.axios.post(url, data).then(d => d.data);
        });
    }
    post(endpoint, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = this.computeEndpoint(endpoint);
            return this.axios.post(url, data).then(d => d.data);
        });
    }
}
exports.APIRequester = APIRequester;
//# sourceMappingURL=APIRequester.js.map