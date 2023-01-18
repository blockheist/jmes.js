"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Convert = void 0;
const numeric_1 = require("../core/numeric");
var Convert;
(function (Convert) {
    Convert.id = (c) => c;
    Convert.toDec = (c) => new numeric_1.Dec(c);
    Convert.toString = (c) => c.toString();
    Convert.toFixed = (c) => c.toFixed();
    Convert.toNumber = Number.parseInt;
    Convert.toData = (c) => c.toData();
})(Convert = exports.Convert || (exports.Convert = {}));
//# sourceMappingURL=convert.js.map