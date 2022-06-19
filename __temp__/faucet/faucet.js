import {Account} from "../../src/index.js";
import {Aptos} from "../../src/index.js";
import {Faucet} from "../../src/api/faucet.js";
import {TEST_ACCOUNT} from "../../__tests__/helpers/address.js";

const NODE_URL = process.env.APTOS_NODE_URL || 'https://fullnode.devnet.aptoslabs.com';
const FAUCET_URL = process.env.APTOS_FAUCET_URL || 'https://faucet.devnet.aptoslabs.com';

const account = new Account(TEST_ACCOUNT.privateKey)
const api = new Aptos(NODE_URL)
const faucet = new Faucet(FAUCET_URL, api)

const result = await faucet.fundAccount(account.address(), 1_000_000)

console.log(result)