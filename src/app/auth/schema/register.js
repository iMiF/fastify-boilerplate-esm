import { PASSWORD, PHONE_NUMBER } from '../../common/pattern.js';
import { errorSchemas } from '../../common/schema.js';

const request = {
  tags: ['Auth'],
  summary: 'Register a new  user',
  description: `<h3> This API let new users to register </h3>`,
  body: {
    title: 'Register New User',
    type: 'object',
    additionalProperties: false,
    required: ['firstName', 'lastName', 'email', 'password', 'phoneNumber'],
    properties: {
      firstName: { type: 'string', minLength: 1 },
      lastName: { type: 'string', minLength: 1 },
      email: {
        type: 'string',
        format: 'email',
        minLength: 6,
        maxLength: 100,
        errorMessage: { format: 'should be a valid email' }
      },
      password: {
        type: 'string',
        pattern: PASSWORD,
        errorMessage: { pattern: 'should be compliant with the password policy' }
      },
      phoneNumber: {
        type: 'string',
        pattern: PHONE_NUMBER,
        errorMessage: { pattern: 'should be a valid phoneNumber' }
      }
    }
  }
};

const response = {
  type: 'object',
  properties: {
    userId: {
      type: 'string',
      format: 'uuid'
    }
  }
};

const register = {
  ...request,
  response: {
    200: response,
    ...errorSchemas
  }
};

export { register };
