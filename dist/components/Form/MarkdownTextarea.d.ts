import { TextareaProps } from './Textarea';
import './MarkdownTextarea.css';
declare type MarkdownTextarea = TextareaProps & {
    preview?: boolean;
    previewLabel?: string;
};
export default function MarkdownTextarea({ preview, label, previewLabel, className, ...props }: MarkdownTextarea): JSX.Element;
export {};
