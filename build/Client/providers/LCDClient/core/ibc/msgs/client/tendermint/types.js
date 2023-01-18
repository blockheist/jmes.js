"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Validator = exports.ValidatorSet = exports.CommitSig = exports.Commit = exports.PartSetHeader = exports.BlockID = exports.SignedHeader = exports.Header = void 0;
const types_1 = require("@terra-money/terra.proto/tendermint/types/types");
const validator_1 = require("@terra-money/terra.proto/tendermint/types/validator");
const Long = __importStar(require("long"));
const json_1 = require("../../../../../util/json");
const version_1 = require("./version");
const crypto_1 = require("./crypto");
/** Header defines the structure of a Tendermint block header. */
class Header extends json_1.JSONSerializable {
    /**
     * @param total
     * @param hash
     */
    constructor(version, chainId, height, time, lastBlockId, lastCommitHash, dataHash, validatorsHash, nextValidatorsHash, consensusHash, appHash, lastResultsHash, evidenceHash, proposerAddress) {
        super();
        this.version = version;
        this.chainId = chainId;
        this.height = height;
        this.time = time;
        this.lastBlockId = lastBlockId;
        this.lastCommitHash = lastCommitHash;
        this.dataHash = dataHash;
        this.validatorsHash = validatorsHash;
        this.nextValidatorsHash = nextValidatorsHash;
        this.consensusHash = consensusHash;
        this.appHash = appHash;
        this.lastResultsHash = lastResultsHash;
        this.evidenceHash = evidenceHash;
        this.proposerAddress = proposerAddress;
    }
    static fromAmino(_) {
        _;
        throw new Error('Amino not supported');
    }
    toAmino() {
        throw new Error('Amino not supported');
    }
    static fromData(data) {
        const { version, chain_id: chainId, height, time, last_block_id: lastBlockId, last_commit_hash: lastCommitHash, data_hash: dataHash, validators_hash: validatorsHash, next_validators_hash: nextValidatorsHash, consensus_hash: consensusHash, app_hash: appHash, last_results_hash: lastResultsHash, evidence_hash: evidenceHash, proposer_address: proposerAddress, } = data;
        return new Header(version ? version_1.Consensus.fromData(version) : undefined, chainId, height, time ? new Date(time) : undefined, lastBlockId ? BlockID.fromData(lastBlockId) : undefined, lastCommitHash, dataHash, validatorsHash, nextValidatorsHash, consensusHash, appHash, lastResultsHash, evidenceHash, proposerAddress);
    }
    toData() {
        const { version, chainId, height, time, lastBlockId, lastCommitHash, dataHash, validatorsHash, nextValidatorsHash, consensusHash, appHash, lastResultsHash, evidenceHash, proposerAddress, } = this;
        const res = {
            version: version === null || version === void 0 ? void 0 : version.toData(),
            chain_id: chainId,
            height,
            time: time ? time.toISOString().replace(/\.000Z$/, 'Z') : undefined,
            last_block_id: lastBlockId ? lastBlockId.toData() : undefined,
            last_commit_hash: lastCommitHash,
            data_hash: dataHash,
            validators_hash: validatorsHash,
            next_validators_hash: nextValidatorsHash,
            consensus_hash: consensusHash,
            app_hash: appHash,
            last_results_hash: lastResultsHash,
            evidence_hash: evidenceHash,
            proposer_address: proposerAddress,
        };
        return res;
    }
    static fromProto(proto) {
        const { version, chainId, height, time, lastBlockId, lastCommitHash, dataHash, validatorsHash, nextValidatorsHash, consensusHash, appHash, lastResultsHash, evidenceHash, proposerAddress, } = proto;
        return new Header(version ? version_1.Consensus.fromProto(version) : undefined, chainId, height.toString(), time, lastBlockId ? BlockID.fromProto(lastBlockId) : undefined, Buffer.from(lastCommitHash).toString('base64'), Buffer.from(dataHash).toString('base64'), Buffer.from(validatorsHash).toString('base64'), Buffer.from(nextValidatorsHash).toString('base64'), Buffer.from(consensusHash).toString('base64'), Buffer.from(appHash).toString('base64'), Buffer.from(lastResultsHash).toString('base64'), Buffer.from(evidenceHash).toString('base64'), proposerAddress.toString());
    }
    toProto() {
        const { version, chainId, height, time, lastBlockId, lastCommitHash, dataHash, validatorsHash, nextValidatorsHash, consensusHash, appHash, lastResultsHash, evidenceHash, proposerAddress, } = this;
        return types_1.Header.fromPartial({
            version: version === null || version === void 0 ? void 0 : version.toProto(),
            chainId,
            height: Long.fromString(height),
            time,
            lastBlockId: lastBlockId === null || lastBlockId === void 0 ? void 0 : lastBlockId.toProto(),
            lastCommitHash: Buffer.from(lastCommitHash, 'base64'),
            dataHash: Buffer.from(dataHash, 'base64'),
            validatorsHash: Buffer.from(validatorsHash, 'base64'),
            nextValidatorsHash: Buffer.from(nextValidatorsHash, 'base64'),
            consensusHash: Buffer.from(consensusHash, 'base64'),
            appHash: Buffer.from(appHash, 'base64'),
            lastResultsHash: Buffer.from(lastResultsHash, 'base64'),
            evidenceHash: Buffer.from(evidenceHash, 'base64'),
            proposerAddress: Buffer.from(proposerAddress),
        });
    }
}
exports.Header = Header;
class SignedHeader extends json_1.JSONSerializable {
    /**
     * @param header
     * @param commit
     */
    constructor(header, commit) {
        super();
        this.header = header;
        this.commit = commit;
    }
    static fromAmino(_) {
        _;
        throw new Error('Amino not supported');
    }
    toAmino() {
        throw new Error('Amino not supported');
    }
    static fromData(data) {
        const { header, commit } = data;
        return new SignedHeader(header ? Header.fromData(header) : undefined, commit ? Commit.fromData(commit) : undefined);
    }
    toData() {
        const { header, commit } = this;
        const res = {
            header: header === null || header === void 0 ? void 0 : header.toData(),
            commit: commit === null || commit === void 0 ? void 0 : commit.toData(),
        };
        return res;
    }
    static fromProto(proto) {
        return new SignedHeader(proto.header ? Header.fromProto(proto.header) : undefined, proto.commit ? Commit.fromProto(proto.commit) : undefined);
    }
    toProto() {
        const { header, commit } = this;
        return types_1.SignedHeader.fromPartial({
            header: header === null || header === void 0 ? void 0 : header.toProto(),
            commit: commit === null || commit === void 0 ? void 0 : commit.toProto(),
        });
    }
}
exports.SignedHeader = SignedHeader;
/** BlockID */
class BlockID extends json_1.JSONSerializable {
    /**
     * @param hash
     * @param partSetHeader
     */
    constructor(hash, partSetHeader) {
        super();
        this.hash = hash;
        this.partSetHeader = partSetHeader;
    }
    static fromAmino(_) {
        _;
        throw new Error('Amino not supported');
    }
    toAmino() {
        throw new Error('Amino not supported');
    }
    static fromData(data) {
        const { hash, part_set_header: partSetHeader } = data;
        return new BlockID(hash, partSetHeader ? PartSetHeader.fromData(partSetHeader) : undefined);
    }
    toData() {
        const { hash, partSetHeader } = this;
        const res = {
            hash,
            part_set_header: partSetHeader === null || partSetHeader === void 0 ? void 0 : partSetHeader.toData(),
        };
        return res;
    }
    static fromProto(proto) {
        return new BlockID(Buffer.from(proto.hash).toString('base64'), proto.partSetHeader
            ? PartSetHeader.fromProto(proto.partSetHeader)
            : undefined);
    }
    toProto() {
        const { hash, partSetHeader } = this;
        return types_1.BlockID.fromPartial({
            hash: Buffer.from(hash, 'base64'),
            partSetHeader: partSetHeader ? partSetHeader.toProto() : undefined,
        });
    }
}
exports.BlockID = BlockID;
/** PartsetHeader */
class PartSetHeader extends json_1.JSONSerializable {
    /**
     * @param total
     * @param hash
     */
    constructor(total, hash) {
        super();
        this.total = total;
        this.hash = hash;
    }
    static fromAmino(_) {
        _;
        throw new Error('Amino not supported');
    }
    toAmino() {
        throw new Error('Amino not supported');
    }
    static fromData(data) {
        const { total, hash } = data;
        return new PartSetHeader(parseInt(total), hash);
    }
    toData() {
        const { total, hash } = this;
        const res = {
            total: total.toFixed(),
            hash: hash,
        };
        return res;
    }
    static fromProto(proto) {
        return new PartSetHeader(proto.total, Buffer.from(proto.hash).toString('base64'));
    }
    toProto() {
        const { total, hash } = this;
        return types_1.PartSetHeader.fromPartial({
            total: total,
            hash: Buffer.from(hash, 'base64'),
        });
    }
}
exports.PartSetHeader = PartSetHeader;
/** Commit contains the evidence that a block was committed by a set of validators. */
class Commit extends json_1.JSONSerializable {
    /**
     * @param height
     * @param round
     * @param blockId
     * @param signatures
     */
    constructor(height, round, blockId, signatures) {
        super();
        this.height = height;
        this.round = round;
        this.blockId = blockId;
        this.signatures = signatures;
    }
    static fromAmino(_) {
        _;
        throw new Error('Amino not supported');
    }
    toAmino() {
        throw new Error('Amino not supported');
    }
    static fromData(data) {
        const { height, round, block_id: blockId, signatures } = data;
        return new Commit(Long.fromString(height), Number.parseInt(round), blockId ? BlockID.fromData(blockId) : undefined, signatures.map(sig => CommitSig.fromData(sig)));
    }
    toData() {
        const { height, round, blockId, signatures } = this;
        const res = {
            height: height.toString(),
            round: round.toFixed(),
            block_id: blockId === null || blockId === void 0 ? void 0 : blockId.toData(),
            signatures: signatures.map(sig => sig.toData()),
        };
        return res;
    }
    static fromProto(proto) {
        const { height, round, blockId, signatures } = proto;
        return new Commit(height, round, blockId ? BlockID.fromProto(blockId) : undefined, signatures.map(sig => CommitSig.fromProto(sig)));
    }
    toProto() {
        const { height, round, blockId, signatures } = this;
        return types_1.Commit.fromPartial({
            height,
            round,
            blockId: blockId === null || blockId === void 0 ? void 0 : blockId.toProto(),
            signatures: signatures.map(sig => sig.toProto()),
        });
    }
}
exports.Commit = Commit;
/** CommitSig is a part of the Vote included in a Commit. */
class CommitSig extends json_1.JSONSerializable {
    /**
     * @param blockIdFlag
     * @param validatorAddress
     * @param timestamp
     * @param signature
     */
    constructor(blockIdFlag, validatorAddress, timestamp, signature) {
        super();
        this.blockIdFlag = blockIdFlag;
        this.validatorAddress = validatorAddress;
        this.timestamp = timestamp;
        this.signature = signature;
    }
    static fromAmino(_) {
        _;
        throw new Error('Amino not supported');
    }
    toAmino() {
        throw new Error('Amino not supported');
    }
    static fromData(data) {
        const { block_id_flag, validator_address, timestamp, signature } = data;
        return new CommitSig((0, types_1.blockIDFlagFromJSON)(block_id_flag), validator_address, timestamp ? new Date(timestamp) : undefined, signature);
    }
    toData() {
        const { blockIdFlag, validatorAddress, timestamp, signature } = this;
        const res = {
            block_id_flag: (0, types_1.blockIDFlagToJSON)(blockIdFlag),
            validator_address: validatorAddress || '',
            timestamp: timestamp
                ? timestamp.toISOString().replace(/\.000Z$/, 'Z')
                : undefined,
            signature: signature || '',
        };
        return res;
    }
    static fromProto(proto) {
        const { blockIdFlag, validatorAddress, timestamp, signature } = proto;
        return new CommitSig(blockIdFlag, Buffer.from(validatorAddress).toString('base64'), timestamp, Buffer.from(signature).toString('base64'));
    }
    toProto() {
        const { blockIdFlag, validatorAddress, timestamp, signature } = this;
        return types_1.CommitSig.fromPartial({
            blockIdFlag,
            validatorAddress: validatorAddress
                ? Buffer.from(validatorAddress, 'base64')
                : undefined,
            timestamp,
            signature: signature ? Buffer.from(signature, 'base64') : undefined,
        });
    }
}
exports.CommitSig = CommitSig;
class ValidatorSet extends json_1.JSONSerializable {
    /**
     * @param validators
     * @param proposer
     * @param totalVotingPower
     */
    constructor(validators, proposer, totalVotingPower) {
        super();
        this.validators = validators;
        this.proposer = proposer;
        this.totalVotingPower = totalVotingPower;
    }
    static fromAmino(_) {
        _;
        throw new Error('Amino not supported');
    }
    toAmino() {
        throw new Error('Amino not supported');
    }
    static fromData(data) {
        const { validators, proposer, total_voting_power } = data;
        return new ValidatorSet(validators.map(val => Validator.fromData(val)), proposer ? Validator.fromData(proposer) : undefined, Long.fromString(total_voting_power));
    }
    toData() {
        const { validators, proposer, totalVotingPower } = this;
        const res = {
            validators: validators.map(val => val.toData()),
            proposer: proposer === null || proposer === void 0 ? void 0 : proposer.toData(),
            total_voting_power: totalVotingPower.toString(),
        };
        return res;
    }
    static fromProto(proto) {
        const { validators, proposer, totalVotingPower } = proto;
        return new ValidatorSet(validators.map(val => Validator.fromProto(val)), proposer ? Validator.fromProto(proposer) : undefined, totalVotingPower);
    }
    toProto() {
        const { validators, proposer, totalVotingPower } = this;
        return validator_1.ValidatorSet.fromPartial({
            validators: validators.map(val => val.toProto()),
            proposer: (proposer === null || proposer === void 0 ? void 0 : proposer.toProto()) || undefined,
            totalVotingPower,
        });
    }
}
exports.ValidatorSet = ValidatorSet;
class Validator extends json_1.JSONSerializable {
    /**
     * @param address
     * @param pubKey
     * @param votingPower
     * @param proposerPriority
     */
    constructor(address, // not AccAddress in case of opposite chain is not cosmos-sdk based
    pubKey, votingPower, proposerPriority) {
        super();
        this.address = address;
        this.pubKey = pubKey;
        this.votingPower = votingPower;
        this.proposerPriority = proposerPriority;
    }
    static fromAmino(_) {
        _;
        throw new Error('Amino not supported');
    }
    toAmino() {
        throw new Error('Amino not supported');
    }
    static fromData(data) {
        const { address, pub_key: pubKey, voting_power: votingPower, proposer_priority: proposerPriority, } = data;
        return new Validator(address, pubKey ? crypto_1.PublicKey.fromData(pubKey) : undefined, Long.fromString(votingPower), Long.fromString(proposerPriority));
    }
    toData() {
        const { address, pubKey, votingPower, proposerPriority } = this;
        const res = {
            address,
            pub_key: pubKey === null || pubKey === void 0 ? void 0 : pubKey.toData(),
            voting_power: votingPower.toString(),
            proposer_priority: proposerPriority.toString(),
        };
        return res;
    }
    static fromProto(proto) {
        const { address, pubKey, votingPower, proposerPriority } = proto;
        return new Validator(Buffer.from(address).toString('base64'), pubKey ? crypto_1.PublicKey.fromProto(pubKey) : undefined, votingPower, proposerPriority);
    }
    toProto() {
        const { address, pubKey, votingPower, proposerPriority } = this;
        return validator_1.Validator.fromPartial({
            address: Buffer.from(address, 'base64'),
            pubKey: (pubKey === null || pubKey === void 0 ? void 0 : pubKey.toProto()) || undefined,
            votingPower,
            proposerPriority,
        });
    }
}
exports.Validator = Validator;
//# sourceMappingURL=types.js.map