export const Node = {
    getHealthy(){
        return this._exec(`-/healthy`, undefined, undefined, "text")
    },

    getLedger(){
        return this._exec(``)
    }
}