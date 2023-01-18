"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeNull = exports.JSONSerializable = exports.prepareSignBytes = void 0;
function prepareSignBytes(obj) {
    if (Array.isArray(obj)) {
        return obj.map(prepareSignBytes);
    }
    // string, number, or null
    if (typeof obj !== `object` || obj === null) {
        return obj;
    }
    const sorted = {};
    Object.keys(obj)
        .sort()
        .forEach(key => {
        if (obj[key] === undefined || obj[key] === null)
            return;
        sorted[key] = prepareSignBytes(obj[key]);
    });
    return sorted;
}
exports.prepareSignBytes = prepareSignBytes;
class JSONSerializable {
    toJSON(isClassic) {
        return JSON.stringify(prepareSignBytes(this.toData(isClassic)));
    }
    toAminoJSON(isClassic) {
        return JSON.stringify(prepareSignBytes(this.toAmino(isClassic)));
    }
}
exports.JSONSerializable = JSONSerializable;
function removeNull(obj) {
    if (obj !== null && typeof obj === 'object') {
        return Object.entries(obj)
            .filter(([, v]) => v != null)
            .reduce((acc, [k, v]) => (Object.assign(Object.assign({}, acc), { [k]: v === Object(v) && !Array.isArray(v) ? removeNull(v) : v })), {});
    }
    return obj;
}
exports.removeNull = removeNull;
//# sourceMappingURL=json.js.map