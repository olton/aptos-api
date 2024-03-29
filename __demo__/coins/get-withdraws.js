import {Aptos} from "../../src/index.js";
import {Alice} from "../helpers/alice.js";
import {debug} from "../../src/helpers/debug.js";

const NODE_URL = process.env.APTOS_NODE_URL || 'https://fullnode.devnet.aptoslabs.com';

const api = new Aptos(NODE_URL)

debug(await api.getWithdrawCoins(Alice.address, Aptos.APTOS_TOKEN))
