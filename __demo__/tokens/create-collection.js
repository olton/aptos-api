import {Account} from "../../src/index.js";
import {Aptos} from "../../src/index.js";
import {debug} from "../../src/helpers/debug.js";
import {Alice} from "../helpers/alice.js";
import {NODE_URL} from "../../src/helpers/const.js";

let collection

const account = new Account(Alice.privateKey)
const api = new Aptos(NODE_URL, {
    max_gas_amount: 2000
})

// Create unlimited collection
collection = await api.createCollection(
    account,
    "Collection 4",
    "UnLimited Collection",
    "https://pimenov.com.ua",
    0
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



