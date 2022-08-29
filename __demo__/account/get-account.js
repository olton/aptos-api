import {Aptos} from "../../src/index.js";
import {Alice} from "../helpers/alice.js"
import {debug} from "../../src/helpers/debug.js";
import {NODE_URL} from "../../src/helpers/const.js";

const api = new Aptos(NODE_URL)

const result = await api.getAccount(Alice.address)

debug(result)