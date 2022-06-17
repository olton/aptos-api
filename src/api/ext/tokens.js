export const TokenApi = {
    /**
     * Create collection
     * @param {Account} signer
     * @param {String} name
     * @param {String} desc
     * @param {String} uri
     * @param {Number} max, if value greater than zero method will create limited collection
     * @returns {Promise<Result|undefined>}
     */
    async createCollection(signer, name, desc, uri, max = 0){
        const payload = {
            type: "script_function_payload",
            function: `0x1::Token::${max ? 'create_limited_collection_script' : 'create_unlimited_collection_script'}`,
            type_arguments: [],
            arguments: [
                Buffer.from(name).toString("hex"),
                Buffer.from(desc).toString("hex"),
                Buffer.from(uri).toString("hex"),
            ],
        }

        if (max) {
            payload.arguments.push(max.toString())
        }

        return await this.submitTransaction(signer, payload)
    },

    /**
     *
     * @param signer
     * @param collection
     * @param name
     * @param desc
     * @param supply
     * @param uri
     * @param {Number} max, if value greater than zero method will create limited toke
     * @returns {Promise<Result|undefined>}
     */
    async createToken(signer, collection, name, desc, supply, uri, max = 0){
        const payload = {
            type: "script_function_payload",
            function: `0x1::Token::${max ? 'create_limited_token_script' : 'create_unlimited_token_script'}`,
            type_arguments: [],
            arguments: [
                Buffer.from(collection).toString("hex"),
                Buffer.from(name).toString("hex"),
                Buffer.from(desc).toString("hex"),
                true,
                supply.toString(),
            ],
        }

        if (max) {
            payload.arguments.push(max.toString())
        }

        payload.arguments.push(Buffer.from(uri).toString("hex"))

        return await this.submitTransaction(signer, payload)
    },
}