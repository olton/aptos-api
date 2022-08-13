import {Account, Aptos} from "../../src/index.js";
import {debug} from "../../src/helpers/debug.js";
import {Alice} from "../helpers/alice.js";
import {Bob} from "../helpers/bob.js";
import {NODE_URL} from "../../src/helpers/const.js";

const api = new Aptos(NODE_URL, {
    max_gas_amount: 2000
})

const alice = new Account(Alice.privateKey)
const bob = new Account(Bob.privateKey)

// const offer = await api.tokenCreateOffer(
//     alice,
//     bob.address(),
//     alice.address(),
//     "Collection2",
//     "Token2",
//     1)
// debug(offer.payload)

const claimOffer = await api.tokenClaimOffer(
    bob, alice.address(), alice.address(), "Collection2", "Token2"
)
debug(claimOffer.payload)


