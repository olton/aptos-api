function serializeVectorBool(vecBool: boolean[]) {
    const serializer = new BCS.Serializer();
    serializer.serializeU32AsUleb128(vecBool.length);
    vecBool.forEach((el) => {
        serializer.serializeBool(el);
    });
    return serializer.getBytes();
}

const NUMBER_MAX: number = 9007199254740991;
const client = new AptosClient(NODE_URL);
/** Creates a new collection within the specified account */
async function createCollection(account: AptosAccount, name: string, description: string, uri: string) {
    const scriptFunctionPayload = new TxnBuilderTypes.TransactionPayloadScriptFunction(
        TxnBuilderTypes.ScriptFunction.natural(
            "0x3::token",
            "create_collection_script",
            [],
            [
                BCS.bcsSerializeStr(name),
                BCS.bcsSerializeStr(description),
                BCS.bcsSerializeStr(uri),
                BCS.bcsSerializeUint64(NUMBER_MAX),
                serializeVectorBool([false, false, false]),
            ],
        ),
    );

    const [{ sequence_number: sequenceNumber }, chainId] = await Promise.all([
        client.getAccount(account.address()),
        client.getChainId(),
    ]);

    const rawTxn = new TxnBuilderTypes.RawTransaction(
        TxnBuilderTypes.AccountAddress.fromHex(account.address()),
        BigInt(sequenceNumber),
        scriptFunctionPayload,
        1000n,
        1n,
        BigInt(Math.floor(Date.now() / 1000) + 10),
        new TxnBuilderTypes.ChainId(chainId),
    );

    const bcsTxn = AptosClient.generateBCSTransaction(account, rawTxn);
    const pendingTxn = await client.submitSignedBCSTransaction(bcsTxn);
    await client.waitForTransaction(pendingTxn.hash);
}

const accout = ...

collection = await createCollection(
    account,
    "Collection4",
    "UnLimited Collection",
    "https://pimenov.com.ua"
)