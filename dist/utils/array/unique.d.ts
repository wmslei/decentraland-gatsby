export default function unique<Input, Output = Input>(arr: Input[], map?: (value: Input) => Output): Generator<Output, void, unknown>;
