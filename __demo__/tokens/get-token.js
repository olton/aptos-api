import {Aptos} from "../../src/index.js";
import {debug} from "../../src/helpers/debug.js";
import {Alice} from "../helpers/alice.js";
import {NODE_URL} from "../../src/helpers/const.js";

const api = new Aptos(NODE_URL, {
    max_gas_amount: 2000
})

// debug(await api.getToken(
//     Alice.address,
//     "Collection1",
//     "Token2",
// ))

debug(await api.getTokenData(
    Alice.address,
    "Collection1",
    "Token2",
))
