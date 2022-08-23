import fetch from 'node-fetch';
import {Result} from "../helpers/result.js"
import {NodeApi} from "./ext/node.js";
import {AccountApi} from "./ext/account.js";
import {TransactionApi} from "./ext/transactions.js";
import {EventApi} from "./ext/events.js";
import {TableApi} from "./ext/table.js";
import {ModuleApi} from "./ext/modules.js";
import {CoinApi} from "./ext/coins.js";
import {TokenApi} from "./ext/tokens.js";
import {Gas} from "./ext/gas.js";

export class Aptos {
    gas = {
        max_gas_amount: 2000,
        gas_unit_price: 1,
        gas_currency_code: "XUS",
    }
    lastRequest = null

    constructor(url = "", gas = {}) {
        this.url = url
        Object.assign(this.gas, gas)
    }

    _0x(s){
        return s.startsWith('0x') ? s : `0x${s}`
    }

    async _exec(link = '/', query = null, options = {method: "GET"}, resultType = "json"){
        let queryArray = []

        if (query && typeof query === "object") {
            for (let key in query) {
                if (query[key] !== null) queryArray.push(`${key}=${query[key]}`)
            }
            link += `?${queryArray.join("&")}`
        }

        this.lastRequest = `${this.url}${link.startsWith('/') ? link : '/'+link}`

        const response = await fetch(this.lastRequest, options)
        const contentType = response.headers.get('Content-Type')
        const result = await (contentType === 'application/json' ? response.json() : response.text())

        if (response.status > 202) {
            return new Result(false, result.message ? result.message : result.toString(), result)
        }

        return new Result(true, "ok", typeof result === "string" ? JSON.parse(result) : result)
    }

    getLastRequest(){
        return this.lastRequest
    }

    async sleep(timeMs) {
        return new Promise((resolve) => {
            setTimeout(resolve, timeMs)
        })
    }

    moveStructTagToParam(moveStructTag){
        let genericTypeParamsString = ""
        if (moveStructTag.generic_type_params.length > 0) {
            genericTypeParamsString = `<${moveStructTag.generic_type_params.join(",")}>`
        }
        return `${moveStructTag.address}::${moveStructTag.module}::${moveStructTag.name}${genericTypeParamsString}`
    }

    async state(){
        return this._exec()
    }
}

Aptos.use = (...obj) => Object.assign(Aptos.prototype, ...obj)

Object.assign(Aptos.prototype, NodeApi, AccountApi, TransactionApi, EventApi, TableApi, ModuleApi, CoinApi, TokenApi, Gas)

export const aptos = (...args) => new Aptos(...args)