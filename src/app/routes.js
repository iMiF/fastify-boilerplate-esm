import { errorHandler } from '../errors/index.js';
import todoRoutes from './todos/routes/index.js';
import authRoutes from './auth/index.js';

export default async fastify => {
  fastify.setErrorHandler(errorHandler());
  fastify.register(todoRoutes, { prefix: '/v1/todos' });
  fastify.register(authRoutes, { prefix: '/v1/auth' });
};
