import 'reflect-metadata';
import { createConnection } from 'typeorm';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import passport from 'passport';
import { InversifyExpressServer } from 'inversify-express-utils';
import { applyPassportStrategy } from './utils/passport.util';
import { ScheduleService } from './services/Schedule.service';
import container from './config/inversify.config';

createConnection()
  .then(async () => {
    // Increase max listener to prevent memory limit.
    process.setMaxListeners(50);

    // Try establish database connection
    applyPassportStrategy(passport);
    // Init express app
    const app = express();
    app.use(express.json());
    app.use(morgan('dev'));

    app.use(
      express.urlencoded({
        extended: true,
      }),
    );
    app.use(express.json());
    app.use(cors());

    // Register all application routes
    const server = new InversifyExpressServer(container, null, { rootPath: '/api' }, app);

    // Run Schedule
    ScheduleService();
    const appConfigured = server.build();

    appConfigured.listen(process.env.APP_PORT, () => {
      console.log(`⚡️[server]: Server is running at ${process.env.APP_URL}`);
    });
  })
  .catch((err) => console.log(err));
