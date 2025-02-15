import type { ConnectionResponse } from 'decentraland-connect/dist/types'
import type { AuthChain } from 'dcl-crypto/dist/types'
import EmptyAccountsError from '../errors/EmptyAccountsError'
import once from '../function/once'
import rollbar from '../development/rollbar'
import segment from '../development/segment'

const dependencies = once(async () =>
  Promise.all([
    import('web3x/address'),
    import('web3x/account'),
    import('web3x/personal'),
    import('web3x/utils/hex-buffer'),
    import('dcl-crypto/dist/Authenticator'),
  ] as const)
)

export default async function identify(connection: ConnectionResponse) {
  try {
    if (!connection.account) {
      throw new EmptyAccountsError()
    }

    const [
      { Address } /* from web3x/address */,
      { Account } /* from web3x/account */,
      { Personal } /* from web3x/personal */,
      { bufferToHex } /* from web3x/utils/hex-buffer */,
      { Authenticator } /* from dcl-crypto/dist/Authenticator */,
    ] = await dependencies()

    const address = connection.account!
    const provider = connection.provider
    const account = Account.create()
    const expiration = 60 * 24 * 30
    const payload = {
      address: account.address.toString(),
      publicKey: bufferToHex(account.publicKey),
      privateKey: bufferToHex(account.privateKey),
    }

    const identity = await Authenticator.initializeAuthChain(
      address,
      payload,
      expiration,
      (message) =>
        new Personal(provider as any).sign(
          message,
          Address.fromString(address),
          ''
        )
    )

    return identity
  } catch (err) {
    console.error(err)
    rollbar((rollbar) => rollbar.error(err))
    segment((analytics) =>
      analytics.track('error', {
        ...err,
        message: err.message,
        stack: err.stack,
      })
    )
    return null
  }
}

export async function ownerAddress(authChain: AuthChain) {
  const [
    ,
    ,
    ,
    ,
    /*web3x/address*/ /*web3x/account*/ /*web3x/personal*/ /*web3x/utils/hex-buffer*/ {
      Authenticator,
    } /* from dcl-crypto/dist/Authenticator */,
  ] = await dependencies()

  return Authenticator.ownerAddress(authChain).toLowerCase()
}
