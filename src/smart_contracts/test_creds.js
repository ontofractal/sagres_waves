// import {createContractFromTemplate} from "./basic_vesting_template";
const {createContractFromTemplate} = require("./basic_vesting_template")

const tokenCreatorSeed = {
  address: "3MxrDd9CHfPrGTVajhXeHpiCAL7Gpp8ijyo",
  keyPair:
    {
      privateKey: "ABBEsgERSEpt4JFBkTKUx7Z3bSUccwsLjuxWpN5duvL9",
      publicKey : "6QYrzWfK7qT5XfU6KUxPXFRBZ8rs3sYZVp2A4J7s81HC",
    },
  phrase : "tent equal buyer sphere iron afford able source term nephew flame perfect crater action alter",
}


const tokenHolderTestKeyPairOne = {
  address: "3NAjHxXD4esAyTn7STfsMc9yF1Pnvrjn4w7",
  keyPair:
    {
      privateKey: "FZqycBVQJY4fgBLaan8cDHHuHSvodbqQpqQWAMyh7v4w",
      publicKey : "774ecw4Sk1tbqXS8RVvCorVEdW8ihmdysponYjfFHnm7",
    },
  phrase : "blur style six pause reward destroy decline gloom vast door arctic party letter image beach",
}
const testContractConfig = {
  address              : tokenHolderTestKeyPairOne.address,
  ownerPk              : tokenHolderTestKeyPairOne.keyPair.publicKey,
  startingDate         : "2018-07-22",
  originalAssetAmount  : 10000,
  assetId              : "EAhaYpFg9a3833aTgAxBBfLEKhP8yZkZ9qZpXDjBXUCg",
  maxVestingPeriodWeeks: 12,
  cliffPeriodWeeks     : 6,
}


export {
  testContractConfig
}

