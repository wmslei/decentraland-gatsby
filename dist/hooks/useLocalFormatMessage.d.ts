export default function useLocalFormatMessage<M extends Record<string, string>>(messages: Partial<M> | undefined, defualtMessages: M, namespace: string): ((id: string, values?: any) => string | null) & {
    markdown: (id: string, values?: any) => JSX.Element | null;
    optional: (id?: string | null | undefined, values?: any) => string;
    isEmpty: (id: string) => boolean;
};
