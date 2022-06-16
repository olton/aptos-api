import {Api} from "../../../src/index.js"
import {Account} from "../../../src/api/ext/account.js";

describe("Testing Account extension for API", () => {
    const apiUrl = "https://fullnode.devnet.aptoslabs.com"
    const api = new Api(apiUrl)
    const account1 = '0xc52150d3662f837805a652da4830119161a320e596247cd7ef91300691c1c916'
    const account2 = 'c52150d3662f837805a652da4830119161a320e596247cd7ef91300691c1c916'

    Api.use(Account)

    it("getAccount() address with 0x", async () => {
        const result = await api.getAccount(account1)

        expect(result.ok).toBe(true)
        expect(result.payload.authentication_key).toBe(account1)
    })

    it("getAccount() address without 0x", async () => {
        const result = await api.getAccount(account2)

        expect(result.ok).toBe(true)
        expect(result.payload.authentication_key).toBe(account1)
    })
})