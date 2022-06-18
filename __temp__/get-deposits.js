import {Aptos} from "../src/index.js";
import {TEST_ACCOUNT} from "../__tests__/helpers/address.js";
import {debug} from "../__tests__/helpers/debug.js";

const NODE_URL = process.env.APTOS_NODE_URL || 'https://fullnode.devnet.aptoslabs.com';

const api = new Aptos(NODE_URL)

debug(await api.getDeposits(TEST_ACCOUNT.address, Aptos.TEST_COIN))
