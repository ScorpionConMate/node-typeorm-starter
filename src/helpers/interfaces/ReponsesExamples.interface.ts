import { IUserInfo } from './User.interface';

export interface IAuthLoginSuccess {
  success: boolean;
  user: IUserInfo;
  token: string;
}

export interface IErrorGeneric {
  statusCode?: number;
  success: boolean;
  message: unknown[] | string;
}

export interface UserLoginParams {
  email: string;
  password: string;
}

export interface AuthRegisterParams {
  email: string;
  nombre: string;
  apellido: string;
  password: string;
}

export interface IRegisterSuccess {
  success: boolean;
  message: string;
  user: IUserInfo;
  token: string;
}

export interface ISuccessGeneric {
  statusCode: number;
  success: boolean;
  message: unknown;
}
