import {Result} from "../../helpers/result.js";
import {hexstr} from "../../helpers/hex-string.js";
import {APTOS_TOKEN} from "../../helpers/const.js";

export const AccountApi = {
    /**
     * Get address info: {sequence_number, authentication_key}
     * @param {String} address
     * @returns {Promise<Result>}
     */
    async getAccount(address, query = {ledger_version: null}){
        return await this._exec(`/accounts/${this._0x(address)}`, query)
    },

    /**
     * Get resources for specified address
     * @param {String} address
     * @returns {Promise<Result>}
     */
    async getAccountResources(address, query = {ledger_version: null}){
        return await this._exec(`/accounts/${this._0x(address)}/resources`, query)
    },

    /**
     * Get named resource for specified address
     * @param {String} address
     * @param {String} resource
     * @returns {Promise<Result>}
     */
    async getAccountResource(address, resource, query = {ledger_version: null}){
        return await this._exec(`/accounts/${this._0x(address)}/resource/${resource}`, query)
    },

    /**
     * Get modules for specified address
     * @param {String} address
     * @returns {Promise<Result>}
     */
    async getAccountModules(address, query = {ledger_version: null}){
        return await this._exec(`/accounts/${this._0x(address)}/modules`, query)
    },

    /**
     * Get module for specified address
     * @param {String} address
     * @param {String} module
     * @returns {Promise<Result>}
     */
    async getAccountModule(address, module, query = {ledger_version: null}){
        return await this._exec(`/accounts/${this._0x(address)}/module/${module}`, query)
    },

    /**
     * Get account transactions
     * @param {String} address
     * @param {Object} query, default {start: 1, limit: 24}
     * @returns {Promise<*>}
     */
    async getAccountTransactions(address, query = {start: 1, limit: 25}){
        return await this.getTransactions(address, query)
    },

    /**
     * Get last transactions for specified address
     * @param address
     * @param limit, count transactions in response
     * @returns {Promise<Result|*>}
     */
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
    async getAccountBalance(address, coinStruct = APTOS_TOKEN, query = {ledger_version: null}){
        const resource = await this.getAccountResource(address, `0x1::coin::CoinStore<${coinStruct}>`, query)
        if (!resource.ok) {
            return new Result(false, "Error getting address balance", resource.error)
        }
        return new Result(true, "ok", {
            coin: coinStruct,
            balance: +resource.payload.data.coin.value
        })
    },

    /**
     * Create account
     * @param signer
     * @param newAccount
     * @returns {Promise<Result|undefined>}
     */
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
    },

    /**
     * Rotate authentication key for specified account
     * @param {Account} account
     * @param {String} newAuthKey
     * @returns {Promise<Result|undefined>}
     */
    async rotateAccountAuthKey(account, newAuthKey){
        const payload = {
            type: "script_function_payload",
            function: "0x1::Account::rotate_authentication_key",
            type_arguments: [],
            arguments: [
                hexstr(newAuthKey).noPrefix(),
            ]
        }

        return await this.submitTransaction(account, payload)
    }
}