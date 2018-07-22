import {createContractFromTemplate} from "./basic_vesting_template";
import {testContractConfig} from "./test_creds";

it("renders without crashing", () => {
  const result = createContractFromTemplate(testContractConfig)

  const testResult = `
  let startingUnixTimestampMsec = 1532214000000 
  let originalAssetAmount = 10000 
  let assetId = base58'EAhaYpFg9a3833aTgAxBBfLEKhP8yZkZ9qZpXDjBXUCg'
  let ownerPk = base58'774ecw4Sk1tbqXS8RVvCorVEdW8ihmdysponYjfFHnm7'
  
  match tx {
    case tx:TransferTransaction =>
    
      let txSenderIsOwner = ownerPk == tx.senderPk
      let txSenderAddress = addressFromPublicKey(tx.senderPk)
    
    
      let elapsedMsec = tx.timestamp - startingUnixTimestampMsec
      let elapsedWeeks = elapsedMsec / 7 * 86400 * 1000 
      let vestingPeriodEnded = if elapsedWeeks > 12 then true else false
      
      let currentBalance = accountAssetBalance(txSenderAddress, assetId)
      let remainingBalanceAfterTx = currentBalance - tx.amount
  
      let minRequiredAtTxTimestamp = if elapsedWeeks <= 6 then originalAssetAmount
          else originalAssetAmount * (12 - elapsedWeeks / 12 - 6)
  
      let vestingConditionsMatch = remainingBalanceAfterTx >= minRequiredAtTxTimestamp
  
      sigVerify(tx.bodyBytes, tx.proofs[0], tx.senderPk) && txSenderIsOwner && (vestingPeriodEnded || vestingConditionsMatch)
  
    case burnTx:BurnTransaction => true
    case _ => false
  }
`
  expect(result).toEqual(testResult)
});
