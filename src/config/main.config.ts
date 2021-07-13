import dotenv from 'dotenv';

dotenv.config();
export default {
  APP: {
    URL: process.env.APP_URL,
    PORT: process.env.APP_PORT,
    KEY: process.env.APP_KEY,
  },
  SMTP: {
    SERVICE: process.env.SMTP_SERVICE,
    USER: process.env.SMTP_USER,
    PASS: process.env.SMPT_PASS,
    PROVIDER: process.env.PROVIDER_MAIL,
  },
  PASSPORT: {
    SECRET: process.env.JWT_KEY,
    EXPIRES_IN: '24h',
  },
};
