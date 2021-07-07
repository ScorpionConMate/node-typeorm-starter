import 'reflect-metadata';
import 'module-alias/register';
import { createConnection } from 'typeorm';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import routes from '@routes/index';
import { ScheduleService } from './services/Schedule.service';

createConnection()
  .then(async () => {
    // Increase max listener to prevent memory limit.
    process.setMaxListeners(50);

    // Try establish database connection

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
    app.use('/api/', routes);

    // Run Schedule
    ScheduleService();

    app.listen(process.env.APP_PORT, () => {
      console.log(`⚡️[server]: Server is running at ${process.env.APP_URL}`);
    });
  })
  .catch((err) => console.log(err));
