import { Application } from 'express';
import databaseLoader from './database.loader';
import serverLoader from './server.loader';
import routesLoader from './controllers.loader';

export default async (app: Application): Promise<void> => {
  await databaseLoader();
  console.log('Connected to DB');

  await serverLoader(app);
  await routesLoader(app);
  console.log('Server configs loaded');
};
