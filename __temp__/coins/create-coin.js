import fs from "fs"
import path from "path"
import {Account} from "../../src/index.js";
import {Aptos} from "../../src/index.js";
import {TEST_ACCOUNT} from "../../__tests__/helpers/address.js";
import {debug} from "../../src/helpers/debug.js";

const NODE_URL = process.env.APTOS_NODE_URL || 'https://fullnode.devnet.aptoslabs.com';

const account = new Account(TEST_ACCOUNT.privateKey)
const api = new Aptos(NODE_URL, {
    max_gas_amount: 2000
})

const coinName = "OltonCoin"
const coinSymbol = "OLT"
const coinDec = 6

const modulePath = path.resolve("../__move__/OltonCoin.mv")
const moduleHex = fs.readFileSync(modulePath).toString("hex")

// debug(moduleHex)
// 0xa11ceb0b
// 050000000

// const publish = await api.publishModule(account, `${moduleHex}`)
// debug(publish)

const coinStruct = api.coinStruct(TEST_ACCOUNT.address, "OltonCoin", "OltonCoin")
// debug(coinStruct)
// const init_coin = await api.initCoin(account, coinStruct, coinName, coinSymbol, coinDec)
// debug(init_coin)
const reg_coin = await api.registerCoin(account, coinStruct)
debug(reg_coin)
