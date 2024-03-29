import {Aptos} from "../../src/index.js";
import {debug} from "../../src/helpers/debug.js";
import {Alice} from "../helpers/alice.js";

const NODE_URL = process.env.APTOS_NODE_URL || 'https://fullnode.devnet.aptoslabs.com';

const api = new Aptos(NODE_URL)

debug(await api.getAccountResource(Alice.address, "0x1::coin::CoinStore<0x1::aptos_coin::AptosCoin>"))