import { Request, Response, NextFunction } from 'express';
import TeamsService from '../service/teams.service';

class TeamsController {
  public service: TeamsService;

  constructor() {
    this.service = new TeamsService();
  }

  public getAll = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const allTeams = await this.service.getAll();
      if (!allTeams) return res.status(404).json({ message: 'Teams not found!' });
      return res.status(200).json(allTeams);
    } catch (e) {
      next(e);
    }
  };

  public getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const team = await this.service.getById(Number(id));
      if (!team) return res.status(404).json({ message: 'Team not found!' });
      return res.status(200).json(team);
    } catch (e) {
      next(e);
    }
  };
}

export default TeamsController;
