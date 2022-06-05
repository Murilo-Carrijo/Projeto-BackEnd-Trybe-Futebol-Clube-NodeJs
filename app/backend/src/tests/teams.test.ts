import 'mocha';
import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
// import UserModel from '../database/models/user.model';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

const teams = [
  {
    id: 1,
	teamName: "Avaí/Kindermann"
  },
  {
	id: 2,
	teamName: "Bahia"
  },
  {
	id: 3,
	teamName: "Botafogo"
  },
];

describe('Verificando a rota Teams', () => {
  let chaiHttpResponse: Response;

  before(async () => {
    sinon.stub(TeamsModel, "findOne").resolves({ ...teams } as TeamsModel);
  });

  after(() => {
    (TeamsModel.findOne as sinon.SinonStub).restore();
  })

  it('Retorno de todos os times cadastrados', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .post('/teams');

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.have.property('id');
    expect(chaiHttpResponse.body).to.have.property('teamName');
  });

  it('Retorno do time selecionado pelo id', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/teams/:id')
      .set({ id: 1 });

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.have.property('id');
    expect(chaiHttpResponse.body).to.have.property('teamName');
  });
});
