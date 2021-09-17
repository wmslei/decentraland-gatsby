import { ServiceStartHandler } from '../Server/types';
import JobManager from './manager';
export declare const jobInitializer: (manager: JobManager) => ServiceStartHandler;
