#!/bin/env node

const Transaction = require('ethereumjs-tx')
const EthUtils = require('ethereumjs-util')
const ls = require('ls')

generateDeployTx = (code) => {
    const rawTx = {
        nonce: 0,
        gasPrice: 100000000000,
        gasLimit: 800000,
        value: 0,
        data: code,
        v: 27,
        r: '0x79BE667EF9DCBBAC55A06295CE870B07029BFCDB2DCE28D959F2815B16F81798',
        s: '0x0aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
    }
    const tx = new Transaction(rawTx)
    const res = {
        senderAddress: '0x' + tx.getSenderAddress().toString('hex'),
        rawTx: '0x' + tx.serialize().toString('hex'),
        contractAddress: '0x' + EthUtils.generateAddress('0x' + tx.getSenderAddress().toString('hex') , 0 ).toString('hex')
    }
    return res
}

generateAll = () => {
  return ls('./build/contracts/*').map((file) => {
    const artifact = require(process.cwd() + file.full.slice(1))
    return {
      name: file.name,
      ...generateDeployTx(artifact.bytecode)
    }
  })
}

module.exports = generateAll


if (require.main === module) {
  for (const contract of generateAll()) {
    if (contract.name === 'Migrations') continue
    console.log('\n\x1b[31m ======= Contract:', contract.name, '=======\x1b[0m')
    console.log('\x1b[34msenderAddress:\x1b[0m', contract.senderAddress)
    console.log('\x1b[34mrawTx:\x1b[0m', contract.rawTx)
    console.log('\x1b[34mcontractAddress:\x1b[0m', contract.contractAddress)
  }
}
