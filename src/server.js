import 'make-promises-safe';
import path from 'path';
import { fileURLToPath } from 'url';
import fastify from 'fastify';
import fastifyFormbody from '@fastify/formbody';
import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import swagger from '@fastify/swagger';
import underPressure from '@fastify/under-pressure';
import autoload from '@fastify/autoload';
import * as lib from './lib/index.js';
import * as routes from './app/routes.js';
import { requestContext, onResponse, appendPayloadToResponse } from './hooks/index.js';
import { setupAllShutdownHandlers as setupGracefulShutdown } from './shutdown.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const underPressureConfig = () => {
  return {
    healthCheck: async function () {
      // TODO: Add database connection check
      return true;
    },
    message: 'Under Pressure 😯',
    exposeStatusRoute: '/status',
    healthCheckInterval: 5000
  };
};

const swaggerConfig = () => {
  return {
    routePrefix: '/documentation',
    swagger: {
      info: {
        title: 'Fastify Boilerplate',
        description: 'A full blown production ready boilerplate to build APIs with Fastify',
        version: '1.0.0'
      },
      consumes: ['application/json'],
      produces: ['application/json']
    },
    exposeRoute: true
  };
};

const init = async ({ config }) => {
  const { logger, uuidV4 } = lib;
  const app = fastify({
    logger,
    genReqId: req => req.headers['x-request-id'] || uuidV4(),
    disableRequestLogging: true
  });
  app.decorate('config', config);
  app.register(cors);
  app.register(helmet, {
    noCache: true,
    policy: 'same-origin',
    contentSecurityPolicy: {
      useDefaults: true,
      directives: {
        imgSrc: ["'self'", 'data:'],
        scriptSrc: ["'self' 'unsafe-inline'"]
      }
    }
  });
  app.register(underPressure, underPressureConfig());
  app.register(fastifyFormbody);
  app.register(swagger, swaggerConfig());
  app.register(autoload, {
    dir: path.join(__dirname, 'plugins'),
    ignorePattern: /^(__tests__)/
  });
  app.register(routes);
  app.addHook('preValidation', requestContext);
  app.addHook('preSerialization', appendPayloadToResponse);
  app.addHook('onResponse', onResponse);
  await app.ready();
  logger.info('Everything is Loaded..!');
  setupGracefulShutdown({ fastify: app });
  return app;
};

const run = app => app.listen({ port: app.config.PORT, host: app.config.HOST });

export { run, init };
