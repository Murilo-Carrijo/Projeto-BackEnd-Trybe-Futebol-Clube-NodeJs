import { Request, Response, NextFunction } from 'express';
import LeaderboardService from '../service/leaderboard.service';

class LeaderboardController {
  service: LeaderboardService;

  constructor() {
    this.service = new LeaderboardService();
  }

  public homeTeamsInfo = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const leaderboard = await this.service.homeTeamsInfo();
      return res.status(200).json(leaderboard);
    } catch (e) {
      next(e);
    }
  };
}

export default LeaderboardController;
