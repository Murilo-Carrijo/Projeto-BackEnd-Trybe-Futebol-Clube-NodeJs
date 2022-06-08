import IMatches from '../interface/IMatches';

class LeaderboardUtils {
  victories: number;
  lose: number;
  tie: number;
  games: number;
  score: number;
  totalGoalsFavor: number;
  totalGoalsOwn: number;
  totalGoalsBalance: number;
  efficiency: number;

  constructor() {
    this.victories = 0;
    this.lose = 0;
    this.tie = 0;
    this.score = 0;
    this.games = 0;
    this.totalGoalsFavor = 0;
    this.totalGoalsOwn = 0;
    this.totalGoalsBalance = 0;
    this.efficiency = 0;
  }

  public filterHomeTeam = (matches: IMatches[], id: number) => {
    return matches.filter((matche: IMatches) => matche.homeTeam === id);
  };

  public sumVictories = (matches: IMatches[]) => {
    this.victories = (matches.filter((matche) => matche.homeTeamGoals > matche.awayTeamGoals))
      .length;
    return this.victories;
  };

  public sumLosses = (matches: IMatches[]) => {
    this.lose = (matches.filter((matche) => matche.homeTeamGoals < matche.awayTeamGoals))
      .length;
    return this.lose;
  };

  public sumDraws = (matches: IMatches[]) => {
    this.tie = (matches.filter((matche) => matche.homeTeamGoals === matche.awayTeamGoals))
      .length;
    return this.tie;
  };

  public totalGames = (matches: IMatches[]) => {
    this.games = matches.length;
    return this.games;
  };

  public sumScore = (matches: IMatches[]) => {
    const wins = this.sumVictories(matches) * 3;
    const draw = this.sumDraws(matches);
    this.score = wins + draw;
    return this.score;
  };

  public sumGoalsFavor = (matches: IMatches[]) => matches.reduce((total, matche) => {
    this.totalGoalsFavor = total + matche.homeTeamGoals;
    return this.totalGoalsFavor;
  }, 0);

  public sumGoalsOwn = (matches: IMatches[]) => matches.reduce((total, matche) => {
    this.totalGoalsOwn = total + matche.awayTeamGoals;
    return this.totalGoalsOwn;
  }, 0);

  public calcGoalsBalance = () => {
    this.totalGoalsBalance = this.totalGoalsFavor - this.totalGoalsOwn;
    return this.totalGoalsBalance;
  };

  public calcAfficiency = (matches: IMatches[]) => {
    const maxEfficiency = this.totalGames(matches) * 3;
    console.log(maxEfficiency);
    const calc = (this.score / maxEfficiency) * 100;
    this.efficiency = Number(calc.toFixed(2));
    return this.efficiency;
  };

  public execteCalcs = (matches: IMatches[]) => {
    this.sumLosses(matches);
    this.totalGames(matches);
    this.sumScore(matches);
    this.sumGoalsFavor(matches);
    this.sumGoalsOwn(matches);
    this.calcGoalsBalance();
    this.calcAfficiency(matches);
  };

  public homeTeamsInfo = (matches: IMatches[]) => {
    this.execteCalcs(matches);
    return {
      totalPoints: this.score,
      totalGames: this.games,
      totalVictories: this.victories,
      totalDraws: this.tie,
      totalLosses: this.lose,
      goalsFavor: this.totalGoalsFavor,
      goalsOwn: this.totalGoalsOwn,
      goalsBalance: this.totalGoalsBalance,
      efficiency: this.efficiency,
    };
  };
}

export default LeaderboardUtils;
