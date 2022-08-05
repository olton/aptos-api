export const EventApi = {
    async getEventsByKey(key, query = {limit: 25, start: 0}){
        return await this._exec(`/events/${this._0x(key)}`, query)
    },

    async getEventsByHandle(address, event_handle, field_name, query = {limit: 25, start: 0}){
        return await this._exec(`/accounts/${this._0x(address)}/events/${event_handle}/${field_name}`, query)
    }
}