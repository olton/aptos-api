import {DEFAULT_COIN} from "../../helpers/const.js";

export const CoinApi = {
    createCoin(){},

    async sendCoin(signer, receiver, amount = 0, coin = DEFAULT_COIN, gas){
        const payload = {
            type: 'script_function_payload',
            function: '0x1::Coin::transfer',
            type_arguments: [coin],
            arguments: [this._0x(receiver), amount.toString()],
        }

        return await this.submitTransaction(signer, payload, gas)
    },
}