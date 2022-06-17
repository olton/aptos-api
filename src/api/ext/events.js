export const EventApi = {
    getEvents(key){
        return this._exec(`/events/${this._0x(key)}`)
    },

    getEventsByHandle(address, event, field, query = {limit: 25, start: 0}){
        return this._exec(`/accounts/${this._0x(address)}/events/${event}/${field}`, {...query})
    }
}