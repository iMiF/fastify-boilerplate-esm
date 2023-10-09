import fp from 'fastify-plugin';
import Ajv from 'ajv';
import AjvErrors from 'ajv-errors';
import addFormats from 'ajv-formats';

async function ajvCompiler(fastify, options) {
  const ajv = new Ajv({
    removeAdditional: true,
    useDefaults: true,
    coerceTypes: true,
    allErrors: true,
    allowUnionTypes: true
  });
  AjvErrors(ajv);
  addFormats(ajv);
  fastify.setValidatorCompiler(({ schema }) => {
    return ajv.compile(schema);
  });
}

export default fp(ajvCompiler, {
  fastify: '>=4.0.0',
  name: 'ajv-compiler'
});
