import {Aptos} from "../../src/index.js";
import {debug} from "../../src/helpers/debug.js";

const hash = `0xd845629ff2fd1a39c0d8563d781bfb6d39ca15ea4bec0892c90815584b66ac84`

const NODE_URL = process.env.APTOS_NODE_URL || 'https://fullnode.devnet.aptoslabs.com';

const api = new Aptos(NODE_URL, {
    max_gas_amount: 2000
})

debug(await api.getTransaction(hash))