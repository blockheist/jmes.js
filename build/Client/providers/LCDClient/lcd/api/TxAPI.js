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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TxAPI = exports.SimulateResponse = exports.isTxError = void 0;
const BaseAPI_1 = require("./BaseAPI");
const core_1 = require("../../core");
const hash_1 = require("../../util/hash");
const core_2 = require("../../core");
function isTxError(x) {
    return (x.code !== undefined &&
        x.code !== 0 &&
        x.code !== '0');
}
exports.isTxError = isTxError;
class SimulateResponse {
    constructor(gas_info, result) {
        this.gas_info = gas_info;
        this.result = result;
    }
    static fromData(data) {
        return new SimulateResponse({
            gas_wanted: Number.parseInt(data.gas_info.gas_wanted),
            gas_used: Number.parseInt(data.gas_info.gas_used),
        }, data.result);
    }
}
exports.SimulateResponse = SimulateResponse;
class TxAPI extends BaseAPI_1.BaseAPI {
    constructor(lcd) {
        super(lcd.apiRequester);
        this.lcd = lcd;
    }
    /**
     * Looks up a transaction on the blockchain, addressed by its hash
     * @param txHash transaction's hash
     */
    txInfo(txHash, params = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.c
                .getRaw(`/cosmos/tx/v1beta1/txs/${txHash}`, params)
                .then(v => core_1.TxInfo.fromData(v.tx_response, this.lcd.config.isClassic));
        });
    }
    /**
     * Builds a [[StdSignMsg]] that is ready to be signed by a [[Key]]. The appropriate
     * account number and sequence will be fetched live from the blockchain and added to
     * the resultant [[StdSignMsg]]. If no fee is provided, fee will be automatically
     * estimated using the parameters, simulated using a "dummy fee" with sourceAddress's
     * nonzero denominations in its balance.
     *
     * @param sourceAddress account address of signer
     * @param options TX generation options
     */
    create(signers, options) {
        return __awaiter(this, void 0, void 0, function* () {
            let { fee } = options;
            const { msgs, memo, timeoutHeight } = options;
            const signerDatas = [];
            for (const signer of signers) {
                let sequenceNumber = signer.sequenceNumber;
                let publicKey = signer.publicKey;
                if (sequenceNumber === undefined || !publicKey) {
                    const account = yield this.lcd.auth.accountInfo(signer.address);
                    if (sequenceNumber === undefined) {
                        sequenceNumber = account.getSequenceNumber();
                    }
                    if (!publicKey) {
                        publicKey = account.getPublicKey();
                    }
                }
                signerDatas.push({
                    sequenceNumber,
                    publicKey,
                });
            }
            if (fee === undefined) {
                fee = yield this.lcd.tx.estimateFee(signerDatas, options);
            }
            return new core_1.Tx(new core_1.TxBody(msgs, memo || '', timeoutHeight || 0), new core_1.AuthInfo([], fee), []);
        });
    }
    /**
     * Looks up transactions on the blockchain for the block height. If height is undefined,
     * gets the transactions for the latest block.
     * @param height block height
     */
    txInfosByHeight(height) {
        return __awaiter(this, void 0, void 0, function* () {
            const blockInfo = yield this.lcd.tendermint.blockInfo(height);
            const { txs } = blockInfo.block.data;
            if (!txs) {
                return [];
            }
            else {
                const txhashes = txs.map(txdata => (0, hash_1.hashToHex)(txdata));
                const txInfos = [];
                for (const txhash of txhashes) {
                    txInfos.push(yield this.txInfo(txhash));
                }
                return txInfos;
            }
        });
    }
    /**
     * Estimates the transaction's fee by simulating it within the node
     * @param sourceAddress address that will pay the bill
     * @param msgs standard messages
     * @param options options for fee estimation
     */
    estimateFee(signers, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const gasPrices = options.gasPrices || this.lcd.config.gasPrices;
            const gasAdjustment = options.gasAdjustment || this.lcd.config.gasAdjustment;
            const feeDenoms = options.feeDenoms || [
                this.lcd.config.isClassic ? 'ujmes' : 'ujmes',
            ];
            let gas = options.gas;
            let gasPricesCoins;
            if (gasPrices) {
                gasPricesCoins = new core_1.Coins(gasPrices);
                if (feeDenoms) {
                    const gasPricesCoinsFiltered = gasPricesCoins.filter(c => feeDenoms.includes(c.denom));
                    if (gasPricesCoinsFiltered.toArray().length > 0) {
                        gasPricesCoins = gasPricesCoinsFiltered;
                    }
                }
            }
            const txBody = new core_1.TxBody(options.msgs, options.memo || '');
            const authInfo = new core_1.AuthInfo([], new core_1.Fee(0, new core_1.Coins()));
            const tx = new core_1.Tx(txBody, authInfo, []);
            // fill empty signature
            tx.appendEmptySignatures(signers);
            // simulate gas
            if (!gas || gas === 'auto' || gas === '0') {
                gas = (yield this.estimateGas(tx, { gasAdjustment })).toString();
            }
            const feeAmount = gasPricesCoins
                ? gasPricesCoins.mul(gas).toIntCeilCoins()
                : this.lcd.config.isClassic
                    ? '0ujmes'
                    : '0ujmes';
            return new core_1.Fee(Number.parseInt(gas), feeAmount, '', '');
        });
    }
    estimateGas(tx, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const gasAdjustment = (options === null || options === void 0 ? void 0 : options.gasAdjustment) || this.lcd.config.gasAdjustment;
            // append empty signatures if there's no signatures in tx
            let simTx = tx;
            if (tx.signatures.length <= 0) {
                if (!(options && options.signers && options.signers.length > 0)) {
                    throw Error('cannot append signature');
                }
                const authInfo = new core_1.AuthInfo([], new core_1.Fee(0, new core_1.Coins()));
                simTx = new core_1.Tx(tx.body, authInfo, []);
                simTx.appendEmptySignatures(options.signers);
            }
            const simulateRes = yield this.c
                .post(`/cosmos/tx/v1beta1/simulate`, {
                tx_bytes: this.encode(simTx),
            })
                .then(d => SimulateResponse.fromData(d));
            return new core_1.Dec(gasAdjustment).mul(simulateRes.gas_info.gas_used).toNumber();
        });
    }
    computeTax() {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error('Tax was removed from network');
        });
    }
    /**
     * Encode a transaction to base64-encoded protobuf
     * @param tx transaction to encode
     */
    encode(tx) {
        return Buffer.from(tx.toBytes(this.lcd.config.isClassic)).toString('base64');
    }
    /**
     * Decode a transaction from base64-encoded protobuf
     * @param tx transaction string to decode
     */
    decode(encodedTx) {
        return core_1.Tx.fromBuffer(Buffer.from(encodedTx, 'base64'), this.lcd.config.isClassic);
    }
    /**
     * Get the transaction's hash
     * @param tx transaction to hash
     */
    hash(tx) {
        return __awaiter(this, void 0, void 0, function* () {
            const txBytes = yield this.encode(tx);
            return (0, hash_1.hashToHex)(txBytes);
        });
    }
    _broadcast(tx, mode) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(JSON.stringify({
                tx,
                mode,
            }));
            return yield this.c.post(`/cosmos/tx/v1beta1/txs`, {
                tx_bytes: this.encode(tx),
                mode,
            });
        });
    }
    /**
     * Broadcast the transaction using "sync" mode, then wait for its inclusion in a block.
     *
     * This method polls txInfo using the txHash to confirm the transaction's execution.
     *
     * @param tx      transaction to broadcast
     * @param timeout time in milliseconds to wait for transaction to be included in a block. defaults to 30000
     */
    broadcast(tx, timeout = 30000) {
        return __awaiter(this, void 0, void 0, function* () {
            const POLL_INTERVAL = 500;
            //@ts-ignore
            const { tx_response: txResponse } = yield this._broadcast(tx, 'BROADCAST_MODE_SYNC');
            if (txResponse.code != undefined && txResponse.code != 0) {
                const result = {
                    height: Number.parseInt(txResponse.height),
                    txhash: txResponse.txhash,
                    raw_log: txResponse.raw_log,
                    code: txResponse.code,
                    codespace: txResponse.codespace,
                    gas_used: 0,
                    gas_wanted: 0,
                    timestamp: '',
                    logs: [],
                };
                return result;
            }
            let txInfo;
            for (let i = 0; i <= timeout / POLL_INTERVAL; i++) {
                try {
                    txInfo = yield this.txInfo(txResponse.txhash);
                }
                catch (error) {
                    // Errors when transaction is not found.
                }
                if (txInfo) {
                    break;
                }
                yield new Promise(resolve => setTimeout(resolve, POLL_INTERVAL));
            }
            if (!txInfo) {
                throw new Error(`Transaction was not included in a block before timeout of ${timeout}ms`);
            }
            return {
                txhash: txInfo.txhash,
                raw_log: txInfo.raw_log,
                gas_wanted: txInfo.gas_wanted,
                gas_used: txInfo.gas_used,
                height: +txInfo.height,
                logs: (txInfo.logs || []).map(l => core_2.TxLog.fromData(l)),
                code: txInfo.code,
                codespace: txInfo.codespace,
                timestamp: txInfo.timestamp,
            };
        });
    }
    /**
     * Broadcast the transaction using the "block" mode, waiting for its inclusion in the blockchain.
     * @param tx transaction to broadcast
     */
    broadcastBlock(tx) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._broadcast(tx, 'BROADCAST_MODE_BLOCK').then(({ tx_response: d }) => {
                const blockResult = {
                    txhash: d.txhash,
                    raw_log: d.raw_log,
                    gas_wanted: Number.parseInt(d.gas_wanted),
                    gas_used: Number.parseInt(d.gas_used),
                    height: +d.height,
                    logs: d.logs.map(l => core_2.TxLog.fromData(l)),
                    code: d.code,
                    codespace: d.codespace,
                    data: d.data,
                    info: d.info,
                    timestamp: d.timestamp,
                };
                return blockResult;
            });
        });
    }
    /**
     * NOTE: This is not a synchronous function and is unconventionally named. This function
     * can be await as it returns a `Promise`.
     *
     * Broadcast the transaction using the "sync" mode, returning after CheckTx() is performed.
     * @param tx transaction to broadcast
     */
    broadcastSync(tx) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._broadcast(tx, 'BROADCAST_MODE_SYNC').then(({ tx_response: d }) => {
                const blockResult = {
                    height: +d.height,
                    txhash: d.txhash,
                    raw_log: d.raw_log,
                };
                if (d.code) {
                    blockResult.code = d.code;
                }
                if (d.codespace) {
                    blockResult.codespace = d.codespace;
                }
                return blockResult;
            });
        });
    }
    /**
     * Broadcast the transaction using the "async" mode, returns immediately (transaction might fail).
     * @param tx transaction to broadcast
     */
    broadcastAsync(tx) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._broadcast(tx, 'BROADCAST_MODE_ASYNC').then(({ tx_response: d }) => ({
                height: +d.height,
                txhash: d.txhash,
            }));
        });
    }
    /**
     * Search for transactions based on event attributes.
     * @param options
     */
    search(options) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const params = new URLSearchParams();
            // build search params
            (_a = options.events) === null || _a === void 0 ? void 0 : _a.forEach(v => params.append('events', v.key === 'tx.height' ? `${v.key}=${v.value}` : `${v.key}='${v.value}'`));
            delete options['events'];
            Object.entries(options).forEach(v => {
                params.append(v[0], v[1]);
            });
            return this.c
                .getRaw(`/cosmos/tx/v1beta1/txs`, params)
                .then(d => {
                return {
                    txs: d.tx_responses.map(tx_response => core_1.TxInfo.fromData(tx_response, this.lcd.config.isClassic)),
                    pagination: d.pagination,
                };
            });
        });
    }
}
exports.TxAPI = TxAPI;
//# sourceMappingURL=TxAPI.js.map