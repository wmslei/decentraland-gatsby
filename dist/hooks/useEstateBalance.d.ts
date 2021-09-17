import { ChainId } from '../utils/loader/estateBalance';
export default function useEstateBalance(account?: string | null, chainId?: ChainId | null): readonly [number, number, import("./useAsyncMemo").AsyncMemoResultState<readonly [number, number], [number, number]>];
