import {Aptos} from "../../src/index.js";
import {debug} from "../../src/helpers/debug.js";
import {Alice} from "../helpers/alice.js";
import {NODE_URL} from "../../src/helpers/const.js";

const api = new Aptos(NODE_URL)

const result = await api.getAccountBalance(Alice.address, "0x1::aptos_coin::AptosCoin")

debug(result)