Sagres is an open source web app for generation of vesting smart contracts on WAVES blockchain.
 
It can be used to define linear vesting schemes with max vesting period and vesting cliff at the start. Smart contract restricts withdrawal of predefined asset for individual accounts of project founders, invstors, employees an consultants. An individual smart contract should be deployed for every account that needs vesting scheme.
  

# Sagres?

![](https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Leuchtturm_Algarve_20060422.jpg/640px-Leuchtturm_Algarve_20060422.jpg)

Sagres is a beautiful place in Portugal, where steep cliffs are shaped and eroded by waves. I find Sagres to be a fitting name for vesting contracts for WAVES blockchain.

# Why?

Vesting is an important incentive design tool that can be used to align incentives of project co-founders, employees, consultants and investors.


# Features

Sagres includes a vesting smart contract template that accepts a set of parameters and generates a RIDE smart contract that is designed to be attached to individual accounts of token holders.

| Parameter | Description |
| --- | ---- |
| startingDate | A starting date for vesting period | 
| originalAssetAmount | A starting amount of tokens for the given account |
| assetId | asset ID |
| ownerPk | account owner Public Key |
| maxVestingPeriodWeeks | vesting period in weeks |
| cliffPeriodWeeks | cliff period in weeks |


# Example of generated smart contract 

```
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
          else startingAssetAmount * (12 - elapsedWeeks / 12 - 6)
  
      let vestingConditionsMatch = remainingBalanceAfterTx >= minRequiredAtTxTimestamp
  
      sigVerify(tx.bodyBytes, tx.proofs[0], tx.senderPk) && txSenderIsOwner && (vestingPeriodEnded || vestingConditionsMatch)
  
    case burnTx:BurnTransaction => true
    case _ => false
  }

```
