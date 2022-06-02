import * as express from 'express';
import LoginController from '../controller/login.controller';
import validateLogin from '../middleware/login.middleware';

const router = express.Router();

const loginController = new LoginController();

router.post(
  '/',
  validateLogin,
  loginController.userLogin,
);

export default router;
