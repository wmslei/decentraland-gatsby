import { DEFAULT_FEATURE_FLAG } from '../utils/api/unleash';
export { DEFAULT_FEATURE_FLAG };
export default function useFeatureFlag(endpoint?: string | null): import("./useAsyncMemo").AsyncMemoResult<import("../utils/api/unleash").FeatureFlagsResponse, import("../utils/api/unleash").FeatureFlagsResponse>;
