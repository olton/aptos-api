import {account} from "../../src/index.js"
import {Alice} from "../../__demo__/helpers/alice.js";

describe('Testing Aptos Account', () => {
    it('Restore Account fromprivkey', () => {
        expect(account(Alice.privateKey).address()).toBe(Alice.address)
    })
})