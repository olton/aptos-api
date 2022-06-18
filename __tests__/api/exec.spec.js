import {Aptos, aptos} from "../../src/index.js"

describe("Testing Api exec function", () => {
    const apiUrl = "https://fullnode.devnet.aptoslabs.com"
    const api = aptos(apiUrl)

    it("Node State", async () => {
        const result = await api.state()

        expect(result.ok).toBe(true)
        expect(result.payload.epoch > 0).toBe(true)
    })

    it("Get node healthy error", async () => {
        const result = await api._exec(`/-/123`)

        expect(result.ok).toBe(false)
        expect(result.message).toBe('Not Found')
        expect(result.error.code).toBe(404)
    })
})