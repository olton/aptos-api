import {Result} from "../../helpers/result.js";
import {debug} from "../../helpers/debug.js";
import {TOKEN_STORE, TOKEN_ID, TOKEN_TOKEN} from "../../helpers/const.js";

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
     * Get collections for address
     * @param address
     * @returns {Promise<Result|*[]>}
     */
    async getCollections(address){
        const resource = await this.getEventsByHandle(this._0x(address), "0x1::Token::Collections", "create_collection_events")
        if (!resource.ok) {
            return new Result(false, `No collections found!`, resource.error)
        }
        const collections = []

        for(let col of resource.payload) {
            collections.push({
                number: +col.sequence_number,
                name: col.data.collection_name,
                desc:  col.data.description,
                creator:  col.data.creator,
                max: +col.data.maximum.vec[0] || 0
            })
        }

        return collections
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

    async getToken(creator, collectionName, tokenName, from = TOKEN_STORE){
        const store = await this.getAccountResource(creator, from)
        if (!store.ok) {
            return new Result(false, "Can't obtain token data from TokenStore", store.error)
        }
        const token_id = {
            creator: creator,
            collection: collectionName,
            name: tokenName,
        }
        const handle = store["payload"]["data"][from === TOKEN_STORE ? "tokens" : "token_data"]["handle"]
        return await this.getTableItem(
            handle,
            TOKEN_ID,
            TOKEN_TOKEN,
            token_id,
        )
    },

    async tokenCreateOffer(signer, receiver, creator,  collectionName, tokenName, amount){
        const payload = {
            type: "script_function_payload",
            function: "0x1::TokenTransfers::offer_script",
            type_arguments: [],
            arguments: [
                receiver,
                creator,
                Buffer.from(collectionName).toString("hex"),
                Buffer.from(tokenName).toString("hex"),
                amount.toString(),
            ],
        }

        return await this.submitTransaction(signer, payload)
    },

    async tokenClaimOffer(signer, claimer, creator, collectionName, tokenName){
        const payload = {
            type: "script_function_payload",
            function: "0x1::TokenTransfers::claim_script",
            type_arguments: [],
            arguments: [
                claimer,
                creator,
                Buffer.from(collectionName).toString("hex"),
                Buffer.from(tokenName).toString("hex"),
            ],
        }

        return await this.submitTransaction(signer, payload)
    },

    async tokenCancelOffer(signer, receiver, creator, tokenCreationNum){
        const payload = {
            type: "script_function_payload",
            function: "0x1::TokenTransfers::cancel_offer_script",
            type_arguments: [],
            arguments: [
                receiver,
                creator,
                tokenCreationNum.toString()
            ],
        }

        return await this.submitTransaction(signer, payload)
    },

    async getCollectionsWithTokens(){},
    async getCollectionWithTokens(){}
}