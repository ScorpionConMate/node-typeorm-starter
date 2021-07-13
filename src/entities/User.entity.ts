import { compareSync, genSaltSync, hashSync } from 'bcryptjs';
import {
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Roles } from '../helpers/enums/Roles.enum';
import { IUserInfo } from '../helpers/interfaces/User.interface';

@Entity('user')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', unique: true })
  email: string;

  @Column({ type: 'varchar' })
  nombre: string;

  @Column({ type: 'varchar' })
  apellido: string;

  @Column({ type: 'enum', enum: Roles, default: Roles.USER })
  role: Roles;

  @Column({ type: 'varchar', length: 255 })
  password: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
  createdAt: Date;

  @DeleteDateColumn({ select: false })
  deletedAt?: Date;

  validatePassword(password: string): boolean {
    return compareSync(password, this.password);
  }

  get fullName(): string {
    return `${this.apellido}, ${this.nombre}`;
  }

  get userInfo(): IUserInfo {
    return {
      id: this.id,
      email: this.email,
      nombre: this.nombre,
      apellido: this.apellido,
      role: this.role,
    };
  }

  get isAdmin(): boolean {
    return this.role === Roles.ADMIN;
  }

  @BeforeInsert()
  hashPassword(): void {
    const salt = genSaltSync(10);
    this.password = hashSync(this.password, salt);
  }
}
