import {Aptos} from "../src/index.js";
import {debug} from "../__tests__/helpers/debug.js";

const NODE_URL = process.env.APTOS_NODE_URL || 'https://fullnode.devnet.aptoslabs.com';

const api = new Aptos(NODE_URL)

debug(await api.state())
debug(await api.getHealthy())
debug(await api.getLedger())
debug(await api.getChainId())
debug(await api.getEpoch())
debug(await api.getVersion())
debug(await api.getTimestamp())