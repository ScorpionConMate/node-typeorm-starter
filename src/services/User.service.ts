import { Response } from 'express';

import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';
import Problem from 'api-problem';
import { IAuthLoginSuccess } from '../helpers/interfaces/ReponsesExamples.interface';
import { UserRepository } from '../repositories/User.repository';
import { UserCreate } from '../helpers/types/User.type';
import { generateServerErrorCode } from '../utils/auth.utils';
import { errors } from '../utils/error.utils';
import { signToken } from '../utils/jwt.utils';
import { User } from '../entities/User.entity';

@Service()
export class UserService {
  @InjectRepository()
  private readonly repository: UserRepository;

  async create(user: UserCreate): Promise<void | IAuthLoginSuccess> {
    const exist = await this.repository.exist(user.email);

    if (!exist) {
      const userRepository = await this.repository.createUser(user);
      // Sign token
      const token = signToken(userRepository);
      return { success: true, user: userRepository, token } as IAuthLoginSuccess;
    }
    return new Problem(403, errors.USER.USER_EXISTS_ALREADY, {
      detail: errors.USER.REGISTER_USER_ERROR,
    });
  }

  async find(): Promise<User[]> {
    return this.repository.find();
  }
}
