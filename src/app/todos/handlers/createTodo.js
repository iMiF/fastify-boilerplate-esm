import { StatusCodes } from 'http-status-codes';
import { createTodo as createTodoService } from '../services/index.js';

const createTodo = fastify => {
  return async (request, reply) => {
    const { body, logTrace } = request;
    const createdTodo = await createTodoService({
      fastify,
      logTrace,
      todo: body
    });
    return reply.code(StatusCodes.CREATED).send(createdTodo);
  };
};

export default createTodo;
