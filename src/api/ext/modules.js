export const ModuleApi = {
    publishModule(signer, moduleHex){
        const payload = {
            "type": "module_bundle_payload",
            "modules": [
                {"bytecode": `${this._0x(moduleHex)}`},
            ],
        }
        return this.submitTransaction(signer, payload)
    }
}