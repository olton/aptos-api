import {debug} from "../../helpers/debug.js";

export const ModuleApi = {
    async publishModule(signer, moduleHex){
        const payload = {
            "type": "module_bundle_payload",
            "modules": [
                {"bytecode": `${this._0x(moduleHex)}`},
            ],
        }

        return await this.submitTransaction(signer, payload)
    }
}