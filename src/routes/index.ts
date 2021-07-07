import { Router, Request, Response } from 'express';
import auth from '@routes/auth.routes';

const routes = Router();
routes.get('', async (request: Request, response: Response) => {
  response.send({ info: 'NODE TEMPLATE API v1' });
});

routes.use('/auth', auth);

export default routes;
