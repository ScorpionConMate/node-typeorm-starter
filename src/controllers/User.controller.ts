import { Body, Get, JsonController, Post } from 'routing-controllers';
import { Inject } from 'typedi';
import Problem from 'api-problem';
import { User } from '../entities/User.entity';
import { CreateUserDto } from '../helpers/dto/User.dto';
import { UserService } from '../services/User.service';
import { errors } from '../utils/error.utils';
import { IAuthLoginSuccess } from '../helpers/interfaces/ReponsesExamples.interface';

@JsonController('/users')
export class UserController {
  @Inject()
  private service: UserService;

  @Post('/register')
  async register(@Body() body: CreateUserDto): Promise<void | IAuthLoginSuccess> {
    console.log(body);
    try {
      const { email, nombre, apellido, password } = body;
      return await this.service.create({ email, nombre, apellido, password });
    } catch (e) {
      throw new Problem(403, errors.USER.USER_EXISTS_ALREADY, {
        detail: errors.USER.REGISTER_USER_ERROR,
      });
    }
  }

  @Get('')
  async get(): Promise<User[]> {
    const users = this.service.find();
    return users;
  }
}
