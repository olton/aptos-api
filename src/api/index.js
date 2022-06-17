import fetch from 'node-fetch';
import {Result} from "../helpers/result.js"

export class Aptos {
    options = {}
    lastRequest = null

    constructor(url = "", options = {}, gas = {}) {
        this.url = url
        Object.assign(this.options, options)
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
        const result = contentType === 'application/json' ? await response.json() : await response.text()

        if (response.status !== 200) {
            return new Result(false, result.message ? result.message : result.toString(), result)
        }

        return new Result(true, "ok", result)
    }

    getLastRequest(){
        return this.lastRequest
    }

    async sleep(timeMs) {
        return new Promise((resolve) => {
            setTimeout(resolve, timeMs)
        })
    }

    async state(){
        return this._exec()
    }
}

Aptos.use = (...obj) => Object.assign(Aptos.prototype, ...obj)

export const aptos = (...args) => new Aptos(...args)