import {Account} from "../../src/index.js";
import {Aptos} from "../../src/index.js";
import {Faucet} from "../../src/api/faucet.js";
import {debug} from "../../src/helpers/debug.js";
import {NODE_URL} from "../helpers/consts.js";
import {FAUCET_URL} from "../helpers/consts.js";
import {Alice} from "../helpers/alice.js";

const account = new Account(Alice.privateKey)
const api = new Aptos(NODE_URL)
const faucet = new Faucet(FAUCET_URL, api)
let balance, fund

balance = await api.getAccountBalance(account.address())
debug(balance)

fund = await faucet.fundAccount(account.address(), -100)
debug(fund)

balance = await api.getAccountBalance(account.address())
debug(balance)