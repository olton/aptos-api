import {Api} from "../../../src/index.js"
import {Account} from "../../../src/api/ext/account.js";

describe("Testing Account extension for API", () => {
    const apiUrl = "https://fullnode.devnet.aptoslabs.com"
    const api = new Api(apiUrl)
    const account1 = '0xc52150d3662f837805a652da4830119161a320e596247cd7ef91300691c1c916'

    Api.use(Account)

    it("getAccountResources()", async () => {
        const result = await api.getAccountResources(account1)

        expect(result.ok).toBe(true)
        expect(Array.isArray( result.payload) ).toBe(true)
    })
})