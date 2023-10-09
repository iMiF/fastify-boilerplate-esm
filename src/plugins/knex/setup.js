import knex from 'knex';
import setupPaginator from './paginator.js';
import { logger } from '../../lib/logger.js';

const connectionCheck = db => db.raw('select 1+1 as result');

export const getKnexClient = async ({ options }) => {
  try {
    const db = knex({ ...options });
    await connectionCheck(db);
    setupPaginator(db);
    return db;
  } catch (e) {
    logger.error({ message: `DB connection failed`, err: e });
    throw Error(`Connection Failed ${e}`);
  }
};
