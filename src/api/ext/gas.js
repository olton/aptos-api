export const GasAPI = {
    setGas(gas){
        for(let key in gas) {
            if (this.gas.hasOwnProperty(key)) {
                this.gas.key = gas.key
            }
        }
    },

    getGas(){
        return this.gas
    },

    async estimateGasPrice(){
        return await this._exec(`/estimate_gas_price`, query)
    }
}