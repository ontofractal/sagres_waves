// import {DateTime} from "luxon"
const {DateTime} = require("luxon")

const createContractFromTemplate = ({startingDate, originalAssetAmount, assetId, ownerPk, maxVestingPeriodWeeks, cliffPeriodWeeks}) => {
  const startingUnixTimestampMsec = DateTime.fromISO(startingDate).toMillis()

  return `
  let startingUnixTimestampMsec = ${startingUnixTimestampMsec} 
  let originalAssetAmount = ${originalAssetAmount} 
  let assetId = base58'${assetId}'
  let ownerPk = base58'${ownerPk}'
  
  match tx {
    case tx:TransferTransaction =>
    
      let txSenderIsOwner = ownerPk == tx.senderPk
      let txSenderAddress = addressFromPublicKey(tx.senderPk)
    
    
      let elapsedMsec = tx.timestamp - startingUnixTimestampMsec
      let elapsedWeeks = elapsedMsec / 7 * 86400 * 1000 
      let vestingPeriodEnded = if elapsedWeeks > ${maxVestingPeriodWeeks} then true else false
      
      let currentBalance = accountAssetBalance(txSenderAddress, assetId)
      let remainingBalanceAfterTx = currentBalance - tx.amount
  
      let minRequiredAtTxTimestamp = if elapsedWeeks <= ${cliffPeriodWeeks} then originalAssetAmount
          else startingAssetAmount * (${maxVestingPeriodWeeks} - elapsedWeeks / ${maxVestingPeriodWeeks} - ${cliffPeriodWeeks})
  
      let vestingConditionsMatch = remainingBalanceAfterTx >= minRequiredAtTxTimestamp
  
      sigVerify(tx.bodyBytes, tx.proofs[0], tx.senderPk) && txSenderIsOwner && (vestingPeriodEnded || vestingConditionsMatch)
  
    case burnTx:BurnTransaction => true
    case _ => false
  }
`
}

// export {createContractFromTemplate}
module.exports = {
  createContractFromTemplate
}