import jwt from 'jsonwebtoken';
import cfg from '../config/main.config';
import { IUserInfo } from '../helpers/interfaces/User.interface';

export function signToken(user: IUserInfo): string {
  return jwt.sign({ ...user }, cfg.PASSPORT.SECRET, {
    expiresIn: cfg.PASSPORT.EXPIRES_IN,
  });
}
