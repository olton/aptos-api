import {Result} from "../../helpers/result.js";
import {hex2str, str2hex} from "../../helpers/hex-string.js";

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
                name, desc, uri,
                // str2hex(name),
                // str2hex(desc),
                // str2hex(uri),
                ""+max,
                [false, false, false] // Collection mutations
            ],
        }

        console.log(payload)

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
                name: hex2str(col.data.collection_name),
                desc:  hex2str(col.data.description),
                uri:  hex2str(col.data.uri),
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
                str2hex(collection), // collection
                str2hex(name), // token name
                str2hex(desc), // token desc
                balance.toString(), // token balance
                max.toString(), // token maximum
                str2hex(uri), // token uri
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
            collection: str2hex(collectionName),
            name: str2hex(tokenName),
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
            collection: hex2str(id.token_data_id.collection),
            name: hex2str(id.token_data_id.name),
            amount,
            props: token_properties
        })
    },

    async getTokenData(owner, creator, collectionName, tokenName, from = '0x3::token::Collections'){
        const store = await this.getAccountResource(owner, from)

        if (!store.ok) {
            return new Result(false, "Can't obtain token data from TokenStore", store.error)
        }

        const token_data_id = {
            creator: creator,
            collection: str2hex(collectionName),
            name: str2hex(tokenName),
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
            name: hex2str(name),
            desc: hex2str(description,),
            supply,
            maximum,
            royalty,
            default_props: default_properties,
            mutability_config,
        })
    },

    async tokenCreateOffer(signer, receiver, creator,  collectionName, tokenName, amount){
        const payload = {
            type: "script_function_payload",
            function: "0x3::token_transfers::offer_script",
            type_arguments: [],
            arguments: [
                receiver,
                creator,
                str2hex(collectionName),
                str2hex(tokenName),
                ""+0,
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
                str2hex(collectionName),
                str2hex(tokenName),
                ""+0
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