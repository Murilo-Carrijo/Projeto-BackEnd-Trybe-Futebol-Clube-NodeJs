import * as express from 'express';
import MatchesController from '../controller/matches.controller';

const router = express.Router();

const matchesController = new MatchesController();

router
  .get('/', (req, res, next) => matchesController.getAll(req, res, next))
  .post('/', (req, res, next) => matchesController.addMatche(req, res, next));

export default router;
