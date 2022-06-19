export const EventApi = {
    async getEvents(key){
        return await this._exec(`/events/${this._0x(key)}`)
    },

    async getEventsByHandle(address, event, field, query = {limit: 25, start: 0}){
        return await this._exec(`/accounts/${this._0x(address)}/events/${event}/${field}`, {...query})
    }
}