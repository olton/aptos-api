export const TableApi = {
    async getTableItem(handle, body = {key_type, value_type, key}, query = {ledger_version}){
        return await this._exec(`/tables/${handle}/item`, null, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        })
    },
}