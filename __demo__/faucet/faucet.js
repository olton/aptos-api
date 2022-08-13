import {Account} from "../../src/index.js";
import {Aptos} from "../../src/index.js";
import {Faucet} from "../../src/api/faucet.js";
import {debug} from "../../src/helpers/debug.js";
import {NODE_URL, FAUCET_URL} from "../../src/helpers/const.js";
import {Alice} from "../helpers/alice.js";
import {Bob} from "../helpers/bob.js";

const alice = new Account(Alice.privateKey)
const bob = new Account(Bob.privateKey)
const api = new Aptos(NODE_URL)
const faucet = new Faucet(FAUCET_URL, api)
let balance, fund

fund = await faucet.fundAccount(alice.address(), 1000000)
debug(fund)
fund = await faucet.fundAccount(bob.address(), 1000000)
debug(fund)

balance = await api.getAccountBalance(alice.address())
debug(balance)
balance = await api.getAccountBalance(bob.address())
debug(balance)