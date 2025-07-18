import pino from 'pino';
import pinoPretty from 'pino-pretty';
import { context } from './asyncContext.js';
import {
  errorSerializer,
  httpRequestSerializer,
  httpResponseSerializer,
  requestSerializer,
  responseSerializer
} from './serializers.js';

// const fs = require('fs');
// const path = require('path');
// const multistream = require('pino-multi-stream').multistream;
// const streams = [
//   { stream: process.stdout },
//   { level: 'debug', stream: fs.createWriteStream(path.join(path.resolve(), '/logs/debug.log')) },
//   { level: 'fatal', stream: fs.createWriteStream(path.join(path.resolve(), '/logs/fatal.log')) }
// ];
const stream = pinoPretty({
  colorize: true,
  translateTime: 'HH:MM:ss',
  ignore: 'pid,hostname,name',
  levelFirst: true
});

export const pinoLogger = pino(
  {
    name: 'fastify-boilerplate',
    level: 'info',
    messageKey: 'message',
    // formatters: {
    //   level(label) {
    //     return { severity: label.toUpperCase() };
    //   },
    //   log(params) {
    //     return params;
    //   }
    // },
    serializers: {
      req: requestSerializer(pino.stdSerializers.req),
      res: responseSerializer(pino.stdSerializers.res),
      err: errorSerializer,
      request: httpRequestSerializer,
      response: httpResponseSerializer
    }
  },
  stream
  // multistream(streams)
);

export const logger = new Proxy(pinoLogger, {
  get(target, property) {
    const log = context.getStore()?.get('logger') || target;
    return log[property];
  }
});
