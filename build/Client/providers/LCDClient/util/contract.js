"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getContractEvents = exports.getContractAddress = exports.getCodeId = void 0;
const TxAPI_1 = require("../lcd/api/TxAPI");
function getCodeId(txResult, msgIndex = 0) {
    if ((0, TxAPI_1.isTxError)(txResult) ||
        txResult.logs === undefined ||
        txResult.logs.length === 0) {
        throw new Error('could not parse code id -- tx logs are empty.');
    }
    const codeId = txResult.logs[msgIndex].eventsByType['store_code']['code_id'][0];
    return codeId;
}
exports.getCodeId = getCodeId;
function getContractAddress(txResult, msgIndex = 0, isClassic = false) {
    if ((0, TxAPI_1.isTxError)(txResult) ||
        txResult.logs === undefined ||
        txResult.logs.length === 0) {
        throw new Error('could not parse contract address -- tx logs are empty.');
    }
    let eventName;
    let attributeKey;
    if (isClassic) {
        eventName = 'instantiate_contract';
        attributeKey = 'contract_address';
    }
    else {
        eventName = 'wasm';
        attributeKey = '_contract_address';
    }
    const contractAddress = txResult.logs[msgIndex].eventsByType[eventName][attributeKey][0];
    return contractAddress;
}
exports.getContractAddress = getContractAddress;
function getContractEvents(txResult, msgIndex = 0, isClassic = false) {
    if ((0, TxAPI_1.isTxError)(txResult) ||
        txResult.logs === undefined ||
        txResult.logs.length === 0) {
        throw new Error('could not parse contract events -- tx logs are empty.');
    }
    let eventName;
    let attributeKey;
    if (isClassic) {
        eventName = 'from_contract';
        attributeKey = 'contract_address';
    }
    else {
        eventName = 'instantiate';
        attributeKey = '_contract_address';
    }
    const contractEvents = [];
    for (const event of txResult.logs[msgIndex].events) {
        if (event.type === eventName) {
            let eventData = { contract_address: '' }; // will be overwritten
            let currentContractAddress = event.attributes[0].value;
            for (const att of event.attributes) {
                if (att.key == attributeKey && currentContractAddress !== att.value) {
                    contractEvents.push(eventData);
                    eventData = { contract_address: '' };
                    currentContractAddress = att.value;
                }
                eventData[att.key] = att.value;
            }
            contractEvents.push(eventData);
            return contractEvents;
        }
    }
    throw new Error(`could not find event type ${eventName} in logs`);
}
exports.getContractEvents = getContractEvents;
//# sourceMappingURL=contract.js.map