import {Account, Aptos} from "../../src/index.js";
import {Alice} from "../helpers/alice.js";
import {Bob} from "../helpers/bob.js";
import {Faucet} from "../../src/api/faucet.js";
import {FAUCET_URL, NODE_URL} from "../../src/helpers/const.js";

const api = new Aptos(NODE_URL)
const faucet = new Faucet(FAUCET_URL, api)
const alice = new Account(Alice.privateKey)
const bob = new Account(Bob.privateKey)

console.log(`=== Send coins demo ===`)

console.log(`=== Fund accounts ===`)

// await faucet.fundAccount(alice.address(), 1_000_000)
// await faucet.fundAccount(bob.address(), 1_000_000)

console.log(`Alice balance:`, await api.getAccountBalance(alice.address()))
console.log(`Bob balance:`, await api.getAccountBalance(bob.address()))

console.log(`=== Send coins from Alice to Bob ===`)

await api.sendCoins(alice, bob.address(), 1000)

console.log(`Alice balance:`, await api.getAccountBalance(alice.address()))
console.log(`Bob balance:`, await api.getAccountBalance(bob.address()))

console.log(`=== Send coins from Bob to Alice ===`)

await api.sendCoins(bob, alice.address(), 1000)

console.log(`Alice balance:`, await api.getAccountBalance(alice.address()))
console.log(`Bob balance:`, await api.getAccountBalance(bob.address()))
