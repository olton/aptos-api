import SHA3 from "js-sha3"
import Nacl from "tweetnacl"
import {Buffer} from 'buffer'
import {hexstr} from "../helpers/hex-string.js"

const {sign} = Nacl
const {sha3_256} = SHA3

export class Account {
    signingKey = {}
    accountAddress = ""
    accountAuthKey = ""

    constructor(privateKey, address){
        if (privateKey) {
            if (typeof privateKey === "string") {
                privateKey = Uint8Array.from(Buffer.from(privateKey, 'hex'))
            }
            this.signingKey = sign.keyPair.fromSeed(privateKey.slice(0, 32))
        } else {
            this.signingKey = sign.keyPair()
        }
        this.accountAddress = hexstr(address || this.authKey()).hex()
    }

    privateKey(){
        return Buffer.from(this.signingKey.secretKey).toString("hex").slice(0, 64)
    }

    address(){
        return this.accountAddress
    }

    authKey(){
        if (!this.accountAuthKey) {
            let hash = sha3_256.create()
            hash.update(Buffer.from(this.signingKey.publicKey))
            hash.update("\x00")
            this.accountAuthKey = hash.hex()
        }
        return this.accountAuthKey
    }

    pubKey(){
        return hexstr(Buffer.from(this.signingKey.publicKey).toString("hex")).toString()
    }

    signBuffer(buffer){
        const signature = sign(buffer, this.signingKey.secretKey)
        return hexstr(Buffer.from(signature).toString("hex").slice(0, 128)).toString();
    }

    signHexString(hexString){
        const toSign = hexstr(hexString).toBuffer();
        return this.signBuffer(toSign);
    }

    signString(str, enc = 'utf8'){
        const toSign = Buffer.from(str, enc);
        return this.signBuffer(toSign);
    }

    signObject(obj){
        return this.signString(JSON.stringify(obj))
    }

    sign(){
        return this.signHexString(this.accountAddress).slice(2)
    }

    toObject() {
        return {
            address: this.address(),
            publicKey: this.pubKey(),
            authKey: this.authKey(),
            privateKey: this.privateKey(),
        };
    }
}

Account.fromSeed = (seed) => new Account(seed)
Account.fromObject = (accountObject) => new Account(accountObject.privateKey)
Account.norm = addr => hexstr(addr)
Account._0x = a => {
    if (a instanceof Account) {
        return a.address()
    } else if (typeof a === "string") {
        return hexstr(a).toString()
    } else if (typeof a === "object" && a.address) {
        return hexstr(a.address).toString()
    } else {
        throw new Error("Value is not an Aptos address or compatible object!")
    }
}

export const account = (...args) => new Account(...args)
