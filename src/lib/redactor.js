import stringify from 'json-stringify-safe';
import isEmpty from 'lodash/isEmpty.js';

const REDACT = '****REDACTED****';

const redactableKeys = [
  'password',
  'accessToken',
  'authorization',
  'newPassword',
  'confirmNewPassword',
  'confirmPassword',
  'currentPassword',
  'otp'
];

const maskableKeys = ['accessToken'];

const shouldRedact = key => redactableKeys.includes(key);

const checkAndMaskValues = (key, value) => {
  if (maskableKeys.includes(key)) {
    const len = value.length;
    return `${value.substring(0, 4)}${REDACT}${value.substring(len - 4, len)}`;
  }
  return REDACT;
};

const circularReplacer = () => {
  return (key, value) => {
    if (shouldRedact(key)) return checkAndMaskValues(key, value);
    return value;
  };
};

const parser = replacer => o => (!isEmpty(o) ? JSON.parse(stringify(o, replacer)) : o);

export const redactor = parser(circularReplacer());
