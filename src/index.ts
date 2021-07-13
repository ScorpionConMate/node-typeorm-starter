import 'reflect-metadata';

import * as express from 'express';
import loader from './helpers/loaders/index';

async function main() {
  const app = express.default();
  loader(app);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  app.listen(process.env.APP_PORT, () => {
    console.log(`⚡️[server]: Server is running at ${process.env.APP_URL}`);
  });
}

main();
