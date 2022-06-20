import {Account, account} from "../../src/index.js"

describe('Testing Aptos Account', () => {
    let _account, _address, _accountObj

    beforeEach(() => {
        _account = account()
        _address = _account.address()
        _accountObj = _account.toObject()
    });

    it('Create Account', () => {
        expect(new Account().address().startsWith('0x')).toBe(true)
    })
    it('Create Account from factory function', () => {
        expect(account().address().startsWith('0x')).toBe(true)
    })
    it('Get Address with _0x', () => {
        expect(Account._0x(_account.address())).toEqual(_address)
        expect(Account._0x(_accountObj)).toEqual(_address)
    })
})