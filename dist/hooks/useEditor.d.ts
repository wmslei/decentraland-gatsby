export declare type Editor<P extends {} = {}> = (state: P, newProps: Partial<P>) => P;
export declare type EditorError<P extends {} = {}> = Partial<Record<keyof P | '*', string>>;
export declare type Validator<P extends {} = {}> = (state: P, props: (keyof P | '*')[]) => EditorError<P>;
export declare type PropValidator<P extends {} = {}> = (state: P, prop: keyof P | '*', props: (keyof P | '*')[]) => EditorError<P>;
declare type EditorState<P extends {} = {}> = {
    value: P;
    error: EditorError<P>;
    validated: boolean;
};
export default function useEditor<P extends {} = {}>(editor: Editor<P>, validator: Validator<P>, initialState: P): readonly [EditorState<P>, {
    readonly set: (newProps: Partial<P>, options?: {
        validate?: boolean | undefined;
    }) => void;
    readonly validate: () => void;
    readonly error: (err: EditorError<P>) => void;
}];
export declare function assert<T>(value: true, onError: T): undefined;
export declare function assert<T>(value: false, onError: T): T;
export declare function assert<T>(value: boolean, onError: T): T | undefined;
export declare function createValidator<P extends {} = {}>(map: Partial<Record<keyof P | '*', PropValidator<P>>>): Validator<P>;
export {};
