import {DEFAULT_COIN} from "../../helpers/const.js";
import {hexstr} from "../../helpers/hex-string.js";

export const CoinApi = {
    /**
     * Initialization coin
     * @param signer
     * @param {String} coinStruct, to create it, use method coinName(...)
     * @param coinName
     * @param coinSymbol
     * @param coinDec
     * @returns {Promise<Result|undefined>}
     */
    async initCoin(signer, coinStruct, coinName, coinSymbol, coinDec = 0){
        const payload = {
            type: "script_function_payload",
            function: `0x1::ManagedCoin::initialize`,
            type_arguments: [`${coinStruct}`],
            arguments: [
                Buffer.from(coinName, "utf-8").toString("hex"),
                Buffer.from(coinSymbol.toUpperCase(), "utf-8").toString("hex"),
                coinDec.toString(),
                false,
            ],
        }

        return await this.submitTransaction(signer, payload)
    },

    async createCoin(signer, coinStruct){
        const payload = {
            "type": "script_function_payload",
            "function": "0x1::Coin::register",
            "type_arguments": [`${coinStruct}`],
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

    /**
     * Create right coin structured name -> 0xCoinHolderAddress::CoinPrefix::CoinSuffix
     * @param coinHolder
     * @param coinPrefix
     * @param coinSuffix
     * @returns {string}
     */
    coinName(coinHolder, coinPrefix, coinSuffix){
        return `${this._0x(coinHolder)}::${coinPrefix}::${coinSuffix}`
    }
}