import useAuthContext from './useAuthContext'
import { createAsyncMemoState } from '../../hooks/useAsyncMemo'
import { getDefaultChainId } from './utils'

const fakeState = createAsyncMemoState(getDefaultChainId())

/**
 *
 * @returns
 */
export default function useChainIdContext() {
  const [, { chainId }] = useAuthContext()
  return [chainId, fakeState] as const
}
