import ErrorCodes from './errorCodes.js';
import CustomError from '../CustomError.js';

export const TodoNotFound = error =>
  CustomError.create({
    httpCode: ErrorCodes.TODO_NOT_FOUND.httpStatusCode,
    message: ErrorCodes.TODO_NOT_FOUND.message,
    code: ErrorCodes.TODO_NOT_FOUND.name,
    error
  });
