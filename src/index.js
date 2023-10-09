import envSchema from 'env-schema';

import { init, run } from './server.js';
import { config as envConfig } from '../config/environmentVariables.js';
import * as lib from './lib/index.js';

(async () => {
  const config = envSchema(envConfig);
  const { logger } = lib;
  try {
    const server = await init({ config });
    await run(server);
  } catch (error) {
    logger.error(error, 'Error While Starting the Server');
  }
})();
