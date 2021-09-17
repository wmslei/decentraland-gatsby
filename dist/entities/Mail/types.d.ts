export declare type TemplateContent = {
    Body: {
        Html: {
            Charset: string;
            Data: string;
        };
        Text: {
            Charset: string;
            Data: string;
        };
    };
    Subject: {
        Charset: string;
        Data: string;
    };
};
export declare type TemplateProps = {
    name?: string;
    subject?: string;
    text?: string;
};
export declare type Template = {
    TemplateName: string;
    SubjectPart: string;
    HtmlPart: string;
    TextPart: string;
};
export declare type SendOptions<T extends string = string, R extends Record<string, string> = Record<string, string>> = {
    destinations: (string | Destination<R>)[];
    template: T;
    defaultReplacement?: R;
};
export declare type Destination<R extends Record<string, string> = Record<string, string>> = {
    email: string;
    replacement: R;
};
