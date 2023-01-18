"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Metadata = void 0;
const metadata_1 = require("@terra-money/terra.proto/ibc/applications/fee/v1/metadata");
const json_1 = require("../../../../util/json");
/**
 * Metadata defines the ICS29 channel specific metadata encoded into the channel version bytestring
 * See ICS004: https://github.com/cosmos/ibc/tree/master/spec/core/ics-004-channel-and-packet-semantics#Versioning
 */
class Metadata extends json_1.JSONSerializable {
    /**
     * @param fee_version fee_version defines the ICS29 fee version
     * @param app_version app_version defines the underlying application version, which may or may not be a JSON encoded bytestring
     */
    constructor(fee_version, app_version) {
        super();
        this.fee_version = fee_version;
        this.app_version = app_version;
    }
    static fromAmino(data) {
        const { fee_version, app_version } = data;
        return new Metadata(fee_version, app_version);
    }
    toAmino() {
        const { fee_version, app_version } = this;
        const res = {
            fee_version,
            app_version,
        };
        return res;
    }
    static fromData(data) {
        const { fee_version, app_version } = data;
        return new Metadata(fee_version, app_version);
    }
    toData() {
        const { fee_version, app_version } = this;
        const res = {
            fee_version,
            app_version,
        };
        return res;
    }
    static fromProto(proto) {
        return new Metadata(proto.feeVersion, proto.appVersion);
    }
    toProto() {
        const { fee_version, app_version } = this;
        return metadata_1.Metadata.fromPartial({
            feeVersion: fee_version,
            appVersion: app_version,
        });
    }
}
exports.Metadata = Metadata;
//# sourceMappingURL=Metadata.js.map