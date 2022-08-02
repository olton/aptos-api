import {Aptos} from "../../../src/index.js"
import {hexstr} from "../../../src/index.js";
import {Alice} from "../../../__demo__/helpers/alice.js";

describe("Testing Account extension for API", () => {
    const apiUrl = "https://fullnode.devnet.aptoslabs.com"
    const api = new Aptos(apiUrl)

    it("getAccount() address with 0x", async () => {
        const result = await api.getAccount(Alice.address)

        expect(result.ok).toBe(true)
        expect(result.payload.authentication_key).toBe(Alice.address)
    })

    it("getAccount() address without 0x", async () => {
        const result = await api.getAccount(hexstr(Alice.address).noPrefix())

        expect(result.ok).toBe(true)
        expect(result.payload.authentication_key).toBe(Alice.address)
    })
})