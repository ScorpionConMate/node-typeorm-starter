import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { inject } from 'inversify';
import { interfaces, controller, httpPost, request, response } from 'inversify-express-utils';
import TYPES from '../config/types.inversify';
import { UserService } from '../services/User.service';
import { generateServerErrorCode, registerValidation } from '../utils/auth.utils';
import { errors } from '../utils/error.utils';

@controller('/user')
export class UserController implements interfaces.Controller {
  private service: UserService;

  constructor(@inject(TYPES.UserService) service: UserService) {
    this.service = service;
  }

  @httpPost('/register', ...registerValidation)
  async register(@request() req: Request, @response() res: Response): Promise<void> {
    const errorsAfterValidation = validationResult(req);
    if (!errorsAfterValidation.isEmpty()) {
      res.status(400).json({
        code: 400,
        errors: errorsAfterValidation.mapped(),
      });
    }
    try {
      const { email, nombre, apellido, password } = req.body;
      const userToReturn = await this.service.create({ email, nombre, apellido, password }, res);

      res.status(200).json(userToReturn);
    } catch (e) {
      console.log(e);
      generateServerErrorCode(res, 500, e, errors.GENERIC.SOME_THING_WENT_WRONG);
    }
  }
}
