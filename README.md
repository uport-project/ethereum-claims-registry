# Ethereum Claims Registry
The Ethereum Claims Registry is a contract that stores claims made by and to identities and contracts on the ethereum blockchain.

## Using the registry
The Claim Registry can be used from javascript as well as directly from other contracts.

### From javascript
To use the contract we provide truffle artifacts. Once you require the `uport-identity` module you will get an object containing a versioned index of the uport contracts. You can specify which version you want to user, or just use the latest one. Keep in mind that different versions will be deployed to different addresses.
```javascript
const EthereumClaimsRegistry = require('ethereum-claims-registry')
```

 You can use `truffle-contract` to utilize these artifacts.
```javascript
const Contract = require('truffle-contract')
let ClaimsReg = Contract(EthereumClaimsRegistry)
ClaimsReg.setProvider(web3.currentProvider)
let claimsReg = ClaimsReg.deployed()
```
You can also use web3.
```javascript
let networkId = 1 // Mainnet
let ClaimsReg = web3.eth.contract(EthereumClaimsRegistry.abi)
let claimsReg = ClaimsReg.at(EthereumClaimsRegistry.networks[networkId].address)
```

### From solidity
TODO - add documentation

## Testing the contracts

Make sure you have truffle installed then simply run:
```
$ truffle test
```

