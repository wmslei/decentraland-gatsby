import { useEffect, useState } from 'react'
import { ChainId } from '@dcl/schemas'
import { ProviderType } from 'decentraland-connect/dist/types'
import { connection } from 'decentraland-connect/dist/ConnectionManager'
import { setCurrentIdentity } from '../utils/auth/storage'
import segment from '../utils/development/segment'
import rollbar from '../utils/development/rollbar'
import { Identity } from '../utils/auth'
import { PersistedKeys } from '../utils/loader/types'
import logger from '../entities/Development/logger'
import useAsyncTask from './useAsyncTask'
import {
  AuthEvent,
  AuthState,
  AuthStatus,
  createConnection,
  getListener,
  initialState,
  isLoading,
  restoreConnection,
  switchToChainId,
} from './useAuth.utils'

export { initialState }

let CONNECTION_PROMISE: Promise<AuthState> | null = null

export default function useAuth() {
  const [state, setState] = useState<AuthState>({ ...initialState })

  function select(selecting: boolean = true) {
    if (isLoading(state.status)) {
      return
    }

    if (selecting === state.selecting) {
      return
    }

    setState((current) => ({ ...current, selecting }))
  }

  function connect(providerType: ProviderType, chainId: ChainId) {
    if (isLoading(state.status)) {
      return
    }

    if (state.account) {
      console.warn(`Already connected as "${state.account}"`)
      return
    }

    const conn = { providerType: providerType, chainId: chainId }
    if (!providerType || !chainId) {
      console.error(`Invalid connection params: ${JSON.stringify(conn)}`)
      rollbar((rollbar) =>
        rollbar.error(`Invalid connection params: ${JSON.stringify(conn)}`)
      )
      segment((analytics) =>
        analytics.track('error', {
          message: `Invalid connection params: ${JSON.stringify(conn)}`,
          conn,
        })
      )
      return
    }

    segment((analytics, context) =>
      analytics.track(AuthEvent.Connect, { ...context, ...conn })
    )
    setState({
      account: null,
      identity: null,
      provider: null,
      error: null,
      selecting: state.selecting,
      status: AuthStatus.Connecting,
      providerType,
      chainId,
    })
  }

  function disconnect() {
    if (isLoading(state.status)) {
      return
    }

    if (!state.account) {
      return
    }

    setState({
      status: AuthStatus.Disconnecting,
      account: null,
      identity: null,
      provider: null,
      error: null,
      selecting: false,
      providerType: null,
      chainId: null,
    })
  }

  const [switching, switchTo] = useAsyncTask(async (chainId: ChainId) => {
    if (state.providerType === ProviderType.INJECTED) {
      try {
        await switchToChainId(state.provider, chainId)
      } catch (err) {
        setState({ ...state, error: err.message })
      }
    }
  })

  // bootstrap
  useEffect(() => {
    let cancelled = false
    function updateIdetity(newIdentity: Identity | null) {
      if (!cancelled) {
        setState((currentState) => {
          if (currentState.identity === newIdentity) {
            return currentState
          }

          if (newIdentity) {
            return {
              status: AuthStatus.Restoring,
              selecting: false,
              account: null,
              identity: null,
              provider: null,
              providerType: null,
              chainId: null,
              error: null,
            }
          }

          return {
            status: AuthStatus.Disconnecting,
            selecting: false,
            account: null,
            identity: null,
            provider: null,
            providerType: null,
            chainId: null,
            error: null,
          }
        })
      }
    }

    getListener().addEventListener(PersistedKeys.Identity as any, updateIdetity)
    return () => {
      cancelled = true
      getListener().removeEventListener(
        PersistedKeys.Identity as any,
        updateIdetity
      )
    }
  }, [])

  // connect or disconnect
  useEffect(() => {
    let cancelled = false

    if (state.status === AuthStatus.Restoring) {
      if (!CONNECTION_PROMISE) {
        CONNECTION_PROMISE = restoreConnection()
      }

      Promise.resolve(CONNECTION_PROMISE)
        .then((result) => {
          if (!cancelled) {
            setState(result)
          }

          CONNECTION_PROMISE = null
        })
        .catch((err) => {
          logger.error('Error restoring session', err)
          CONNECTION_PROMISE = null
        })
    }

    // connect
    if (
      state.status === AuthStatus.Connecting &&
      state.providerType &&
      state.chainId
    ) {
      if (!CONNECTION_PROMISE) {
        CONNECTION_PROMISE = createConnection(state.providerType, state.chainId)
      }

      Promise.resolve(CONNECTION_PROMISE)
        .then((result) => {
          if (!cancelled) {
            if (result.status === AuthStatus.Connected) {
              const conn = {
                account: result.account,
                providerType: state.providerType,
                chainId: state.chainId,
              }

              segment((analytics, context) => {
                analytics.identify(conn.account!)
                analytics.track(AuthEvent.Connected, { ...context, ...conn })
              })

              rollbar((rollbar) => {
                rollbar.configure({
                  payload: {
                    person: {
                      id: conn.account!,
                    },
                  },
                })
              })
            } else {
              result.selecting = state.selecting
            }

            setState(result)
          }

          CONNECTION_PROMISE = null
        })
        .catch((err) => {
          CONNECTION_PROMISE = null
          logger.error('Error creating session', err)
        })
    }

    // disconnect
    if (
      state.status === AuthStatus.Disconnecting &&
      state.providerType === null &&
      state.chainId === null
    ) {
      setCurrentIdentity(null)
      connection.disconnect().catch((err) => {
        console.error(err)
        rollbar((rollbar) => rollbar.error(err))
        segment((analytics) =>
          analytics.track('error', {
            ...err,
            message: err.message,
            stack: err.stack,
          })
        )
      })
      segment((analytics, context) =>
        analytics.track(AuthEvent.Disconnected, context)
      )
      rollbar((rollbar) =>
        rollbar.configure({ payload: { person: { id: null } } })
      )
      setState({
        ...initialState,
        status: AuthStatus.Disconnected,
      })
    }

    return () => {
      cancelled = true
    }
  }, [state.status, state.providerType, state.chainId])

  useEffect(() => {
    const provider = state.provider
    const onDisconnect = () => disconnect()
    const onChainChanged = (chainId: ChainId) =>
      setState({ ...state, chainId: Number(chainId) })

    if (provider) {
      provider.on('chainChanged', onChainChanged)
      provider.on('accountsChanged', onDisconnect)
      provider.on('disconnect', onDisconnect)
    }

    return () => {
      if (provider) {
        provider.removeListener('chainChanged', onChainChanged)
        provider.removeListener('accountsChanged', onDisconnect)
        provider.removeListener('disconnect', onDisconnect)
      }
    }
  }, [state.provider])

  const loading = isLoading(state.status) || switching

  return [
    state.account,
    {
      connect,
      disconnect,
      switchTo,
      select,
      loading,
      error: state.error,
      selecting: state.selecting,
      provider: !loading ? state.provider : null,
      providerType: !loading ? state.providerType : null,
      chainId: !loading ? state.chainId : null,
    },
  ] as const
}
