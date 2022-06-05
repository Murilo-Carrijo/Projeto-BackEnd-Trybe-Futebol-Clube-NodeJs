import * as Bcrypt from 'bcryptjs';
import UserModel from '../models/user.model';
import IUser from '../interface';
import Token from '../utils/Token';

class UserServer {
  public login = async (user: IUser) => {
    const { email, password } = user;
    const result = await UserModel.findOne({ where: { email } });
    if (!result) return false;
    if (!Bcrypt.compareSync(password, result.password)) {
      return false;
    }

    const token = await Token.create(result);
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

  public tokenValidate = async (token: string) => {
    const user = await Token.decode(token) as IUser;
    const result = await UserModel.findOne({ where: { email: user.email } });

    if (result) return result.role;
    return null;
  };
}

export default UserServer;
