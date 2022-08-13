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

export class TransResult {
    constructor(tr) {
        this.ok = tr.success
        this.gas = tr.gas_used
        this.status = tr.vm_status
        this.hash = tr.hash
        this.version = tr.version
        this.timestamp = tr.timestamp
        this.type = tr.type
        this.detail = tr
    }
}