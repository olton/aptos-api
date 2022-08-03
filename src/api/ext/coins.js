import {Result} from "../../helpers/result.js";

export const APTOS_TOKEN = "0x1::aptos_coin::AptosCoin"

export const CoinApi = {
    /**
     * Create right coin structured name -> 0xCoinHolderAddress::CoinPrefix::CoinSuffix, 0x1::TestCoin::TestCoin
     * @param coinHolder
     * @param moduleName
     * @param structName
     * @returns {string}
     */
    coinStruct(coinHolder, moduleName, structName){
        return `${this._0x(coinHolder)}::${moduleName}::${structName}`
    },

    /**
     * Initialization coin
     * @param signer
     * @param {String} coinStruct, to create it, use method coinStruct(...)
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

    async registerCoin(signer, coinStruct){
        const payload = {
            "type": "script_function_payload",
            "function": "0x1::Coin::register",
            "type_arguments": [`${coinStruct}`],
            "arguments": []
        }

        return await this.submitTransaction(signer, payload)
    },

    async createCoin(signer, coinStruct, coinName, coinSymbol, coinDec = 0){
        const initialization = await this.initCoin(signer, coinStruct, coinName, coinSymbol, coinDec)

        if (!initialization.ok) {
            return new Result(false, "Can't init coin!", initialization.error)
        }

        if (!initialization.payload.success) {
            return new Result(false, `Coin initialization error! ${initialization.payload.vm_status}`, initialization.payload)
        }

        const registration = await this.registerCoin(signer, coinStruct)

        if (!registration.ok) {
            return new Result(false, "Can't register coin!", initialization.error)
        }

        if (!registration.payload.success) {
            return new Result(false, `Coin registration error! ${registration.payload.vm_status}`, registration.payload)
        }

        return new Result(true, {initialization, registration})
    },

    async mintCoin(signer, receiver, coinStruct, amount){
        const payload = {
            type: "script_function_payload",
            function: `0x1::ManagedCoin::mint`,
            type_arguments: [coinStruct],
            arguments: [
                receiver,
                amount.toString()
            ],
        }

        return await this.submitTransaction(signer, payload)
    },

    async sendCoins(signer, receiver, amount = 0, coin = APTOS_TOKEN){
        const payload = {
            type: 'script_function_payload',
            function: '0x1::coin::transfer',
            type_arguments: [coin],
            arguments: [this._0x(receiver), amount.toString()],
        }
        return await this.submitTransaction(signer, payload)
    },

    async getDepositedCoins(address, coinStruct){
        return await this.getEventsByHandle(
            this._0x(address),
            `0x1::Coin::CoinStore<${coinStruct}>`,
            "deposit_events"
        )
    },

    async getWithdrawCoins(address, coinStruct){
        return await this.getEventsByHandle(
            this._0x(address),
            `0x1::Coin::CoinStore<${coinStruct}>`,
            "withdraw_events"
        )
    },

    async delegateCoins(){},
}