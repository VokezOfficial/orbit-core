'use strict'

const TheStateIdentityProvider = require('./identityprovider-thestate')
//OrbitIdentityProvider = require('./identityprovider-orbit')
// // const uPortIdentifyProvider = require('./identityprovider-uport')

const enabledProviders = [
  TheStateIdentityProvider
  // OrbitIdentityProvider
  // uPortIdentifyProvider,
]

const identityProviders = {}
enabledProviders.forEach(p => {
  identityProviders[p.type] = p
})

class IdentityProviders {
  static authorizeUser (ipfs, credentials = {}) {
    if (!credentials.provider) throw new Error("'provider' not specified")
    const provider = identityProviders[credentials.provider]
    if (!provider) throw new Error(`Provider '${credentials.provider}' not found`)
    return provider.authorize(ipfs, credentials)
  }
}

module.exports = IdentityProviders
