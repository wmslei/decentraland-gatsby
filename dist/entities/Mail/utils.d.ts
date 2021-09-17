import React from 'react';
import { Template, TemplateProps } from './types';
export declare function readTemplate(path: string, name: string): Promise<Template>;
export declare function renderTemplate(element: React.ReactElement<TemplateProps>): Promise<Template>;
