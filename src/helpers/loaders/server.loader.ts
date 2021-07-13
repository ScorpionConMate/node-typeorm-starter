import cors from 'cors';
import express, { Application } from 'express';
import passport from 'passport';
import morganMiddleware from '../../middlewares/morgan.middleware';
import { ScheduleService } from '../../services/Schedule.service';
import { applyPassportStrategy } from '../../utils/passport.util';

export default (app: Application): void => {
  // Increase max listener to prevent memory limit.
  process.setMaxListeners(50);

  applyPassportStrategy(passport);
  // Init express app
  app.use(express.json());
  app.use(
    express.urlencoded({
      extended: true,
    }),
  );
  app.use(express.json());
  app.use(cors());
  app.use(morganMiddleware);

  // Run Schedule
  ScheduleService();
};
