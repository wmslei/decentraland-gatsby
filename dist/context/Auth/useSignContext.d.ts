export default function useSignContext(): ({
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
