import {Account} from "../../src/index.js";
import {Aptos} from "../../src/index.js";
import {debug} from "../../src/helpers/debug.js";
import {Alice} from "../helpers/alice.js";
import {NODE_URL} from "../../src/helpers/const.js";

let token

const account = new Account(Alice.privateKey)
const api = new Aptos(NODE_URL, {
    max_gas_amount: 2000
})

// Create unlimited collection
token = await api.createToken(
    account,
    "Collection1",
    "Token1",
    "Token1 Desc",
    10,
    "https://pimenov.com.ua",
    10
)
debug(token)


