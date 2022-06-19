import {Account} from "../../src/index.js";
import {Aptos} from "../../src/index.js";
import {TEST_ACCOUNT} from "../../__tests__/helpers/address.js";
import {debug} from "../../src/helpers/debug.js";

const NODE_URL = process.env.APTOS_NODE_URL || 'https://fullnode.devnet.aptoslabs.com';

const api = new Aptos(NODE_URL, {
    max_gas_amount: 2000
})

// debug(await api.getEvents("0x0100000000000000a4d27f099e99499b2eb00cf3dac1643bb3daa4db3928a777a04b52efb96bdd55"))
// debug(await api.getEventsByHandle(TEST_ACCOUNT.address, "0x1::Coin::CoinStore<0x1::TestCoin::TestCoin>", "deposit_events"))
debug(await api.getEventsByHandle(TEST_ACCOUNT.address, "0x1::Coin::CoinEvents", "register_events"))
