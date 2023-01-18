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
const axios_1 = __importDefault(require("axios"));
const FormData = require('form-data');
function postItemOffer(itemOfferParams) {
    return __awaiter(this, void 0, void 0, function* () {
        // @ts-ignore
        const { endpoint } = this;
        const { identifier, price } = itemOfferParams;
        const url = `${endpoint.api_url}/item/${identifier}/offer`;
        return axios_1.default.post(url, { price });
    });
}
exports.default = postItemOffer;
;
//# sourceMappingURL=postItemOffer.js.map