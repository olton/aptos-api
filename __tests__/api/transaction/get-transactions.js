import {Api} from "../../../src/index.js";
import {Transactions} from "../../../src/api/ext/transactions.js";

describe("Testing transactions routines", () => {
    const apiUrl = "https://fullnode.devnet.aptoslabs.com"
    const api = new Api(apiUrl)
    const address = '0x4cc470ac26f0d1cbd089fb9ee3d9836d0cc80dea74eca7354f7948d63bd606c3'

    Api.use(Transactions)

    it("getTransactions()", async () => {
        const transactions = await api.getTransactions()
        console.log(api.lastRequest)
        expect(transactions.ok).toBe(true)
        expect(transactions.payload.length <= 25).toBe(true)
    })

    it("getTransactions() for address", async () => {
        const transactions = await api.getTransactions(address)
        console.log(api.lastRequest)
        expect(transactions.ok).toBe(true)
        expect(transactions.payload.length <= 25).toBe(true)
    })
})