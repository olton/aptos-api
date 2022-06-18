import {TEST_COIN} from "./helpers/const.js"
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
import {TokenApi, TOKEN_STORE, TOKEN_COLLECTIONS} from "./api/ext/tokens.js"
import {Gas} from "./api/ext/gas.js"

Aptos.use(NodeApi, AccountApi, TransactionApi, EventApi, TableApi, ModuleApi, CoinApi, TokenApi, Gas)

Aptos.TEST_COIN = TEST_COIN
Aptos.TOKEN_STORE = TOKEN_STORE
Aptos.TOKEN_COLLECTIONS = TOKEN_COLLECTIONS

export {
    hexstr,
    HexString,
    Account,
    account,
    Aptos,
    aptos
}