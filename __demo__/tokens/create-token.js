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
    "Collection 2",
    "Token2.1",
    "Token1 In collection 2",
    10,
    "https://pimenov.com.ua",
    10,
    {
        uri: true,
        maximum: true,
        royalty: true
    }
)
debug(token)


