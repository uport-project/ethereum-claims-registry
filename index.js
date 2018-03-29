module.exports = {
  registry: require('./build/contracts/EthereumClaimsRegistry.json'),
  extensions: {
    RevokeAndPublish: require('./build/contracts/RevokeAndPublish.json'),
  }
}
