import 'mocha';
import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import MatchesModel from '../database/models/matches.model';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

const matches = [
    {
      "id": 1,
      "homeTeam": 16,
      "homeTeamGoals": 1,
      "awayTeam": 8,
      "awayTeamGoals": 1,
      "inProgress": false,
      "teamHome": {
        "teamName": "São Paulo"
      },
      "teamAway": {
        "teamName": "Grêmio"
      }
    },
    {
      "id": 41,
      "homeTeam": 16,
      "homeTeamGoals": 2,
      "awayTeam": 9,
      "awayTeamGoals": 0,
      "inProgress": true,
      "teamHome": {
        "teamName": "São Paulo"
      },
      "teamAway": {
        "teamName": "Internacional"
      }
    }
  ];

describe('Verificando a rota Matches', () => {
  let chaiHttpResponse: Response;

  before(async () => {
    sinon.stub(MatchesModel, "findAll").resolves({ ... matches } as unknown as MatchesModel[]);
  });

  after(() => {
    (MatchesModel.findAll as sinon.SinonStub).restore();
  })

  it('Retorno de todos os confrontos cadastrados', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .get('/matches');

    expect(chaiHttpResponse.status).to.be.equal(200);
  });
});
