export const Account = {
    getAccount(address){
        return this._exec(`/accounts/${this._0x(address)}`)
    },

    getAccountResources(address){
        return this._exec(`/accounts/${this._0x(address)}/resources`)
    },

    getAccountResource(address, resource){
        return this._exec(`/accounts/${this._0x(address)}/resource/${resource}`)
    },

    getAccountModules(address){
        return this._exec(`/accounts/${this._0x(address)}/modules`)
    },

    getAccountModule(address, module){
        return this._exec(`/accounts/${this._0x(address)}/module/${module}`)
    },
}