import {Aptos} from "../../../src/index.js"

describe("Testing Node extension for API", () => {
    const apiUrl = "https://fullnode.devnet.aptoslabs.com"
    const api = new Aptos(apiUrl)

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

    it("getChainId()", async () => {
        const result = await api.getChainId()

        expect(result.ok).toBe(true)
        expect(result.payload > 0).toBe(true)
    })

    it("getEpoch()", async () => {
        const result = await api.getEpoch()

        expect(result.ok).toBe(true)
        expect(result.payload > 0).toBe(true)
    })

    it("getVersion()", async () => {
        const result = await api.getVersion()

        expect(result.ok).toBe(true)
        expect(result.payload > 0).toBe(true)
    })

    it("getTimestamp()", async () => {
        const result = await api.getTimestamp()

        expect(result.ok).toBe(true)
        expect(result.payload > 0).toBe(true)
    })
})