import {Aptos} from "../../../src/index.js"
import {TEST_ACCOUNT} from "../../helpers/address.js";

describe("Testing Account extension for API", () => {
    const apiUrl = "https://fullnode.devnet.aptoslabs.com"
    const api = new Aptos(apiUrl)

    it("getAccountBalance()", async () => {
        const result = await api.getAccountBalance(TEST_ACCOUNT.address)

        expect(result.ok).toBe(true)
        expect(result.payload.balance > 0).toBe(true)
    })
})