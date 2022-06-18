export const TableApi = {
    async getTableItem(handle, keyType, valueType, key){
        const body = {
            key_type: keyType,
            value_type: valueType,
            key: key,
        }

        return await this._exec(`/tables/${handle}/item`, null, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        })
    },
}