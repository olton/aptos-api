import {Api} from "../../../src/index.js"
import {Node} from "../../../src/api/ext/node.js";

describe("Testing Node extension for API", () => {
    const apiUrl = "https://fullnode.devnet.aptoslabs.com"
    const api = new Api(apiUrl)

    Api.use(Node)

    it("getHealthy()", async () => {
        const result = await api.getHealthy()

        expect(result.ok).toBe(true)
        expect(result.payload).toBe('aptos-node:ok')
    })

    it("getLedger()", async () => {
        const result = await api.getLedger()

        expect(result.ok).toBe(true)
        expect(result.payload.epoch > 0).toBe(true)
    })
})