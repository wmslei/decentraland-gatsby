import { Request } from 'express'
import RequestError from './error';

export type ParamOptions = {
  validator: (value: any) => boolean,
  parser: <T>(value: any) => T
}

/**
 * @deprecated use the handle context instead
 */
export default function param<T = string>(req: Request, name: string, validator: (value: any) => boolean = Boolean): T {
  let value;

  if (req.query && req.query[name]) {
    value = req.query[name];
  }
  else if (req.body && req.body[name]) {
    value = req.body[name];
  }
  else if (req.params && req.params[name]) {
    value = req.params[name];
  }

  if (validator && !validator(value)) {
    throw new RequestError(`Invalid param ${name}: "${value}"`, RequestError.BadRequest);
  }

  return value;
}