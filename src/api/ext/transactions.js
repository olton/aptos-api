import Nacl from "tweetnacl"
import {Result} from "../../helpers/result.js";

const {sign} = Nacl

export const TransactionApi = {
    lastTransaction: null,

    getTransactions(){
        let address, query = {start: 1, limit: 25}

        if (arguments.length === 1 && typeof arguments[0] === "object") {
            address = undefined
            query = arguments[0]
        } else
        if (arguments.length === 1 && typeof arguments[0] === "string") {
            address = arguments[0]
        }

        const link = `${address ? '/accounts/'+this._0x(address) : ''}/transactions`

        return this._exec(link, query)
    },

    getTransaction(hash){
        return this._exec(`/transactions/${hash}`)
    },

    async buildTransaction(senderAddress, payload, gas = {}, exp = 600){
        let account

        account = await this._exec(`/accounts/${this._0x(senderAddress)}`)

        if (!account.ok) {
            return account
        }

        const _gas = Object.assign({}, this.gas, gas)

        return {
            "sender": this._0x(senderAddress),
            "sequence_number": ""+account.payload.sequence_number,
            "max_gas_amount": ""+_gas.max_gas_amount,
            "gas_unit_price": ""+_gas.gas_unit_price,
            "gas_currency_code": ""+_gas.gas_currency_code,
            "expiration_timestamp_secs": (Math.floor(Date.now() / 1000) + exp).toString(), // Unix timestamp, in seconds + 10 minutes ???
            "payload": payload,
        }
    },

    async createSigningMessage(txnRequest){
        return this._exec(`/transactions/signing_message`, null, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(txnRequest)
        })
    },

    async signTransaction(signer, request = {}){
        const signedMessage = await this.createSigningMessage(request)

        if (!signedMessage) {
            return new Result(false, "Error creating signing message", signedMessage)
        }

        const toSign = Buffer.from(signedMessage.payload.message.substring(2), "hex")
        const signature = sign(toSign, signer.signingKey.secretKey)
        const signatureHex = Buffer.from(signature).toString("hex").slice(0, 128)

        request["signature"] = {
            "type": "ed25519_signature",
            "public_key": `${this._0x(signer.pubKey())}`,
            "signature": `${this._0x(signatureHex)}`,
        }

        return request
    },

    submitTransactionData(data){
        return this._exec(`/transactions`, null, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(data)
        })
    },

    async transactionPending(hash){
        const response = await this.getTransaction(hash)
        if (!response.ok && response.error.code === 404) {
            return true
        }
        if (!response.payload) console.log(response)
        return response.payload.type === "pending_transaction"
    },

    async waitForTransaction(hash) {
        let count = 0
        while (await this.transactionPending(hash)) {
            await this.sleep(1000)
            count += 1
            if (count >= 10) {
                throw new Error(`Waiting for transaction ${hash} timed out!`)
            }
        }
    },

    async submitTransaction(account, payload, gas){
        const transaction = this.buildTransaction(account.address(), payload, gas)
        const signedTransaction = this.signTransaction(account, transaction)
        const result = await this.submitTransactionData(signedTransaction)

        if (!result.ok) {
            return new Result(false, "Error submitting transaction data", result)
        }

        try {
            await this.waitForTransaction(result.payload.hash)
            this.lastTransaction = await this.getTransaction(result.payload.hash)
            return new Result(true, "ok", this.lastTransaction)
        } catch (e) {
            return new Result(false, e.message, e.stack)
        }
    },

    getLastTransaction(){
        return this.lastTransaction
    }
}