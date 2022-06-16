import {Account, account} from "../../src/index.js"

describe('Testing Aptos Account', () => {
    it('Create Account', () => {
        expect(new Account().address().startsWith('0x')).toBe(true)
    })
    it('Create Account from factory function', () => {
        expect(account().address().startsWith('0x')).toBe(true)
    })
})