import * as express from 'express';
import LoginController from '../controller/login.controller';
import validateLogin from '../middleware/login.middleware';

const router = express.Router();

const loginController = new LoginController();

router
  .post(
    '/',
    validateLogin,
    (req, res, next) => loginController.userLogin(req, res, next),
  )
  .get('/validate', (req, res, next) => loginController.tokenValidate(req, res, next));

export default router;
