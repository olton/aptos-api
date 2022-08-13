import {Account} from "../../src/index.js"

const alice = new Account()
const bob = new Account()

console.log(`Alice's address: `, alice.address())
console.log(`Alice's public key: `, alice.pubKey())
console.log(`Alice's auth key: `, alice.authKey())
console.log(`Alice's private key: `, alice.privateKey())
console.log(`============================================`)
console.log(`Alice's address: `, bob.address())
console.log(`Alice's public key: `, bob.pubKey())
console.log(`Alice's auth key: `, bob.authKey())
console.log(`Alice's private key: `, bob.privateKey())
