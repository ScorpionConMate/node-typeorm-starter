import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Body, JsonController, Post, Req } from 'routing-controllers';
import Problem from 'api-problem';
import { User } from '../entities/User.entity';
import { IAuthLoginSuccess } from '../helpers/interfaces/ReponsesExamples.interface';
import { errors } from '../utils/error.utils';
import { signToken } from '../utils/jwt.utils';

@JsonController('/auth')
export class AuthController {
  @Post('/login')
  async login(@Body() body): Promise<IAuthLoginSuccess> {
    const { email, password } = body;
    const user = await User.findOne({ email });
    if (user && user.email) {
      const isPasswordMatched = user.validatePassword(password);
      if (isPasswordMatched) {
        const token = signToken(user.userInfo);
        const userToReturn: IAuthLoginSuccess = { success: true, user: user.userInfo, token };
        return userToReturn;
      }
      throw new Problem(403, {
        message: errors.VALIDATION.WRONG_PASSWORD,
      });
    }
    throw new Problem(404);
  }

  @Post('/revalidate')
  async revalidateToken(@Req() req: Request, res: Response): Promise<void> {
    try {
      const { usuario } = req.body;
      const user = await getRepository(User).findOne({ where: { email: usuario.email } });

      const token = `${user}await generateJwt(user)`;
      res.json({ success: true, token, user: usuario });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: 'Ocurrio un error, contacte con el Administrador del sistema',
      });
    }
  }
}
