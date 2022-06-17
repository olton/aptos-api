export const Gas = {
    gas: {
        max_gas_amount: 0,
        gas_unit_price: 0,
        gas_currency_code: "XXX",
    },

    setGas(gas){
        for(let key in gas) {
            if (this.gas.hasOwnProperty(key)) {
                this.gas.key = gas.key
            }
        }
    },

    getGas(){
        return this.gas
    }
}