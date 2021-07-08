import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { User } from '../entities/User.entity';
import { UserRepository } from '../respositories/User.repository';

export class AuthController {
  static async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;

      try {
        const user = await User.findOne({ where: { email } });
        // const pass = await UserRepository.getPassword(email);
        const pass = { password: 'asd' };
        if (!user) {
          res.status(401).json({
            success: false,
            message: 'El usuario y/o contraseña no coinciden o no existe',
          });
          return;
        }
        user.password = pass.password;
        if (!user.validatePassword(password)) {
          res.status(401).json({
            success: false,
            message: 'El usuario y/o contraseña no coinciden o no existe',
          });
          return;
        }

        const token = 'await generateJwt(user)';

        res.status(200).json({ success: true, user: user.userInfo, token: `Bearer ${token}` });
      } catch (error) {
        res.status(401).json({ success: false, message: 'Inicio de sesion no autorizado' });
        return;
      }
    } catch (error) {
      res.status(400).json({
        success: false,
        message: 'Ocurrio un error, contacte con el Administrador del sistema',
      });
    }
  }

  static async register(req: Request, res: Response): Promise<void> {
    try {
      const { email, nombre, apellido, password } = req.body;

      const user = new User();
      user.email = email;
      user.nombre = nombre;
      user.apellido = apellido;
      user.password = password;

      const token = 'await generateJwt(user)';
      const userRepository = getRepository(User);
      userRepository.save(user);
      res.status(200).json({
        success: true,
        message: 'Usuario registrado',
        user: user.userInfo,
        token,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: 'Ocurrio un error, contacte con el Administrador del sistema',
      });
    }
  }

  static async revalidateToken(req: Request, res: Response): Promise<void> {
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
