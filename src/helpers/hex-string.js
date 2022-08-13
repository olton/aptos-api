import {Buffer} from 'buffer'

export class HexString {
    hexString = ""

    constructor(hexString) {
        if (hexString.startsWith("0x")) {
            this.hexString = hexString
        } else {
            this.hexString = `0x${hexString}`
        }
    }

    hex() {
        return this.hexString
    }

    noPrefix() {
        return (this.hexString.startsWith("0x")) ? this.hexString.slice(2) : this.hexString
    }

    toString() {
        return this.hex()
    }

    toBuffer() {
        return Buffer.from(this.noPrefix(), "hex")
    }

    toUint8Array() {
        return Uint8Array.from(this.toBuffer())
    }
}

HexString.fromBuffer = buffer => new HexString(Buffer.from(buffer).toString("hex"))
HexString.fromUnit8Array = arr => new HexString.fromBuffer(Buffer.from(arr))
HexString.toHex = s => new HexString(s).toString()

export const hexstr = s => new HexString(s)

export const str2hex = s => Buffer.from(s).toString("hex")
export const hex2str = s => Buffer.from(s, 'hex').toString("utf8")