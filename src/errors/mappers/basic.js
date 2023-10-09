import CustomError from '../CustomError.js';

export default error => {
  if (error instanceof CustomError) {
    return error;
  }
  return undefined;
};
