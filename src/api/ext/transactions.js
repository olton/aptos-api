import Nacl from "tweetnacl"
import {Result} from "../../helpers/result.js";
import {debug} from "../../helpers/debug.js";

const {sign} = Nacl

export const TransactionApi = {
    lastTransaction: null,

    async getTransactions(){
        let address, query = {start: 1, limit: 25}
        let args = [...arguments]

        if (args.length === 1 && typeof args[0] === "object") {
            address = undefined
            query = args[0]
        } else
        if (args.length === 1 && typeof args[0] === "string") {
            address = args[0]
        } else {
            address = args[0]
            query = args[1]
        }

        const link = `${address ? '/accounts/'+this._0x(address) : ''}/transactions`

        debug(args)

        return await this._exec(link, query)
    },

    async getTransaction(hash){
        return await this._exec(`/transactions/${hash}`)
    },

    async buildTransaction(senderAddress, payload, exp = 600){
        let account

        account = await this._exec(`/accounts/${this._0x(senderAddress)}`)

        if (!account.ok) {
            return account
        }

        return {
            "sender": this._0x(senderAddress),
            "sequence_number": ""+account.payload.sequence_number,
            "max_gas_amount": ""+this.gas.max_gas_amount,
            "gas_unit_price": ""+this.gas.gas_unit_price,
            "gas_currency_code": ""+this.gas.gas_currency_code,
            "expiration_timestamp_secs": (Math.floor(Date.now() / 1000) + exp).toString(), // Unix timestamp, in seconds + 10 minutes ???
            "payload": payload,
        }
    },

    async createSigningMessage(txnRequest){
        return await this._exec(`/transactions/signing_message`, null, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(txnRequest)
        })
    },

    async signTransaction(signer, trx = {}){
        const signedMessage = await this.createSigningMessage(trx)

        if (!signedMessage) {
            return new Result(false, "Error creating signing message", signedMessage)
        }

        const toSign = Buffer.from(signedMessage.payload.message.substring(2), "hex")
        const signature = sign(toSign, signer.signingKey.secretKey)
        const signatureHex = Buffer.from(signature).toString("hex").slice(0, 128)

        trx["signature"] = {
            "type": "ed25519_signature",
            "public_key": `${this._0x(signer.pubKey())}`,
            "signature": `${this._0x(signatureHex)}`,
        }

        return trx
    },

    async submitTransactionData(data){
        return await this._exec(`/transactions`, null, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(data)
        })
    },

    async submitTransaction(account, payload){
        const transaction = await this.buildTransaction(account.address(), payload)
        const signedTransaction = await this.signTransaction(account, transaction)
        const result = await this.submitTransactionData(signedTransaction)

        if (!result.ok) {
            return new Result(false, "Error submitting transaction data", result.error)
        }

        try {
            await this.waitForTransaction(result.payload.hash)
            this.lastTransaction = (await this.getTransaction(result.payload.hash)).payload
            return new Result(true, "ok", this.lastTransaction)
        } catch (e) {
            return new Result(false, e.message, e.stack)
        }
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

    getLastTransaction(){
        return this.lastTransaction
    },

    lastTransactionStatus(){
        const {type, version, timestamp, hash, success, gas_used, max_gas_amount, gas_unit_price, sequence_number, vm_status} = this.lastTransaction
        return {
            type,
            hash,
            version,
            success,
            vm_status,
            timestamp,
            sequence_number,
            gas: {
                gas_used,
                max_gas_amount,
                gas_unit_price
            }
        }
    }
}