import {Account} from "../../src/index.js";
import {Aptos} from "../../src/index.js";
import {debug} from "../../src/helpers/debug.js";
import {Alice} from "../helpers/alice.js";
import {NODE_URL} from "../../src/helpers/const.js";

const api = new Aptos(NODE_URL, {
    max_gas_amount: 2000
})

debug(await api.getCollections(Alice.address))
