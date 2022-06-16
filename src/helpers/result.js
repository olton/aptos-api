export class Result {
    constructor(ok, message, data) {
        this.ok = ok
        this.message = message
        if (!ok) {
            this.error = data
        } else {
            this.payload = data
        }
    }
}