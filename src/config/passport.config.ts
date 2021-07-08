// eslint-disable-next-line import/extensions
import cfg from './main';

export const config = {
  passport: {
    secret: cfg.SECRETS.JWT,
    expiresIn: 10000,
  },
  env: {
    port: 8080,
    mongoDBUri: 'mongodb://localhost/test',
    mongoHostName: process.env.ENV === 'prod' ? 'mongodbAtlas' : 'localhost',
  },
};
export const underscoreId = '_id';
