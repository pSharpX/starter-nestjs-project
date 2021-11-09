import * as dotenv from 'dotenv';
import { readFileSync } from 'fs';
import { join } from 'path';

function getConfigFileName(param?: string) {
  if (param) {
    return `.env.${param}`;
  }
  return '.env';
}

function getProps(param?: string) {
  if (param) {
    return dotenv.parse(readFileSync(join(getConfigFileName(param)), 'utf8'));
  }
  return dotenv.parse(readFileSync(join(getConfigFileName()), 'utf8'));
}

const env = process.env.NODE_ENV || 'development';

const defaultProps = getProps();

const configurations = {
  local: {
    ...defaultProps,
    ...getProps('local'),
  },
  development: {
    ...defaultProps,
    ...getProps('development'),
  },
  test: {
    ...defaultProps,
    ...getProps('test'),
  },
  production: {
    ...defaultProps,
    cloudName: process.env.CD_CLOUD_NAME,
    uploadPreset: process.env.CD_UPLOAD_PRESET,
    apiKey: process.env.CD_API_KEY,
    apiSecret: process.env.CD_API_SECRET,
  },
};

export default () => ({
  cloudinary: configurations[env],
});
