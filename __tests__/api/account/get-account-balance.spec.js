import {Aptos} from "../../../src/index.js"
import {Alice} from "../../../__demo__/helpers/alice.js";

describe("Testing Account extension for API", () => {
    const apiUrl = "https://fullnode.devnet.aptoslabs.com"
    const api = new Aptos(apiUrl)

    it("getAccountBalance()", async () => {
        const result = await api.getAccountBalance(Alice.address)

        expect(result.ok).toBe(true)
        expect(result.payload.balance > 0).toBe(true)
    })
})