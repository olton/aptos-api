import {Aptos} from "../../src/index.js";
import {debug} from "../../src/helpers/debug.js";
import {Alice} from "../helpers/alice.js";
import {Bob} from "../helpers/bob.js";
import {NODE_URL} from "../../src/helpers/const.js";

const api = new Aptos(NODE_URL, {
    max_gas_amount: 2000
})

console.log(`Alice's collections`)
debug(await api.getCollection(Alice.address, "Collection 1"))

