import * as dotenv from 'dotenv';
import { readFileSync } from 'fs';

dotenv.config();

const data = readFileSync('jwt.evaluation.key', 'utf-8');

const auth = {
  secret: String(data),
  configs: { expiresIn: '7d' },
};

export default auth;