import { FieldProps } from 'decentraland-ui/dist/components/Field/Field';
import './Textarea.css';
export declare type TextareaProps = Omit<FieldProps, 'onAction'> & {
    disabled?: boolean;
    readOnly?: boolean;
    minHeight?: number;
    maxHeight?: number;
};
export default function Textarea({ minHeight, maxHeight, ...props }: TextareaProps): JSX.Element;
