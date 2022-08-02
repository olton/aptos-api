import {Aptos} from "../../../src/index.js"
import {Alice} from "../../../__demo__/helpers/alice.js";

describe("Testing Account extension for API", () => {
    const apiUrl = "https://fullnode.devnet.aptoslabs.com"
    const api = new Aptos(apiUrl)

    it("getAccountResources()", async () => {
        const result = await api.getAccountResources(Alice.address)

        expect(result.ok).toBe(true)
        expect(Array.isArray( result.payload) ).toBe(true)
    })
})