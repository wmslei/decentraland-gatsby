export declare type ApiResponse<D> = {
    ok: boolean;
    data: D;
};
export declare type ApiError<D = undefined> = {
    ok: boolean;
    error: string;
    data: D;
};
export declare type ApiValidationError = {
    ok: boolean;
    error: string;
    data: {
        errors: string[];
    };
};
