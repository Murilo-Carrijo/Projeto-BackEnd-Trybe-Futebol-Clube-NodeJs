import * as express from 'express';
import MatchesController from '../controller/matches.controller';

const router = express.Router();

const matchesController = new MatchesController();

router.get('/', matchesController.getAll);

export default router;
