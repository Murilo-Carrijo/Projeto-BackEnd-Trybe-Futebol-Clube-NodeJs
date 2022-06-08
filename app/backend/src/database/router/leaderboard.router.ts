import * as express from 'express';
import LeaderboardController from '../controller/leaderboard.controller';

const router = express.Router();

const leaderboardController = new LeaderboardController();

router
  .get('/home', (req, res, next) => leaderboardController.homeTeamsInfo(req, res, next));

export default router;
