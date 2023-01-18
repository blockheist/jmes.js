"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Header = void 0;
const json_1 = require("../../../../util/json");
const tendermint_1 = require("@terra-money/terra.proto/ibc/lightclients/tendermint/v1/tendermint");
const Height_1 = require("../../core/client/Height");
const types_1 = require("../../msgs/client/tendermint/types");
const any_1 = require("@terra-money/terra.proto/google/protobuf/any");
/**
 * Header defines the Tendermint client consensus Header.
 * It encapsulates all the information necessary to update from a trusted
 * Tendermint ConsensusState. The inclusion of TrustedHeight and
 * TrustedValidators allows this update to process correctly, so long as the
 * ConsensusState for the TrustedHeight exists, this removes race conditions
 * among relayers The SignedHeader and ValidatorSet are the new untrusted update
 * fields for the client. The TrustedHeight is the height of a stored
 * ConsensusState on the client that will be used to verify the new untrusted
 * header. The Trusted ConsensusState must be within the unbonding period of
 * current time in order to correctly verify, and the TrustedValidators must
 * hash to TrustedConsensusState.NextValidatorsHash since that is the last
 * trusted validator set at the TrustedHeight.
 */
class Header extends json_1.JSONSerializable {
    /**
     * @param signedHeader
     * @param validatorSet
     * @param trustedHeight
     * @param trustedValidators
     */
    constructor(signedHeader, validatorSet, trustedHeight, trustedValidators) {
        super();
        this.signedHeader = signedHeader;
        this.validatorSet = validatorSet;
        this.trustedHeight = trustedHeight;
        this.trustedValidators = trustedValidators;
    }
    static fromAmino(_) {
        _;
        throw new Error('Amino not supported');
    }
    toAmino() {
        throw new Error('Amino not supported');
    }
    static fromData(data) {
        const { signed_header: signedHeader, validator_set: validatorSet, trusted_height: trustedHeight, trusted_validators: trustedValidators, } = data;
        return new Header(signedHeader ? types_1.SignedHeader.fromData(signedHeader) : undefined, validatorSet ? types_1.ValidatorSet.fromData(validatorSet) : undefined, trustedHeight ? Height_1.Height.fromData(trustedHeight) : undefined, trustedValidators ? types_1.ValidatorSet.fromData(trustedValidators) : undefined);
    }
    toData() {
        const { signedHeader, validatorSet, trustedHeight, trustedValidators } = this;
        return {
            signed_header: (signedHeader === null || signedHeader === void 0 ? void 0 : signedHeader.toData()) || undefined,
            validator_set: (validatorSet === null || validatorSet === void 0 ? void 0 : validatorSet.toData()) || undefined,
            trusted_height: (trustedHeight === null || trustedHeight === void 0 ? void 0 : trustedHeight.toData()) || undefined,
            trusted_validators: (trustedValidators === null || trustedValidators === void 0 ? void 0 : trustedValidators.toData()) || undefined,
        };
    }
    static fromProto(proto) {
        const { signedHeader, validatorSet, trustedHeight, trustedValidators } = proto;
        return new Header(signedHeader ? types_1.SignedHeader.fromProto(signedHeader) : undefined, validatorSet ? types_1.ValidatorSet.fromProto(validatorSet) : undefined, trustedHeight ? Height_1.Height.fromProto(trustedHeight) : undefined, trustedValidators ? types_1.ValidatorSet.fromProto(trustedValidators) : undefined);
    }
    toProto() {
        const { signedHeader, validatorSet, trustedHeight, trustedValidators } = this;
        return tendermint_1.Header.fromPartial({
            signedHeader: (signedHeader === null || signedHeader === void 0 ? void 0 : signedHeader.toProto()) || undefined,
            validatorSet: (validatorSet === null || validatorSet === void 0 ? void 0 : validatorSet.toProto()) || undefined,
            trustedHeight: (trustedHeight === null || trustedHeight === void 0 ? void 0 : trustedHeight.toProto()) || undefined,
            trustedValidators: (trustedValidators === null || trustedValidators === void 0 ? void 0 : trustedValidators.toProto()) || undefined,
        });
    }
    packAny() {
        return any_1.Any.fromPartial({
            typeUrl: 'ibc.lightclients.tendermint.v1.Header',
            value: tendermint_1.Header.encode(this.toProto()).finish(),
        });
    }
    static unpackAny(msgAny) {
        return Header.fromProto(tendermint_1.Header.decode(msgAny.value));
    }
}
exports.Header = Header;
//# sourceMappingURL=Header.js.map