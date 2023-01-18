"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getFeed_1 = __importDefault(require("./methods/getFeed"));
const getAuthor_1 = __importDefault(require("./methods/getAuthor"));
const getAuthors_1 = __importDefault(require("./methods/getAuthors"));
const getAllItems_1 = __importDefault(require("./methods/getAllItems"));
const getItem_1 = __importDefault(require("./methods/getItem"));
const mintItem_1 = __importDefault(require("./methods/mintItem"));
const findItem_1 = __importDefault(require("./methods/findItem"));
const postItemOffer_1 = __importDefault(require("./methods/postItemOffer"));
const postItemVote_1 = __importDefault(require("./methods/postItemVote"));
/**
 * Marketplace API is a specific provider we provide to our DAO product built on top of JMES Protocol
 */
class MarketplaceAPI {
    constructor(config) {
        var _a, _b, _c, _d;
        this.endpoint = {
            api_url: (_b = (_a = config === null || config === void 0 ? void 0 : config.endpoint) === null || _a === void 0 ? void 0 : _a.api_url) !== null && _b !== void 0 ? _b : 'http://51.38.52.37:3001',
            images_url: (_d = (_c = config === null || config === void 0 ? void 0 : config.endpoint) === null || _c === void 0 ? void 0 : _c.images_url) !== null && _d !== void 0 ? _d : 'http://51.38.52.37:3001/images'
        };
    }
}
exports.default = MarketplaceAPI;
;
MarketplaceAPI.prototype.getAuthor = getAuthor_1.default;
MarketplaceAPI.prototype.getAuthors = getAuthors_1.default;
MarketplaceAPI.prototype.getFeed = getFeed_1.default;
MarketplaceAPI.prototype.getItem = getItem_1.default;
MarketplaceAPI.prototype.getAllItems = getAllItems_1.default;
MarketplaceAPI.prototype.findItem = findItem_1.default;
MarketplaceAPI.prototype.postItemOffer = postItemOffer_1.default;
MarketplaceAPI.prototype.postItemVote = postItemVote_1.default;
MarketplaceAPI.prototype.mintItem = mintItem_1.default;
//# sourceMappingURL=MarketplaceAPI.js.map