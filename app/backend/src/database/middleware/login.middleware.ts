import { Request, Response, NextFunction } from 'express';
import IUser from '../interface';

function validateEmail(user: IUser) {
  const { email } = user;
  const re = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
  if (!re.test(email)) {
    const message = 'All fields must be filled';
    return ({ status: 400, message });
  }
}

function validatePassword(user: IUser) {
  const { password } = user;

  if (password.length < 6) {
    const message = 'All fields must be filled';
    return ({ status: 400, message });
  }
}

export default function validateLogin(req: Request, res: Response, next: NextFunction) {
  const user = req.body as IUser;

  const errorEmail = validateEmail(user);
  if (errorEmail) return res.status(errorEmail.status).json({ message: errorEmail.message });

  const errorPassword = validatePassword(user);
  if (errorPassword) {
    return res.status(errorPassword.status).json({ message: errorPassword.message });
  }

  next();
}
