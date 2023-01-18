"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParamChange = exports.ParamChanges = void 0;
const json_1 = require("../../util/json");
const params_1 = require("@terra-money/legacy.proto/cosmos/params/v1beta1/params");
class ParamChanges extends json_1.JSONSerializable {
    constructor(paramChanges) {
        super();
        this.paramChanges = paramChanges;
    }
    static fromAmino(proto) {
        return new ParamChanges((proto !== null && proto !== void 0 ? proto : []).map(ParamChange.fromAmino));
    }
    toAmino() {
        return this.paramChanges.map(c => c.toAmino());
    }
    static fromData(proto) {
        return new ParamChanges((proto !== null && proto !== void 0 ? proto : []).map(ParamChange.fromData));
    }
    toData() {
        return this.paramChanges.map(c => c.toData());
    }
    static fromProto(proto) {
        return new ParamChanges((proto !== null && proto !== void 0 ? proto : []).map(ParamChange.fromProto));
    }
    toProto() {
        return this.paramChanges.map(c => c.toProto());
    }
}
exports.ParamChanges = ParamChanges;
class ParamChange extends json_1.JSONSerializable {
    constructor(subspace, key, value) {
        super();
        this.subspace = subspace;
        this.key = key;
        this.value = value;
    }
    static fromAmino(data) {
        const { subspace, key, value } = data;
        return new ParamChange(subspace, key, value);
    }
    toAmino() {
        const { subspace, key, value } = this;
        return {
            subspace,
            key,
            value,
        };
    }
    static fromData(data) {
        const { subspace, key, value } = data;
        return new ParamChange(subspace, key, value);
    }
    toData() {
        const { subspace, key, value } = this;
        return {
            subspace,
            key,
            value,
        };
    }
    static fromProto(proto) {
        return new ParamChange(proto.subspace, proto.key, proto.value);
    }
    toProto() {
        const { subspace, key, value } = this;
        return params_1.ParamChange.fromPartial({
            key,
            subspace,
            value,
        });
    }
}
exports.ParamChange = ParamChange;
//# sourceMappingURL=ParamChange.js.map