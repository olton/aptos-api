export const Gas = {
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