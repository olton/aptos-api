import {Result} from "../../helpers/result.js";
import {hex2str, str2hex} from "../../helpers/hex-string.js";
import {required} from "../../helpers/required.js";

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
    async createCollection(signer, name, desc, uri, max = 1){
        required(signer, 'signer', this.createCollection.name)
        required(name, 'name', this.createCollection.name)
        required(desc, 'desc', this.createCollection.name)
        required(uri, 'uri', this.createCollection.name)

        if (max <= 0) return new Result(false, 'The maximum value must be greater than zero!')

        const payload = {
            type: "script_function_payload",
            function: `0x3::token::create_collection_script`,
            type_arguments: [],
            arguments: [
                name,
                desc,
                uri,
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
        required(address, 'address', this.getCollections.name)

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
                name: col.data.collection_name,
                desc: col.data.description,
                uri: col.data.uri,
                creator:  col.data.creator,
                max: +col.data.maximum || 0
            })
        }

        // console.log(collections)

        return new Result(true, "OK", collections)
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
        required(signer, 'signer', this.createToken.name)
        required(collection, 'collection', this.createToken.name)
        required(name, 'name', this.createToken.name)

        const {description: mutDesc = false, maximum: mutMax = false, properties: mutProps = false, royalty: mutRoyalty = false, uri: mutUri = false} = mutation
        const payload = {
            type: "script_function_payload",
            function: `0x3::token::create_token_script`,
            type_arguments: [],
            arguments: [
                collection, // collection
                name, // token name
                desc, // token desc
                balance.toString(), // token balance
                max.toString(), // token maximum
                uri, // token uri
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
        required(owner, 'owner', this.getTokenBalance.name)
        required(creator, 'creator', this.getTokenBalance.name)
        required(collectionName, 'collectionName', this.getTokenBalance.name)
        required(tokenName, 'tokenName', this.getTokenBalance.name)

        const store = await this.getAccountResource(owner, from)

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

        const tokenBalance = await this.getTableItem(
            handle,
            '0x3::token::TokenId',
            '0x3::token::Token',
            token_id
        )

        if (!tokenBalance.ok) {
            return new Result(false, tokenBalance.message)
        }

        const {id, amount, token_properties} = tokenBalance.payload

        return new Result(true, "OK", {
            creator: id.token_data_id.creator,
            collection: id.token_data_id.collection,
            name: id.token_data_id.name,
            amount,
            props: token_properties
        })
    },

    async getTokenData(owner, creator, collectionName, tokenName, from = '0x3::token::Collections'){
        required(owner, 'owner', this.getTokenData.name)
        required(creator, 'creator', this.getTokenData.name)
        required(collectionName, 'collectionName', this.getTokenData.name)
        required(tokenName, 'tokenName', this.getTokenData.name)

        const store = await this.getAccountResource(owner, from)

        if (!store.ok) {
            return new Result(false, "Can't obtain token data from TokenStore", store.error)
        }

        const token_data_id = {
            creator: creator,
            collection: collectionName,
            name: tokenName,
        }

        const handle = store.payload.data.token_data.handle

        if (!handle) return new Result(false, `Bad handle ${handle}!`)

        const tokenData = await this.getTableItem(
            handle,
            '0x3::token::TokenDataId',
            '0x3::token::TokenData',
            token_data_id
        )

        if (!tokenData.ok) {
            return new Result(false, tokenData.message)
        }

        const {default_properties, name, description, largest_property_version, maximum, mutability_config, royalty, supply, uri} = tokenData.payload

        return new Result(true, "OK", {
            name: name,
            desc: description,
            supply,
            maximum,
            royalty,
            default_props: default_properties,
            mutability_config,
        })
    },

    async tokenCreateOffer(signer, receiver, creator,  collectionName, tokenName, amount = 1){
        required(signer, 'signer', this.tokenCreateOffer.name)
        required(receiver, 'receiver', this.tokenCreateOffer.name)
        required(creator, 'creator', this.tokenCreateOffer.name)
        required(collectionName, 'collectionName', this.tokenCreateOffer.name)
        required(tokenName, 'tokenName', this.tokenCreateOffer.name)

        const payload = {
            type: "script_function_payload",
            function: "0x3::token_transfers::offer_script",
            type_arguments: [],
            arguments: [
                receiver,
                creator,
                collectionName,
                tokenName,
                ""+0,
                amount.toString(),
            ],
        }

        return await this.submitTransaction(signer, payload)
    },

    async tokenClaimOffer(signer, claimer, creator, collectionName, tokenName){
        required(signer, 'signer', this.tokenClaimOffer.name)
        required(claimer, 'claimer', this.tokenClaimOffer.name)
        required(creator, 'creator', this.tokenClaimOffer.name)
        required(collectionName, 'collectionName', this.tokenClaimOffer.name)
        required(tokenName, 'tokenName', this.tokenClaimOffer.name)

        const payload = {
            type: "script_function_payload",
            function: "0x3::token_transfers::claim_script",
            type_arguments: [],
            arguments: [
                claimer,
                creator,
                collectionName,
                tokenName,
                ""+0
            ],
        }

        return await this.submitTransaction(signer, payload)
    },

    async tokenCancelOffer(signer, receiver, creator, collection, name, prop_version = 0){
        required(signer, 'signer', this.tokenCancelOffer.name)
        required(receiver, 'receiver', this.tokenCancelOffer.name)
        required(creator, 'creator', this.tokenCancelOffer.name)
        required(collection, 'collection', this.tokenCancelOffer.name)
        required(name, 'name', this.tokenCancelOffer.name)

        const payload = {
            type: "script_function_payload",
            function: "0x3::token_transfers::cancel_offer_script",
            type_arguments: [],
            arguments: [
                receiver,
                creator,
                collection,
                name,
                prop_version.toString()
            ],
        }

        return await this.submitTransaction(signer, payload)
    },

    async getCollectionsWithTokens(){},
    async getCollectionWithTokens(){}
}