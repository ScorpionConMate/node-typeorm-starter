import { Response } from 'express';
import { Service } from 'typedi';
import { IAuthLoginSuccess } from '../helpers/interfaces/ReponsesExamples.interface';
import { UserRepository } from '../repositories/User.repository';
import { generateServerErrorCode } from '../utils/auth.utils';
import { errors } from '../utils/error.utils';
import { signToken } from '../utils/jwt.utils';

@Service()
export class AuthService {
  private repository: UserRepository;

  constructor() {
    this.repository = new UserRepository();
  }

  async login(res: Response, email: string, password: string): Promise<void> {
    const user = await this.repository.findOne({ email });
    if (user && user.email) {
      const isPasswordMatched = user.validatePassword(password);
      if (isPasswordMatched) {
        // Sign token
        const token = signToken(user.userInfo);
        const userToReturn: IAuthLoginSuccess = { success: true, user: user.userInfo, token };
        res.status(200).json(userToReturn);
      } else {
        generateServerErrorCode(res, 403, errors.VALIDATION.WRONG_PASSWORD, errors.VALIDATION.WRONG_PASSWORD, 'LOGIN');
      }
    } else {
      generateServerErrorCode(res, 404, 'login email error', errors.USER.USER_DOES_NOT_EXIST, 'email');
    }
  }
}
