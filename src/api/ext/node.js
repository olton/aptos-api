export const NodeApi = {
    getHealthy(){
        return this._exec(`/-/healthy`, undefined, undefined, "text")
    },

    getLedger(){
        return this._exec(`/`)
    }
}