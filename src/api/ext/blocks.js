export const BlocksAPI = {
    async getBlockByHeight (height, with_transactions = false){
        return await this._exec(`/blocks/by_height/${height}`, {with_transactions})
    },

    async getBlockByVersion (version, with_transactions = false){
        return await this._exec(`/blocks/by_version/${version}`, {with_transactions})
    }
}