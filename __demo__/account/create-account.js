import {Account} from "../../src/index.js"

const alice = new Account()

const address = alice.address()
const pubkey = alice.pubKey()
const authkey = alice.authKey()
const privkey = alice.privateKey()

console.log(`Alice's address: `, address)
console.log(`Alice's public key: `, pubkey)
console.log(`Alice's auth key: `, authkey)
console.log(`Alice's private key: `, privkey)
console.log(alice.toObject())