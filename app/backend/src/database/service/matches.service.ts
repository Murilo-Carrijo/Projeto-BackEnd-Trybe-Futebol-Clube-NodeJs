import IMatches from '../interface/IMatches';
import MatchesModel from '../models/matches.model';
import Teams from '../models/temas.model';

class MatchesService {
  public getAll = async () => {
    const matches = await MatchesModel.findAll(
      { include: [
        { model: Teams, as: 'teamAway', attributes: { exclude: ['id'] } },
        { model: Teams, as: 'teamHome', attributes: { exclude: ['id'] } },
      ] },
    );
    if (matches.length <= 0) return false;
    return matches;
  };

  public addMatche = async (matche: IMatches) => {
    const newMatche = await MatchesModel.create(matche);
    return newMatche;
  };
}

export default MatchesService;
