import { StatusCodes as HttpStatus } from 'http-status-codes';

export const TODO_NOT_FOUND = {
  name: 'TODO_NOT_FOUND',
  message: "TODO Doesn't Exists IN System",
  explanation: '',
  httpStatusCode: HttpStatus.NOT_FOUND
};
