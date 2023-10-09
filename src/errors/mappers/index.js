import basic from './basic.js';
import paramsValidation from './paramsValidation.js';
import unstructuredError from './unstructuredError.js';
import postgressError from './postgressError.js';

export const DEFAULT_MAPPERS = [basic, paramsValidation, postgressError, unstructuredError];
export const mappers = { paramsValidation, unstructuredError, postgressError };
