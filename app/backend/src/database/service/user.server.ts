import * as jwt from 'jsonwebtoken';
import * as Bcrypt from 'bcryptjs';
import UserModel from '../models/user.model';
import auth from '../config/jwtConfig';
import IUser from '../interface';

class UserServer {
  public login = async (user: IUser) => {
    const { email, password } = user;
    const result = await UserModel.findOne({ where: { email } });
    if (!result) return false;
    if (!Bcrypt.compareSync(password, result.password)) {
      return false;
    }
    const token = jwt.sign({ data: user }, auth.secret, auth.configs);
    return {
      user: {
        id: result.id,
        username: result.username,
        role: result.role,
        email: result.email,
      },
      token,
    };
  };

  // public loginValidadte = async (token: string): Promise<string | null> => {
  //   const { email } = jwt.verify(token, auth.secret) as jwt.JwtPayload;
  //   const user = await UserModel.findOne({ where: { email } });

  //   if (user) return user.role;
  //   return null;
  // };
}

export default UserServer;
