import {Result} from "../../helpers/result.js";

export const NodeApi = {
    async getHealthy(){
        return await this._exec(`/-/healthy`, undefined, undefined, "text")
    },

    async getLedger(){
        return await this._exec(`/`)
    },

    async getChainId(){
        const ledger = await this.getLedger()
        if (!ledger.ok) {
            return new Result(false, "Ledger not found", ledger.error)
        }
        return new Result(true, "ok", +ledger.payload.chain_id)
    },

    async getVersion(){
        const ledger = await this.getLedger()
        if (!ledger.ok) {
            return new Result(false, "Ledger not found", ledger.error)
        }
        return new Result(true, "ok", +ledger.payload.ledger_version)
    },

    async getEpoch(){
        const ledger = await this.getLedger()
        if (!ledger.ok) {
            return new Result(false, "Ledger not found", ledger.error)
        }
        return new Result(true, "ok", +ledger.payload.epoch)
    },

    async getTimestamp(){
        const ledger = await this.getLedger()
        if (!ledger.ok) {
            return new Result(false, "Ledger not found", ledger.error)
        }
        return new Result(true, "ok", +ledger.payload.ledger_timestamp)
    }
}