import * as fs from 'fs/promises';
import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import IUser from '../interface';

dotenv.config();

class Token {
  private static secret: string;

  private static token: string;

  static async create(user: IUser) {
    this.secret = await fs.readFile('jwt.evaluation.key', 'utf-8');
    this.token = jwt.sign({
      id: user.id, username: user.username, role: user.role, email: user.email,
    }, this.secret, {
      expiresIn: '7d',
    });
    return this.token;
  }

  static async decode(token: string) {
    try {
      this.secret = await fs.readFile('jwt.evaluation.key', 'utf-8');
      const data = jwt.verify(token, this.secret);
      return data;
    } catch (e) {
      return null;
    }
  }
}

export default Token;
