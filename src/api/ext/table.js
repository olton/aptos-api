export const TableApi = {
    getTableItem(key){
        return this._exec(`/tables/${key}/item`, null, {method: "POST"})
    },
}