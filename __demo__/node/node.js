import {Aptos} from "../../src/index.js";
import {debug} from "../../src/helpers/debug.js";
import {NODE_URL, NODE_URL_OLD} from "../../src/helpers/const.js";


const api = new Aptos(NODE_URL)

debug(await api.state())
debug(await api.getHealthy())
debug(await api.getLedger())
debug(await api.getChainId())
debug(await api.getEpoch())
debug(await api.getVersion())
debug(await api.getTimestamp())