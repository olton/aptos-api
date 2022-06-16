export const Tables = {
    getTableItem(key){
        return this._exec(`/tables/${key}/item`, null, {method: "POST"})
    },
}