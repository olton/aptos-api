import {Account} from "../../src/index.js";
import {Aptos} from "../../src/index.js";
import {TEST_ACCOUNT} from "../../__tests__/helpers/address.js";
import {debug} from "../../src/helpers/debug.js";

const NODE_URL = process.env.APTOS_NODE_URL || 'https://fullnode.devnet.aptoslabs.com';

const account = new Account(TEST_ACCOUNT.privateKey)
const api = new Aptos(NODE_URL, {
    max_gas_amount: 2000
})

// debug(account.toObject())

// await api.createCollection(account, "Collection1", "Unlimited Collection", "https://pimenov.com.ua")
const col = await api.createCollection(account, "Collection1", "Unlimited Collection", "https://pimenov.com.ua")
console.log(api.lastTransactionStatus())
// debug(await api.createCollection(account, "Collection2", "Limited Collection", "https://pimenov.com.ua", 10))