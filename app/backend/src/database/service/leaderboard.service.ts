import Teams from '../models/temas.model';
import Matches from '../models/matches.model';
import ITeams from '../interface/ITeams';
import LeaderboardUtils from '../utils/leaderboard.utils';

class LeaderboardService {
  utils: LeaderboardUtils;

  constructor() {
    this.utils = new LeaderboardUtils();
  }

  public homeTeamsInfo = async () => {
    const gamesFinished = await Matches.findAll({ where: { inProgress: 0 } });
    const teams = await Teams.findAll();
    const getTeamsInfo = teams.map((team: ITeams) => {
      const filterTeam = this.utils.filterHomeTeam(gamesFinished, Number(team.id));
      const infoTeams = this.utils.homeTeamsInfo(filterTeam);
      return { name: team.teamName, ...infoTeams };
    });
    getTeamsInfo.sort((a, b) => b.totalPoints - a.totalPoints
    || b.goalsBalance - a.goalsBalance
    || b.goalsFavor - a.goalsFavor
    || a.goalsOwn - b.goalsOwn);
    return getTeamsInfo;
  };
}

export default LeaderboardService;
