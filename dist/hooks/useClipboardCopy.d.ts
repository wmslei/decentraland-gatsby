export default function useClipboardCopy(timeout?: number): readonly [string | number | boolean | null, {
    readonly copy: (value: string | number | boolean | null) => void;
    readonly clear: () => void;
}];
