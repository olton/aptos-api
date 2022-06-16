export const Account = {
    getAccount(address){
        return this._exec(`accounts/${this._0x(address)}`)
    },

    getAccountResources(address){
        return this._exec(`accounts/${this._0x(address)}/resources`)
    }
}