const createContractFromTemplate = config => `
let startingUnixTimestampMsec = ${config.startingUnixTimestamp} * 1000
let startingAssetAmount = ${config.startingAssetAmount} 
let assetId = base58'${config.assetId}'
let ownerPk = base58'${config.ownerPk}'

match tx {
  case tx:TransferTransaction =>
    let elapsedMsec = tx.timestamp - startingUnixTimestampMsec
    let elapsedWeeks = elapsedMsec / 7 * 86400 * 1000 
    let vestingPeriodEnded = if elapsedWeeks > ${config.maxVestingPeriodWeeks} then true else false

    let txSenderAddress = addressFromPublicKey(tx.senderPk)

    let currentBalance = accountAssetBalance(txSenderAddress, assetId)

    let minRequiredAtTxTimestamp = if elapsedWeeks <= ${config.minCliffWeeks} then startingAssetAmount
        else startingAssetAmount * (52 - elapsedWeeks / 52 - ${config.minCliffWeeks})

    let vestingConditionsMatch = (currentBalance - tx.amount) >= minRequiredAtTxTimestamp
    
    let txSenderIsOwner = ownerPk == tx.senderPk

    sigVerify(tx.bodyBytes, tx.proofs[0], tx.senderPk) && txSenderIsOwner && (vestingPeriodEnded || vestingConditionsMatch)

  case burnTx:BurnTransaction => true
  case _ => false
}
`

export {createContractFromTemplate}