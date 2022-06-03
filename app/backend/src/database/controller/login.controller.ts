import { Request, Response, NextFunction } from 'express';
import UserServer from '../service/user.server';

class LoginController {
  service: UserServer;

  constructor() {
    this.service = new UserServer();
  }

  public userLogin = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = req.body;
      const login = await this.service.login(user);

      if (!login) return res.status(401).json({ message: 'Incorrect email or password' });

      return res.status(200).json(login);
    } catch (e) {
      next(e);
    }
  };

  public tokenValidate = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization;
      if (!token || token === '') {
        return res.status(401).json({ message: 'Token not found' });
      }
      const role = await this.service.tokenValidate(token);
      if (!role) {
        return res.status(404).json({ message: 'Token is invalid!' });
      }

      return res.status(200).json(role);
    } catch (e) {
      next(e);
    }
  };
}

export default LoginController;
