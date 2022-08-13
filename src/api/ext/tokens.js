import {Result} from "../../helpers/result.js";
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
            function: `0x3::token::create_collection_script`,
            type_arguments: [],
            arguments: [
                Buffer.from(name).toString("hex"),
                Buffer.from(desc).toString("hex"),
                Buffer.from(uri).toString("hex"),
                ""+max,
                [false, false, false]
            ],
        }

        return await this.submitTransaction(signer, payload)
    },

    /**
     * Get collections for address
     * @param address
     * @returns {Promise<Result|*[]>}
     */
    async getCollections(address){
        const resource = await this.getEventsByHandle(this._0x(address), "0x3::token::Collections", "create_collection_events")
        if (!resource.ok) {
            return new Result(false, `No collections found!`, resource.error)
        }
        const collections = []

        for(let col of resource.payload) {
            collections.push({
                version: col.version,
                key: col.key,
                type: col.type,
                number: +col.sequence_number,
                name: Buffer.from(col.data.collection_name, 'hex').toString('utf8'),
                desc:  Buffer.from(col.data.description, 'hex').toString('utf8'),
                uri:  Buffer.from(col.data.uri, 'hex').toString('utf8'),
                creator:  col.data.creator,
                max: +col.data.maximum || 0
            })
        }

        // console.log(collections)

        return collections
    },


    async createToken(signer, collection, name, desc = '', balance = 1, uri = '', max = 1){
        const payload = {
            type: "script_function_payload",
            function: `0x3::token::create_token_script`,
            type_arguments: [],
            arguments: [
                Buffer.from(collection).toString("hex"), // collection
                Buffer.from(name).toString("hex"), // token name
                Buffer.from(desc).toString("hex"), // token desc
                balance.toString(), // token balance
                max.toString(), // token maximum
                Buffer.from(uri).toString("hex"), // token uri
                signer.address(), // royalty payee address
                "0", // royalty payee denominator
                "0", // royalty payee numerator
                [false, false, false, false, false], // mutate setting
                [""], // prop key ???
                [""], // prop value ???
                [""], // prop type ???
            ],
        }

        return await this.submitTransaction(signer, payload)
    },

    async getToken(creator, collectionName, tokenName, from = '0x3::token::TokenStore'){
        const store = await this.getAccountResource(creator, from)

        if (!store.ok) {
            return new Result(false, "Can't obtain token data from TokenStore", store.error)
        }

        const token_data_id = {
            creator: creator,
            collection: collectionName,
            name: tokenName,
        }

        const token_id = {
            token_data_id,
            property_version: "0",
        }

        const handle = store.payload.data.tokens.handle

        return await this.getTableItem(
            handle,
            '0x3::token::TokenDataId',
            '0x3::token::TokenData',
            token_data_id
        )
    },

    async getTokenData(creator, collectionName, tokenName, from = '0x3::token::TokenStore'){
        const store = await this.getAccountResource(creator, from)

        if (!store.ok) {
            return new Result(false, "Can't obtain token data from TokenStore", store.error)
        }

        const token_data_id = {
            creator: creator,
            collection: collectionName,
            name: tokenName,
        }

        const handle = store.payload.data.tokens.handle

        return await this.getTableItem(
            handle,
            '0x3::token::TokenDataId',
            '0x3::token::TokenData',
            token_data_id
        )
    },

    async tokenCreateOffer(signer, receiver, creator,  collectionName, tokenName, amount){
        const payload = {
            type: "script_function_payload",
            function: "0x3::token_transfers::offer_script",
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
            function: "0x3::token_transfers::claim_script",
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
            function: "0x3::token_transfers::cancel_offer_script",
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