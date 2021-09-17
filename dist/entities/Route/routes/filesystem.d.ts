export declare type FilesystemHandleOptions = {
    indexFile: string;
    notFoundFile: string;
};
export default function filesystem(path: string, notFoundPage: string | Partial<FilesystemHandleOptions>): import("express-serve-static-core").Router;
