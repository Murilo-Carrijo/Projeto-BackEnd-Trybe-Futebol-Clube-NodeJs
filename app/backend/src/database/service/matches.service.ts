import IMatches from '../interface/IMatches';
import MatchesModel from '../models/matches.model';
import Teams from '../models/temas.model';
import TeamsService from './teams.service';
import Token from '../utils/Token';

class MatchesService {
  teamsService: TeamsService;

  constructor() {
    this.teamsService = new TeamsService();
  }

  public getAll = async (): Promise<IMatches[] | boolean> => {
    const matches = await MatchesModel.findAll(
      { include: [
        { model: Teams, as: 'teamAway', attributes: { exclude: ['id'] } },
        { model: Teams, as: 'teamHome', attributes: { exclude: ['id'] } },
      ] },
    );
    if (matches.length <= 0) return false;
    return matches;
  };

  public getByTeams = async (matche: IMatches): Promise<IMatches | boolean> => {
    const { homeTeam, awayTeam } = matche;
    const findMatche = await MatchesModel.findOne({ where: { homeTeam, awayTeam } });
    if (!findMatche) return false;
    return findMatche;
  };

  public checkTeams = async (matche: IMatches) => {
    const { homeTeam, awayTeam } = matche;
    const checkHomeTeam = await this.teamsService.getById(homeTeam);
    const checkAwayTeam = await this.teamsService.getById(awayTeam);
    if (!checkHomeTeam || !checkAwayTeam) {
      return false;
    }
    return true;
  };

  public tokenValidate = async (token: string) => {
    const checkToken = await Token.decode(token);
    return checkToken;
  };

  public addMatche = async (matche: IMatches): Promise<IMatches | null | boolean> => {
    const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals } = matche;
    if (homeTeam === awayTeam) return null;
    await MatchesModel.create({ homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress: 1 });
    const newMatche = await this.getByTeams(matche);
    return newMatche;
  };

  public updateStatus = async (id: number) => {
    const getById = await MatchesModel.findByPk(id);
    if (!getById) return null;

    if (getById) {
      await MatchesModel.upsert({
        id,
        inProgress: 0,
      });
      return true;
    }
    return false;
  };

  public updateScoreboard = async (id: number, homeTeamGoals: number, awayTeamGoals: number) => {
    const getById = await MatchesModel.findByPk(id);
    if (!getById) return null;

    if (getById) {
      await MatchesModel.upsert({
        id,
        homeTeamGoals,
        awayTeamGoals,
      });
      return getById;
    }
    return false;
  };
}

export default MatchesService;
