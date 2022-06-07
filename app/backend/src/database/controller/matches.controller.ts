import { Request, Response, NextFunction } from 'express';
import MatchesService from '../service/matches.service';
import LoginController from './login.controller';

class MatchesController {
  service: MatchesService;
  loginController: LoginController;

  constructor() {
    this.service = new MatchesService();
    this.loginController = new LoginController();
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

  public addMatche = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const dataMatche = req.body;
      const token = req.headers.authorization;

      const checkToken = await this.service.tokenValidate(token as string);
      if (!checkToken) {
        return res.status(404).json({ message: 'Token is invalid!' });
      }

      const newMatche = await this.service.addMatche(dataMatche);
      if (newMatche === null) {
        return res.status(401)
          .json({ message: 'It is not possible to create a match with two equal teams' });
      }

      const checkTeams = await this.service.checkTeams(dataMatche);
      if (!checkTeams) return res.status(404).json({ message: 'There is no team with such id!' });

      return res.status(201).json(newMatche);
    } catch (e) {
      next(e);
    }
  };
}

export default MatchesController;
