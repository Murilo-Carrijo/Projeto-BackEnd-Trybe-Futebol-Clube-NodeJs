import ITeams from '../interface/ITeams';
import TeamsModel from '../models/temas.model';
// import ITeams from '../interface/ITeams';

class TeamsService {
  public getAll = async (): Promise<ITeams[] | boolean> => {
    const allTeams = await TeamsModel.findAll();
    if (allTeams.length <= 0) return false;
    return allTeams;
  };

  public getById = async (id: number): Promise<ITeams | boolean> => {
    const team = await TeamsModel.findOne({ where: { id } });
    if (!team) return false;
    return team;
  };
}

export default TeamsService;
