"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MsgMultiSend = void 0;
const json_1 = require("../../../util/json");
const Coins_1 = require("../../Coins");
const any_1 = require("@terra-money/legacy.proto/google/protobuf/any");
// there's no difference between two protos
//import { MsgMultiSend as MsgMultiSend_legacy_pb } from '@terra-money/legacy.proto/cosmos/bank/v1beta1/tx';
const tx_1 = require("@terra-money/terra.proto/cosmos/bank/v1beta1/tx");
const bank_1 = require("@terra-money/terra.proto/cosmos/bank/v1beta1/bank");
/**
 * If you have multiple senders and/or multiple recipients, you can use MsgMultiSend,
 * which can batch together the senders and recipients in one message to save on gas
 * fees.
 *
 * Specify the senders and recipients and their corresponding deposit contribution /
 * receiving amounts with [[MsgMultiSend.Input]] or [[MsgMultiSend.Output]].
 *
 * Example:
 *
 * ```ts
 * import { MsgMultiSend } from "@terra-money/terra.js";
 *
 * const inputs: MsgMultiSend.Input[] = [
 *    new MsgMultiSend.Input(
 *      'terra105rz2q5a4w7nv7239tl9c4px5cjy7axx3axf6p',
 *      {
 *        ukrw: 123123,
 *      })
 *    ),
 *    new MsgMultiSend.Input('terra105rz2q5a4w7nv7239tl9c4px5cjy7axx3axfad', [
 *      new Coin('ujmes', 123123),
 *    ]),
 *  ];
 *   const outputs: MsgMultiSend.Output[] = [
 *    new MsgMultiSend.Output(
 *      'terra105rz2q5a4w7nv7239tl9c4px5cjy7axx3axfad',
 *        {
 *          ukrw: 123123,
 *        }
 *    ),
 *    new MsgMultiSend.Output('terra105rz2q5a4w7nv7239tl9c4px5cjy7axx3axfga',
 *      {
 *        ujmes: 123123,
 *      }
 *    ),
 *  ];
 *  const multisend = new MsgMultiSend(inputs, outputs);
 * ```
 */
class MsgMultiSend extends json_1.JSONSerializable {
    /**
     * @param inputs inputs
     * @param outputs outputs
     */
    constructor(inputs, outputs) {
        super();
        this.inputs = inputs;
        this.outputs = outputs;
    }
    static fromAmino(data, _) {
        _;
        const { value: { inputs, outputs }, } = data;
        return new MsgMultiSend(inputs.map(i => MsgMultiSend.Input.fromAmino(i)), outputs.map(o => MsgMultiSend.Output.fromAmino(o)));
    }
    toAmino(isClassic) {
        const { inputs, outputs } = this;
        return {
            type: isClassic ? 'bank/MsgMultiSend' : 'cosmos-sdk/MsgMultiSend',
            value: {
                inputs: inputs.map(i => i.toAmino()),
                outputs: outputs.map(o => o.toAmino()),
            },
        };
    }
    static fromData(data, _) {
        _;
        const { inputs, outputs } = data;
        return new MsgMultiSend(inputs.map(i => MsgMultiSend.Input.fromData(i)), outputs.map(o => MsgMultiSend.Output.fromData(o)));
    }
    toData(_) {
        _;
        const { inputs, outputs } = this;
        return {
            '@type': '/cosmos.bank.v1beta1.MsgMultiSend',
            inputs: inputs.map(i => i.toData()),
            outputs: outputs.map(o => o.toData()),
        };
    }
    static fromProto(proto, _) {
        _;
        return new MsgMultiSend(proto.inputs.map(i => MsgMultiSend.Input.fromProto(i)), proto.outputs.map(o => MsgMultiSend.Output.fromProto(o)));
    }
    toProto(_) {
        _;
        const { inputs, outputs } = this;
        return tx_1.MsgMultiSend.fromPartial({
            inputs: inputs.map(i => i.toProto()),
            outputs: outputs.map(i => i.toProto()),
        });
    }
    packAny(isClassic) {
        return any_1.Any.fromPartial({
            typeUrl: '/cosmos.bank.v1beta1.MsgMultiSend',
            value: tx_1.MsgMultiSend.encode(this.toProto(isClassic)).finish(),
        });
    }
    static unpackAny(msgAny, isClassic) {
        return MsgMultiSend.fromProto(tx_1.MsgMultiSend.decode(msgAny.value), isClassic);
    }
}
exports.MsgMultiSend = MsgMultiSend;
(function (MsgMultiSend) {
    class Input extends json_1.JSONSerializable {
        /**
         * @param address address
         * @param coinsInput coins-compatible input
         */
        constructor(address, coinsInput) {
            super();
            this.address = address;
            this.coins = new Coins_1.Coins(coinsInput);
        }
        toAmino(_) {
            _;
            const { address, coins } = this;
            return {
                address,
                coins: coins.toAmino(),
            };
        }
        static fromAmino(data, _) {
            _;
            const { address, coins } = data;
            return new Input(address, Coins_1.Coins.fromAmino(coins));
        }
        toData(_) {
            _;
            const { address, coins } = this;
            return {
                address,
                coins: coins.toData(),
            };
        }
        static fromData(data, _) {
            _;
            const { address, coins } = data;
            return new Input(address, Coins_1.Coins.fromData(coins));
        }
        toProto(_) {
            _;
            const { address, coins } = this;
            return bank_1.Input.fromPartial({
                address,
                coins: coins.toProto(),
            });
        }
        static fromProto(proto, _) {
            _;
            return new Input(proto.address, Coins_1.Coins.fromProto(proto.coins));
        }
    }
    MsgMultiSend.Input = Input;
    class Output extends json_1.JSONSerializable {
        /**
         * @param address address
         * @param coinsOutput coins-compatible input
         */
        constructor(address, coinsInput) {
            super();
            this.address = address;
            this.coins = new Coins_1.Coins(coinsInput);
        }
        toAmino(_) {
            _;
            const { address, coins } = this;
            return {
                address,
                coins: coins.toAmino(),
            };
        }
        static fromAmino(data, _) {
            _;
            const { address, coins } = data;
            return new Output(address, Coins_1.Coins.fromAmino(coins));
        }
        toData(_) {
            _;
            const { address, coins } = this;
            return {
                address,
                coins: coins.toData(),
            };
        }
        static fromData(data, _) {
            _;
            const { address, coins } = data;
            return new Output(address, Coins_1.Coins.fromData(coins));
        }
        toProto(_) {
            _;
            const { address, coins } = this;
            return bank_1.Output.fromPartial({
                address,
                coins: coins.toProto(),
            });
        }
        static fromProto(proto, _) {
            _;
            return new Output(proto.address, Coins_1.Coins.fromProto(proto.coins));
        }
    }
    MsgMultiSend.Output = Output;
})(MsgMultiSend = exports.MsgMultiSend || (exports.MsgMultiSend = {}));
//# sourceMappingURL=MsgMultiSend.js.map