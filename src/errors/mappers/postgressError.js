import CustomError from '../CustomError.js';
import { POSTGRES_DB_ERRORS } from '../constants.js';

export default error => {
  if (error.code && POSTGRES_DB_ERRORS[error.code]) {
    const { statusCode, errorCode } = POSTGRES_DB_ERRORS[error.code];
    const detail = error.detail || error.stack;
    const fieldName = error.column;
    return CustomError.create({
      httpCode: statusCode,
      message: detail,
      property: fieldName,
      code: errorCode
    });
  }
  return undefined;
};
