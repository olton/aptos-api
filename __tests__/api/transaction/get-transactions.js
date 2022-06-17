import {Aptos} from "../../../src/index.js";
import {TEST_ACCOUNT} from "../../helpers/address.js";

describe("Testing transactions routines", () => {
    const apiUrl = "https://fullnode.devnet.aptoslabs.com"
    const api = new Aptos(apiUrl)

    it("getTransactions()", async () => {
        const transactions = await api.getTransactions()

        expect(transactions.ok).toBe(true)
        expect(transactions.payload.length <= 25).toBe(true)
    })

    it("getTransactions() for address", async () => {
        const transactions = await api.getTransactions(TEST_ACCOUNT.address)

        expect(transactions.ok).toBe(true)
        expect(transactions.payload.length <= 25).toBe(true)
    })
})