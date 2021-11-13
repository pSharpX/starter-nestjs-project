import { readFileSync } from 'fs';
import { join } from 'path';

function getConfigFileName(param?: string) {
  if (param) {
    return `ormconfig.${param}.json`;
  }
  return 'ormconfig.json';
}

function getProps(param?: string) {
  try{
    if (param) {
      return JSON.parse(readFileSync(join(getConfigFileName(param)), 'utf8'));
    }
    return JSON.parse(readFileSync(join(getConfigFileName()), 'utf8'));
  } catch (err) {
    return {};
  }
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
    type: process.env.DB_TYPE,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: ['dist/models/**{.ts,.js}'],
    synchronize: false,
  },
};

export default () => ({
  database: configurations[env],
});
