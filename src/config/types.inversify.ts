import { UserRepository } from '../respositories/User.repository';
import { UserService } from '../services/User.service';

export const TYPES = {
  UserRepository: Symbol('UserRepository'),
  UserService: Symbol('UserService'),
};

export default TYPES;
