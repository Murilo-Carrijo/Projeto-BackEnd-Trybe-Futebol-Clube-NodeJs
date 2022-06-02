import * as jwt from 'jsonwebtoken';
import * as Bcrypt from 'bcryptjs';
import UserModel from '../models/user';
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
}

export default UserServer;
