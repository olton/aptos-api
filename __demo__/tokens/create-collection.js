import {Account} from "../../src/index.js";
import {Aptos} from "../../src/index.js";
import {debug} from "../../src/helpers/debug.js";
import {Alice} from "../helpers/alice.js";
import {NODE_URL} from "../../src/helpers/const.js";

const account = new Account(Alice.privateKey)
const api = new Aptos(NODE_URL, {
    max_gas_amount: 2000
})

// debug(account.toObject())

// await api.createCollection(account, "Collection1", "Unlimited Collection", "https://pimenov.com.ua")
const col = await api.createCollection(account, "Collection3", "Limited Collection", "https://pimenov.com.ua", 10)
debug(col)
// console.log(api.lastTransactionStatus())
// debug(await api.createCollection(account, "Collection2", "Limited Collection", "https://pimenov.com.ua", 10))