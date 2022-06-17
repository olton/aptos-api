import {Api} from "../../../src/index.js"
import {TEST_ACCOUNT} from "../../helpers/address.js";
import {hexstr} from "../../../src/index.js";

describe("Testing Account extension for API", () => {
    const apiUrl = "https://fullnode.devnet.aptoslabs.com"
    const api = new Api(apiUrl)

    it("getAccount() address with 0x", async () => {
        const result = await api.getAccount(TEST_ACCOUNT.address)

        expect(result.ok).toBe(true)
        expect(result.payload.authentication_key).toBe(TEST_ACCOUNT.address)
    })

    it("getAccount() address without 0x", async () => {
        const result = await api.getAccount(hexstr(TEST_ACCOUNT.address).noPrefix())

        expect(result.ok).toBe(true)
        expect(result.payload.authentication_key).toBe(TEST_ACCOUNT.address)
    })
})