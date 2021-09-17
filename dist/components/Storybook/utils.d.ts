import { ArgType } from '@storybook/components';
export declare const Args: {
    Types: {
        Int: {
            summary: string;
            detail: string;
        };
        Uint: {
            summary: string;
            detail: string;
        };
        Hex: {
            summary: string;
            detail: string;
        };
    };
    type: (summary: string, detail?: string | undefined) => {
        summary: string;
        detail: string | undefined;
    };
    definedTypes(summary: string, types: any[]): {
        summary: string;
        detail: string | undefined;
    };
    prop(name: string, description: string, type?: string | import("@storybook/components").PropSummaryValue | undefined): ArgType;
    requiredProp(name: string, description: string, type?: string | import("@storybook/components").PropSummaryValue | undefined): ArgType;
    param(name: string, description: string, type?: string | import("@storybook/components").PropSummaryValue | undefined): ArgType;
    requiredParam(name: string, description: string, type?: string | import("@storybook/components").PropSummaryValue | undefined): ArgType;
    returns(name: string, description: string, type?: string | import("@storybook/components").PropSummaryValue | undefined): {
        name: string;
        description: string;
        table: {
            type: import("@storybook/components").PropSummaryValue | {
                summary: string;
                detail: string | undefined;
            } | undefined;
            category: string;
        };
    };
};
