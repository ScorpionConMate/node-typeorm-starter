import { injectable } from 'inversify';
import { User } from '../entities/User.entity';
import { IUserInfo } from '../interfaces/User.interface';
import { UserCreate } from '../types/User.type';

@injectable()
export class UserRepository {
  async createUser({ email, nombre, apellido, password }: UserCreate): Promise<IUserInfo> {
    const user = new User();
    user.email = email;
    user.nombre = nombre;
    user.apellido = apellido;
    user.password = password;
    await user.save();
    return user.userInfo;
  }

  // TODO: Tipificar respuesta
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async getPassword(email: string): Promise<any> {
    return User.createQueryBuilder()
      .select('user.password')
      .addSelect('password')
      .where('email = :email', { email })
      .getRawOne();
  }

  async exist(email: string): Promise<boolean> {
    return !!(await User.findOne({ where: { email } }));
  }
}
