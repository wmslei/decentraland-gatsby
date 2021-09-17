import { Provider } from 'decentraland-connect/dist/types';
export default function useSign(address?: string | null, provider?: Provider | null): ({
    signature: string | null;
    message: string | null;
    sign?: undefined;
    signing?: undefined;
} | {
    sign: (message: string) => void;
    signing: boolean;
    signature?: undefined;
    message?: undefined;
})[];
