import fetch from 'node-fetch';
import {Result} from "../helpers/result.js"

export class Api {
    options = {}

    constructor(url = "", options) {
        this.url = url
        Object.assign(this.options, options)
    }

    _0x(s){
        return s.startsWith('0x') ? s : `0x${s}`
    }

    async _exec(link = '', query = null, options = {method: "GET"}, resultType = "json"){
        let queryArray = []

        if (query && typeof query === "object") {
            for (let key in query) {
                if (query[key] !== null) queryArray.push(`${key}=${query[key]}`)
            }
            link += `?${queryArray.join("&")}`
        }

        const response = await fetch(`${this.url}/${link}`, options)
        const contentType = response.headers.get('Content-Type')
        const result = contentType === 'application/json' ? await response.json() : await response.text()

        if (response.status !== 200) {
            return new Result(false, result.message ? result.message : result.toString(), result)
        }

        return new Result(true, "ok", result)
    }

    state(){
        return this._exec()
    }
}

Api.use = (...obj) => Object.assign(Api.prototype, ...obj)