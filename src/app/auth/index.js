import { register as registerSchema } from './schema/register.js';
import { registerHandler } from './handlers/register.js';

const setupRoutes = async fastify => {
  fastify.route({
    method: 'POST',
    url: '/register',
    schema: registerSchema,
    handler: registerHandler
  });
};
export default setupRoutes;
