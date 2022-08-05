import {Aptos} from "../../src/index.js";
import {debug} from "../../src/helpers/debug.js";
import {NODE_URL, TRANS_BY_HASH, TRANS_BY_VERSION} from "../../src/helpers/const.js";

const hash = `0x04e59519d40500215dad8e0dc65a83067cefe95680278968efd0246cc2485b5b`
const version = `366035`

const api = new Aptos(NODE_URL)

// debug(await api.getTransaction(hash))
debug(await api.getTransaction(version, TRANS_BY_VERSION))