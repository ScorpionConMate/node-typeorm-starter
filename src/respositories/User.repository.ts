import { User } from '@entities/User.entity';

export class UserRepository {
  // TODO: Tipificar respuesta
  static async getPassword(email: string): Promise<unknown> {
    return User.createQueryBuilder()
      .select('user.password')
      .addSelect('password')
      .where('email = :email', { email })
      .getRawOne();
  }
}
