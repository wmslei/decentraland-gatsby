/// <reference types="node" />
import { Server } from 'http';
import { Application } from 'express';
import { ServiceStartHandler } from './types';
export declare const DEFAULT_PORT = 4000;
export declare const DEFAULT_HOST = "0.0.0.0";
export declare function listen(app: Application, port?: number | string, host?: string): Promise<Server>;
export declare const serverInitializer: (app: Application, port?: number | string, host?: string) => ServiceStartHandler;
