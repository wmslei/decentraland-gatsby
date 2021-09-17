import { ServiceStartHandler } from './types';
export declare function initializeServices(serviceInitializers: (ServiceStartHandler | false | null | undefined)[]): Promise<void>;
