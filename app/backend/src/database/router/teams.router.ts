import * as express from 'express';
import TeamsController from '../controller/teams.controller';

const router = express.Router();

const teamsController = new TeamsController();

router
  .get('/', (req, res, next) => teamsController.getAll(req, res, next))
  .get('/:id', (req, res, next) => teamsController.getById(req, res, next));

export default router;
