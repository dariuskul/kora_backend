import { CustomError } from 'ts-custom-error';
import { EStatus } from '../constants/status';

export interface IError extends Error {
  status: keyof typeof EStatus
};

export class HttpError extends CustomError {
  // eslint-disable-next-line space-before-function-paren
  public constructor(public status: keyof typeof EStatus, message?: string) {
    super(message);
  }
};
