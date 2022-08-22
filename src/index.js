import {hexstr, HexString} from "./helpers/hex-string.js"
import {Account, account} from "./account/index.js"
import {Aptos, aptos} from "./api/index.js"
import {APTOS_TOKEN, TOKEN_STORE, TOKEN_COLLECTIONS,
    TRANS_BY_HASH, NODE_URL, FAUCET_URL, TOKEN_TOKEN,
    NODE_URL_OLD, TOKEN_ID, TRANS_BY_VERSION} from "./helpers/const.js";
import {Result, TransResult} from "./helpers/result.js";

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
Aptos.Result = Result
Aptos.TransResult = TransResult

export {
    hexstr,
    HexString,
    Account,
    account,
    Aptos,
    aptos
}