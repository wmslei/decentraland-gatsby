/// <reference types="jest" />
declare const mock: {
    log: jest.SpyInstance<void, [string, (Record<string, any> | undefined)?]>;
    error: jest.SpyInstance<void, [string, (Record<string, any> | undefined)?]>;
    warning: jest.SpyInstance<void, [string, (Record<string, any> | undefined)?]>;
};
export default mock;
