import {Account} from "../../src/index.js";
import {Aptos} from "../../src/index.js";
import {debug} from "../../src/helpers/debug.js";
import {Alice} from "../helpers/alice.js";
import {Bob} from "../helpers/bob.js"
import {NODE_URL} from "../../src/helpers/const.js";

let collection

const account = new Account(Bob.privateKey)
const api = new Aptos(NODE_URL, {
    max_gas_amount: 2000
})

// Create unlimited collection
collection = await api.createCollection(
    account,
    "Collection 1",
    "Bob's Collection 1",
    "https://pimenov.com.ua",
    10
)
debug(collection)

// Create limited collection
// collection = await api.createCollection(
//     account,
//     "Collection 2",
//     "Limited Collection",
//     "https://pimenov.com.ua",
//     1
// )
// debug(collection)



