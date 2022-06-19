import {Aptos} from "../../src/index.js";
import {TEST_ACCOUNT} from "../../__tests__/helpers/address.js";
import {debug} from "../../src/helpers/debug.js";

const NODE_URL = process.env.APTOS_NODE_URL || 'https://fullnode.devnet.aptoslabs.com';

const api = new Aptos(NODE_URL, {
    max_gas_amount: 2000
})

debug(await api.getAccountModules(TEST_ACCOUNT.address))
