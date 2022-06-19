import {Account} from "../../src/index.js";
import {Aptos} from "../../src/index.js";
import {TEST_ACCOUNT} from "../../__tests__/helpers/address.js";
import {debug} from "../../src/helpers/debug.js";

const NODE_URL = process.env.APTOS_NODE_URL || 'https://fullnode.devnet.aptoslabs.com';

const account = new Account(TEST_ACCOUNT.privateKey)
const api = new Aptos(NODE_URL)

debug(await api.getAccountResources(account.address()))