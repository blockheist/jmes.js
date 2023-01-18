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
exports.IbcAPI = void 0;
const BaseAPI_1 = require("./BaseAPI");
const IdentifiedClient_1 = require("../../core/ibc/core/client/IdentifiedClient");
//import { Params as ControllerParams } from '../../../core/ibc/applications/interchain-account/controller/Params';
const Params_1 = require("../../core/ibc/applications/interchain-account/host/Params");
const channel_1 = require("../../core/ibc/core/channel");
const connection_1 = require("../../core/ibc/core/connection");
const Height_1 = require("../../core/ibc/core/client/Height");
class IbcAPI extends BaseAPI_1.BaseAPI {
    constructor(lcd) {
        super(lcd.apiRequester);
        this.lcd = lcd;
    }
    /**
     * query all the IBC channels of a chain
     */
    channels(params = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.c
                .get(`/ibc/core/channel/v1/channels`, params)
                .then(d => [d.channels.map(channel_1.Channel.fromData), d.pagination]);
        });
    }
    /**
     * query the information of the port at given channel
     * @param channel_id channel identifier
     * @param port_id port name
     */
    port(channel_id, port_id, params = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.c
                .get(`/ibc/core/channel/v1/channels/${channel_id}/ports/${port_id}`, params)
                .then(d => {
                return {
                    channel: channel_1.Channel.fromData(d.channel),
                    proof: d.proof,
                    proof_height: Height_1.Height.fromData(d.proof_height),
                };
            });
        });
    }
    /**
     *  query all the IBC connections of a chain
     */
    connections(params = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.c
                .get(`/ibc/core/connection/v1/connections`, params)
                .then(d => [
                d.connections.map(connection_1.IdentifiedConnection.fromData),
                d.pagination,
            ]);
        });
    }
    /**
     * query an IBC connection end
     * @param connection_id connection unique identifier
     */
    connection(connection_id, params = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.c
                .get(`/ibc/core/connection/v1/connections/${connection_id}`, params)
                .then(d => connection_1.IdentifiedConnection.fromData(d.connection));
        });
    }
    /**
     * query all the channels associated with a connection end
     * @param connection_id connection unique identifier
     */
    connectionChannels(connection_id, params = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.c
                .get(`/ibc/core/channel/v1/connections/${connection_id}/channels`, params)
                .then(d => [
                d.channels.map(channel_1.Channel.fromData),
                Height_1.Height.fromData(d.height),
                d.pagination,
            ]);
        });
    }
    /**
     * Gets the current transfer application parameters.
     */
    parameters(params = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.c
                .get(`/ibc/client/v1/params`, params)
                .then(({ params: d }) => ({
                allowed_clients: d.allowed_clients,
            }));
        });
    }
    /**
     * query all the IBC light clients of a chain
     */
    clientStates(params = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.c
                .get(`/ibc/core/client/v1/client_states`, params)
                .then(d => [
                d.client_states.map(IdentifiedClient_1.IdentifiedClientState.fromData),
                d.pagination,
            ]);
        });
    }
    /**
     * query an IBC light client
     * @param client_id client state unique identifier
     * @returns
     */
    clientState(client_id, params = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.c
                .get(`/ibc/core/client/v1/client_states/${client_id}`, params)
                .then(d => IdentifiedClient_1.IdentifiedClientState.fromData(d.client_state));
        });
    }
    /**
     * query the status of an IBC light client
     * @param client_id client state unique identifier
     * @returns
     */
    clientStatus(client_id, params = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.c
                .get(`/ibc/core/client/v1/client_status/${client_id}`, params)
                .then();
        });
    }
    /**
     * query all the consensus state associated with a given client
     * @param client_id client identifier
     * @returns
     */
    consensusStates(client_id, params = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.c
                .get(`/ibc/core/client/v1/consensus_states/${client_id}`, params)
                .then();
        });
    }
    /**
     * Gets paramaters for interchain account controller.
     * NOTE: CURRENTLY LCD DOESN'T SERVE THE ENDPOINT
    /*
    public async interchainAccountControllerParameters(
      params: APIParams = {}
    ): Promise<ControllerParams> {
      return this.c
        .get<{ params: ControllerParams.Data }>(
          `/ibc/apps/interchain_accounts/controller/v1/params`,
          params
        )
        .then(({ params: d }) => ControllerParams.fromData(d));
    }
    */
    /**
     * Gets paramaters for interchain account host.
     */
    interchainAccountHostParameters(params = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.c
                .get(`/ibc/apps/interchain_accounts/host/v1/params`, params)
                .then(({ params: d }) => Params_1.Params.fromData(d));
        });
    }
}
exports.IbcAPI = IbcAPI;
//# sourceMappingURL=IbcAPI.js.map