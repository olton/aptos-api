import {hexstr, HexString} from "./helpers/hex-string.js"
import {Account, account} from "./account/index.js"
import {Aptos, aptos} from "./api/index.js"
import {AccountApi} from "./api/ext/account.js"
import {NodeApi} from "./api/ext/node.js"
import {EventApi} from "./api/ext/events.js"
import {TableApi} from "./api/ext/table.js"
import {TransactionApi} from "./api/ext/transactions.js"
import {ModuleApi} from "./api/ext/modules.js"
import {CoinApi} from "./api/ext/coins.js"
import {TokenApi} from "./api/ext/tokens.js"
import {Gas} from "./api/ext/gas.js"
import {APTOS_TOKEN, TOKEN_STORE, TOKEN_COLLECTIONS,
    TRANS_BY_HASH, NODE_URL, FAUCET_URL, TOKEN_TOKEN,
    NODE_URL_OLD, TOKEN_ID, TRANS_BY_VERSION} from "./helpers/const.js";

Aptos.use(NodeApi, AccountApi, TransactionApi, EventApi, TableApi, ModuleApi, CoinApi, TokenApi, Gas)

Aptos.TEST_COIN = APTOS_TOKEN
Aptos.APTOS_COIN = APTOS_TOKEN
Aptos.APTOS_TOKEN = APTOS_TOKEN
Aptos.TOKEN_STORE = TOKEN_STORE
Aptos.TOKEN_COLLECTIONS = TOKEN_COLLECTIONS
Aptos.TOKEN_ID = TOKEN_ID
Aptos.TOKEN_TOKEN = TOKEN_TOKEN
Aptos.TRANS_BY_HASH = TRANS_BY_HASH
Aptos.TRANS_BY_VERSION = TRANS_BY_VERSION
Aptos.NODE_URL = NODE_URL
Aptos.NODE_URL_OLD = NODE_URL_OLD
Aptos.FAUCET_URL = FAUCET_URL

export {
    hexstr,
    HexString,
    Account,
    account,
    Aptos,
    aptos
}