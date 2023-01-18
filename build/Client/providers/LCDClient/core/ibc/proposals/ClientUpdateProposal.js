"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientUpdateProposal = void 0;
const json_1 = require("../../../util/json");
const any_1 = require("@terra-money/terra.proto/google/protobuf/any");
const client_1 = require("@terra-money/terra.proto/ibc/core/client/v1/client");
/**
 * Proposal that allows updating IBC clients. If it passes, the substitute
 * client's latest consensus state is copied over to the subject client.
 */
class ClientUpdateProposal extends json_1.JSONSerializable {
    /**
     * @param title proposal's title
     * @param description proposal's description
     * @param subjectClientId client to update
     * @param substituteClientId client to copy
     */
    constructor(title, description, subjectClientId, substituteClientId) {
        super();
        this.title = title;
        this.description = description;
        this.subjectClientId = subjectClientId;
        this.substituteClientId = substituteClientId;
    }
    static fromAmino(data, _) {
        _;
        const { value: { title, description, subjectClientId, substituteClientId }, } = data;
        return new ClientUpdateProposal(title, description, subjectClientId, substituteClientId);
    }
    toAmino(_) {
        _;
        const { title, description, subjectClientId, substituteClientId } = this;
        return {
            type: 'ibc/ClientUpdateProposal',
            value: {
                title,
                description,
                subjectClientId,
                substituteClientId,
            },
        };
    }
    static fromData(data, _) {
        _;
        const { title, description, subject_client_id, substitute_client_id } = data;
        return new ClientUpdateProposal(title, description, subject_client_id, substitute_client_id);
    }
    toData(_) {
        _;
        const { title, description, subjectClientId, substituteClientId } = this;
        return {
            '@type': '/ibc.core.client.v1.ClientUpdateProposal',
            title,
            description,
            subject_client_id: subjectClientId,
            substitute_client_id: substituteClientId,
        };
    }
    static fromProto(proto, _) {
        _;
        return new ClientUpdateProposal(proto.title, proto.description, proto.subjectClientId, proto.substituteClientId);
    }
    toProto(_) {
        _;
        const { title, description, subjectClientId, substituteClientId } = this;
        return client_1.ClientUpdateProposal.fromPartial({
            subjectClientId,
            substituteClientId,
            description,
            title,
        });
    }
    packAny(_) {
        _;
        return any_1.Any.fromPartial({
            typeUrl: '/ibc.core.client.v1.ClientUpdateProposal',
            value: client_1.ClientUpdateProposal.encode(this.toProto()).finish(),
        });
    }
    static unpackAny(msgAny, _) {
        _;
        return ClientUpdateProposal.fromProto(client_1.ClientUpdateProposal.decode(msgAny.value));
    }
}
exports.ClientUpdateProposal = ClientUpdateProposal;
//# sourceMappingURL=ClientUpdateProposal.js.map