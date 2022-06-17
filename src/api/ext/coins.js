import {DEFAULT_COIN} from "../../helpers/const.js";

export const CoinApi = {
    async initCoin(signer, coinHolder, coinVal, coinName, coinSymbol, coinDec = 0){
        const payload = {
            type: "script_function_payload",
            function: `0x1::ManagedCoin::initialize`,
            type_arguments: [`0x${this._0x(coinHolder)}::${coinVal}`],
            arguments: [
                Buffer.from(coinName, "utf-8").toString("hex"),
                Buffer.from(coinSymbol.toUpperCase(), "utf-8").toString("hex"),
                coinDec.toString(),
                false,
            ],
        }

        return await this.submitTransaction(signer, payload)
    },

    async createCoin(signer, coinHolder, coinVal){
        const payload = {
            "type": "script_function_payload",
            "function": "0x1::Coin::register",
            "type_arguments": [`0x${coinHolder}::${coinVal}`],
            "arguments": []
        }

        return await this.submitTransaction(signer, payload)
    },

    async mintCoin(signer, coinHolder, receiver, coinVal, amount){
        const payload = {
            type: "script_function_payload",
            function: `0x1::ManagedCoin::mint`,
            type_arguments: [`0x${coinHolder}::${coinVal}`],
            arguments: [
                receiver,
                amount.toString()
            ],
        }

        return await this.submitTransaction(signer, payload)
    },

    async sendCoin(signer, receiver, amount = 0, coin = DEFAULT_COIN){
        const payload = {
            type: 'script_function_payload',
            function: '0x1::Coin::transfer',
            type_arguments: [coin],
            arguments: [this._0x(receiver), amount.toString()],
        }

        return await this.submitTransaction(signer, payload)
    },
}