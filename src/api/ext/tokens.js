import {Result} from "../../helpers/result.js";

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
                [false, false, false] // Collection mutations
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


    /**
     *
     * @param {Account} signer
     * @param {String} collection
     * @param {String} name
     * @param {String} desc
     * @param {Number} balance
     * @param {String} uri
     * @param {Number} max
     * @param mutation
     * @returns {Promise<Result|undefined>}
     */
    async createToken(
        signer,
        collection,
        name,
        desc = '',
        balance = 1,
        uri = '',
        max = 1,
        mutation = {}
    ){
        const {description: mutDesc = false, maximum: mutMax = false, properties: mutProps = false, royalty: mutRoyalty = false, uri: mutUri = false} = mutation
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
                this._0x(signer.address()), // royalty payee address
                "0", // royalty payee denominator
                "0", // royalty payee numerator
                [mutDesc, mutMax, mutProps, mutRoyalty, mutUri], // mutate setting
                [""], // prop key ???
                [""], // prop value ???
                [""], // prop type ???
            ],
        }

        return await this.submitTransaction(signer, payload)
    },

    async getTokenBalance(owner, creator, collectionName, tokenName, from = '0x3::token::TokenStore'){
        const store = await this.getAccountResource(owner, from)

        if (!store.ok) {
            return new Result(false, "Can't obtain token data from TokenStore", store.error)
        }

        const token_data_id = {
            creator: creator,
            collection: Buffer.from(collectionName).toString("hex"),
            name: Buffer.from(tokenName).toString("hex"),
        }

        const token_id = {
            token_data_id,
            property_version: "0",
        }

        const handle = store.payload.data.tokens.handle

        const tokenBalance = await this.getTableItem(
            handle,
            '0x3::token::TokenId',
            '0x3::token::Token',
            token_id
        )

        const {id, amount, token_properties} = tokenBalance.payload

        return {
            creator: id.creator,
            collection: Buffer.from(id.token_data_id.collection, 'hex').toString('utf8'),
            name: Buffer.from(id.token_data_id.name, 'hex').toString('utf8'),
            amount,
            props: token_properties
        }
    },

    async getTokenData(owner, creator, collectionName, tokenName, from = '0x3::token::Collections'){
        const store = await this.getAccountResource(owner, from)

        if (!store.ok) {
            return new Result(false, "Can't obtain token data from TokenStore", store.error)
        }

        const token_data_id = {
            creator: creator,
            collection: Buffer.from(collectionName).toString("hex"),
            name: Buffer.from(tokenName).toString("hex"),
        }

        const handle = store.payload.data.token_data.handle

        const tokenData = await this.getTableItem(
            handle,
            '0x3::token::TokenDataId',
            '0x3::token::TokenData',
            token_data_id
        )

        const {default_properties, name, description, largest_property_version, maximum, mutability_config, royalty, supply, uri} = tokenData.payload

        return {
            name: Buffer.from(name, 'hex').toString("utf8"),
            desc: Buffer.from(description, 'hex').toString("utf8"),
            supply,
            maximum,
            royalty,
            default_props: default_properties,
            mutability_config,
        }
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