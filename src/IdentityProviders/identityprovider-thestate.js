'use strict'

const Identities = require('orbit-db-identity-provider')

const IdentityProviderInterface = require('./identityprovider-interface')
const OrbitUser = require('../orbit-user')

class TheStateIdentityProvider extends IdentityProviderInterface {
  static get type () {
    return 'thestate'
  }

  static checkType (providerType) {
    if (providerType !== TheStateIdentityProvider.type) {
      throw new Error(`TheStateIdentityProvider can not handle provider type '${providerType}'`)
    }
  }

  static checkCredentials (credentials) {
    if (!credentials.email) throw new Error("'email' not specified")
    if (!credentials.username) throw new Error("'username' not specified")
    if (!credentials.password) throw new Error("'password' not specified")
  }

  static async authorize (ipfs, credentials = {}) {
    TheStateIdentityProvider.checkType(credentials.provider)
    TheStateIdentityProvider.checkCredentials(credentials)

    const identity = await Identities.createIdentity({
      id: credentials.username,
      email: credentials.email,
      password: credentials.password,
      type: TheStateIdentityProvider.type
    })

    const profile = {
      name: credentials.username,
      location: 'Earth',
      image: null
    }

    return new OrbitUser(identity, profile)
  }
}

module.exports = TheStateIdentityProvider
