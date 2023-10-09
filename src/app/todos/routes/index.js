import { createTodoSchema } from '../schemas/index.js';

import { createTodo } from '../handlers/index.js';

const setupRoutes = async fastify => {
  fastify.route({
    method: 'POST',
    url: '/',
    schema: createTodoSchema,
    handler: createTodo(fastify)
  });
};

export default setupRoutes;
