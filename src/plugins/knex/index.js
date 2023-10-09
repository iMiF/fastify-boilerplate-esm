import fp from 'fastify-plugin';
import { getKnexClient } from './setup.js';
import dbConfig from '../../../config/knexConfig.js';

const knexPlugin = async (fastify, options) => {
  try {
    const db = await getKnexClient({ options: dbConfig });
    fastify.decorate('knex', db);
  } catch (e) {
    fastify.log.error(`DB connection failed`);
    // throw Error(`Connection Failed ${e}`);
  }
};

export default fp(knexPlugin);
