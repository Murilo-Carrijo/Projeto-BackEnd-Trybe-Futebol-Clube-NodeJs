import { Request, Response, NextFunction } from 'express';
import MatchesService from '../service/matches.service';

class MatchesController {
  service: MatchesService;

  constructor() {
    this.service = new MatchesService();
  }

  public getAll = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const matches = await this.service.getAll();
      if (!matches) return res.status(404).json({ message: '"Matches" not found!' });
      return res.status(200).json(matches);
    } catch (e) {
      next(e);
    }
  };
}

export default MatchesController;
