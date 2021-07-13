import { MigrationInterface } from 'typeorm';
import { User } from '../../entities/User.entity';
import { Roles } from '../../helpers/enums/Roles.enum';

export class addDefaultUser1625542463158 implements MigrationInterface {
  public async up(): Promise<void> {
    try {
      const user = new User();

      user.email = 'admin2@admin.com';
      user.nombre = 'Admin';
      user.apellido = 'Istrador';
      user.role = Roles.ADMIN;
      user.password = 'admin123';
      await user.save();
    } catch (error) {
      throw new Error('Error creating default user');
    }
  }

  public async down(): Promise<void> {}
}
