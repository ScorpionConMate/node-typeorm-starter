import { Application } from 'express';
import { useExpressServer } from 'routing-controllers';
import { AuthController } from '../../controllers/Auth.controller';
import { UserController } from '../../controllers/User.controller';

export default (app: Application): void => {
  useExpressServer(app, {
    routePrefix: '/api',
    controllers: [UserController, AuthController],
  });
};
