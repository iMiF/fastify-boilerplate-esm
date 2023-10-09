import CustomError from './CustomError.js';
import { DEFAULT_MAPPERS } from './mappers/index.js';
import { getRequest, getError } from './helpers.js';

// Экспорт функции
export default (mappers = DEFAULT_MAPPERS, options) =>
  (error, request, reply) => {
    request.log.error({
      request: getRequest(request),
      error: getError(error),
      log_trace: request.logTrace,
      message: 'Error while processing request'
    });

    for (const mapper of mappers) {
      const resp = mapper(error, options);
      if (resp) {
        return reply.code(resp.code).send(resp.response);
      }
    }

    const unhandledError = CustomError.create({
      httpCode: 500,
      code: 'INTERNAL_SERVER_ERROR',
      message: 'Something Went Wrong'
    });

    return reply.code(unhandledError.code).send(unhandledError.response);
  };
