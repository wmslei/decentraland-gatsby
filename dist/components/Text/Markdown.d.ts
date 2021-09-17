import React from 'react';
import ReactMarkdown, { ReactMarkdownProps, NodeType } from 'react-markdown';
export declare type MarkdownProps = Omit<ReactMarkdownProps, 'renders' | 'linkTarget' | 'astPlugins' | 'plugins'>;
export declare const renderers: Partial<Record<NodeType, React.ReactType<any>>>;
export declare const allowedTypes: ReactMarkdown.NodeType[];
declare const _default: React.NamedExoticComponent<Pick<ReactMarkdown.ReactMarkdownProps, "className" | "source" | "sourcePos" | "includeNodeIndex" | "rawSourcePos" | "escapeHtml" | "skipHtml" | "allowNode" | "allowedTypes" | "disallowedTypes" | "transformLinkUri" | "transformImageUri" | "unwrapDisallowed" | "renderers" | "parserOptions">>;
export default _default;
