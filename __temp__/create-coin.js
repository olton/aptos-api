import fs from "fs"
import path from "path"
import {Account} from "../src/index.js";
import {Aptos} from "../src/index.js";
import {TEST_ACCOUNT} from "../__tests__/helpers/address.js";
import {debug} from "../__tests__/helpers/debug.js";

const NODE_URL = process.env.APTOS_NODE_URL || 'https://fullnode.devnet.aptoslabs.com';

const account = new Account(TEST_ACCOUNT.privateKey)
const api = new Aptos(NODE_URL, {
    max_gas_amount: 2000
})

const coinName = "OltonCoin"
const coinSymbol = "OLT"
const coinDec = 6

const modulePath = path.resolve("../__move__/OltonCoinType.move")
const moduleHex = fs.readFileSync(modulePath).toString("hex")
const publish = await api.publishModule(account, moduleHex)

debug(publish)

// const create_coin = api.createCoin(account, )/**/