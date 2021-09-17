import Ajv from 'ajv';
export default function validate<R extends {}>(validator: Ajv.ValidateFunction, body?: Record<string, any>): R;
