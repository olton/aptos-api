export class Result {
    constructor(ok, message, data) {
        this.ok = ok
        if (!ok) {
            this.message = message
            this.error = data
        } else {
            if (arguments.length <= 2) {
                this.payload = arguments[1]
            } else {
                this.payload = data
            }
        }
    }
}