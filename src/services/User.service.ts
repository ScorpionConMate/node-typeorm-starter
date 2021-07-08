import { Response } from 'express';
import { inject, injectable } from 'inversify';
import jwt from 'jsonwebtoken';
import { config } from '../config/passport.config';
import TYPES from '../config/types.inversify';
import { IAuthLoginSuccess } from '../interfaces/ReponsesExamples.interface';
import { UserRepository } from '../respositories/User.repository';
import { UserCreate } from '../types/User.type';
import { generateServerErrorCode } from '../utils/auth.utils';
import { errors } from '../utils/error.utils';

@injectable()
export class UserService {
  private repository: UserRepository;

  constructor(@inject(TYPES.UserRepository) repository: UserRepository) {
    this.repository = repository;
  }

  async create(user: UserCreate, res: Response): Promise<void | IAuthLoginSuccess> {
    const exist = await this.repository.exist(user.email);

    if (!exist) {
      const userRepository = await this.repository.createUser(user);
      // Sign token
      const token = jwt.sign({ ...userRepository }, config.passport.secret, {
        expiresIn: '24h',
      });
      return { success: true, user: userRepository, token } as IAuthLoginSuccess;
    }
    return generateServerErrorCode(res, 403, errors.USER.REGISTER_USER_ERROR, errors.USER.USER_EXISTS_ALREADY, 'email');
  }
}
