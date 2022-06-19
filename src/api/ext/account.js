import {Result} from "../../helpers/result.js";
import {TEST_COIN} from "../../helpers/const.js";

export const AccountApi = {
    async getAccount(address){
        return await this._exec(`/accounts/${this._0x(address)}`)
    },

    async getAccountResources(address){
        return await this._exec(`/accounts/${this._0x(address)}/resources`)
    },

    async getAccountResource(address, resource){
        return await this._exec(`/accounts/${this._0x(address)}/resource/${resource}`)
    },

    async getAccountModules(address){
        return await this._exec(`/accounts/${this._0x(address)}/modules`)
    },

    async getAccountModule(address, module){
        return await this._exec(`/accounts/${this._0x(address)}/module/${module}`)
    },

    async getAccountTransactions(address, query = {start: 1, limit: 25}){
        return await this.getTransactions(address, query)
    },

    async getAccountTransactionsLast(address, limit = 1){
        const account = await this.getAccount(address)

        if (!account.ok) {
            return new Result(false, "Can't retrieve account information from the blockchain!", account.error)
        }

        const sn = account.payload.sequence_number

        return await this.getAccountTransactions(address, {limit, start: sn - limit})
    },

    /**
     * Get account balance
     * @param {String} address
     * @param {String} coinStruct "0xCoinHolderAddress::CoinPrefix::CoinSuffix"
     * @returns {Promise<Result>}
     */
    async getAccountBalance(address, coinStruct = TEST_COIN){
        const resource = await this.getAccountResource(address, `0x1::Coin::CoinStore<${coinStruct}>`)
        if (!resource.ok) {
            return new Result(false, "Error getting address balance", resource.error)
        }
        return new Result(true, "ok", {
            coin: coinStruct,
            balance: +resource.payload.data.coin.value
        })
    },

    async createAccount(signer, newAccount){
        const payload = {
            "type": "script_function_payload",
            "function": "0x1::AptosAccount::create_account",
            "type_arguments": [],
            "arguments": [
                newAccount.address(),
                this._0x(newAccount.pubKey()), // ???
            ]
        }
        return await this.submitTransaction(signer, payload)
    }
}