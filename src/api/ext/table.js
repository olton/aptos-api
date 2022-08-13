export const TableApi = {
    async getTableItem(handle, key_type = '', value_type = '', key, query = {ledger_version: null}){
        return await this._exec(`/tables/${handle}/item`, query, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                key_type,
                value_type,
                key
            }),
        })
    },
}