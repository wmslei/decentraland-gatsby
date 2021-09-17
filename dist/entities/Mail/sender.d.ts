import { SES } from 'aws-sdk';
import { TemplateContent, SendOptions, Destination } from './types';
export declare type Options = SES.Types.ClientConfiguration & {
    source?: string;
    path?: string;
    bulk?: boolean;
};
export default class Sender {
    ses: SES;
    templateLoaded: Map<string, boolean>;
    templateContent: Map<string, TemplateContent>;
    bulk: boolean;
    metrics: boolean;
    path: string;
    source: string;
    email: string;
    region?: string;
    constructor({ path, bulk, source, ...options }: Options);
    inc(value?: number): void;
    send(options: SendOptions): Promise<SES.SendBulkTemplatedEmailResponse[] | SES.SendEmailResponse[]>;
    sendAll(options: SendOptions): Promise<SES.SendEmailResponse[]>;
    sendBulk(options: SendOptions): Promise<SES.SendBulkTemplatedEmailResponse[]>;
    getTemplate(name: string): Promise<TemplateContent>;
    checkTemplate(name: string): Promise<boolean>;
    deployTemplate(name: string): Promise<boolean>;
    parseTemplate(name: string, replacements?: Record<string, string>): Promise<{
        Subject: {
            Data: string;
            Charset: string;
        };
        Body: {
            Html: {
                Data: string;
                Charset: string;
            };
            Text: {
                Data: string;
                Charset: string;
            };
        };
    }>;
    destination(value: string | Destination): Destination;
    replace(template: string, replacements?: Record<string, string>): string;
}
