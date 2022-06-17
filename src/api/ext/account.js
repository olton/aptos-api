import {Result} from "../../helpers/result.js";
import {DEFAULT_COIN} from "../../helpers/const.js";

export const AccountApi = {
    getAccount(address){
        return this._exec(`/accounts/${this._0x(address)}`)
    },

    getAccountResources(address){
        return this._exec(`/accounts/${this._0x(address)}/resources`)
    },

    getAccountResource(address, resource){
        return this._exec(`/accounts/${this._0x(address)}/resource/${resource}`)
    },

    getAccountModules(address){
        return this._exec(`/accounts/${this._0x(address)}/modules`)
    },

    getAccountModule(address, module){
        return this._exec(`/accounts/${this._0x(address)}/module/${module}`)
    },

    getAccountTransactions(address, query = {start: 1, limit: 25}){
        return this.getTransactions(address, query)
    },

    async getAccountBalance(address, coin = DEFAULT_COIN){
        const resource = await this.getAccountResource(address, `0x1::Coin::CoinStore<${coin}>`)
        if (!resource.ok) {
            return new Result(false, "Error getting address balance", resource.error)
        }
        return new Result(true, "ok", {
            coin,
            balance: +resource.payload.data.coin.value
        })
    },

    createAccount(signer, newAccount, gas){
        const payload = {
            "type": "script_function_payload",
            "function": "0x1::AptosAccount::create_account",
            "type_arguments": [],
            "arguments": [
                newAccount.address(),
                this._0x(newAccount.pubKey()), // ???
            ]
        }
        return this.submitTransaction(signer, payload, gas)
    }
}