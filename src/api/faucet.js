import {Result} from "../helpers/result.js";
import {Account} from "../account/index.js";
import fetch from "node-fetch";

export class Faucet {
    constructor(url, api) {
        this.url = url
        this.api = api
    }

    async fundAccount(address, amount){
        const link = `${this.url}/mint?amount=${amount}&address=${Account._0x(address)}`
        const response = await fetch(link, {method: "POST"})
        const result = await response.json()

        if (response.status !== 200) {
            return new Result(false, result.message ? result.message : result.toString(), result)
        }

        const hashes = result
        const promises = []

        for(let hash of hashes) {
            promises.push(this.api.waitForTransaction(hash))
        }

        await Promise.all(promises)

        return new Result(true, "ok", hashes)
    }
}