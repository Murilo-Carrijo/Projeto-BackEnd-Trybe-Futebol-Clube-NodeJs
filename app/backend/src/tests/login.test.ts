import 'mocha';
import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import UserModel from '../database/models/user.model';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

const user = {
  id: 1,
  username: 'Admin',
  role: 'admin',
  email: 'admin@admin.com',
  password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW', // secret_admin
}

describe('Verificando a rota Login', () => {
  let chaiHttpResponse: Response;

  before(async () => {
    sinon.stub(UserModel, "findOne").resolves({ ...user } as UserModel);
  });

  after(() => {
    (UserModel.findOne as sinon.SinonStub).restore();
  })

  it('Email e senha presente no banco de dados', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .post('/login')
       .send({
         email: 'admin@admin.com',
         password: 'secret_admin'
       });

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.have.property('user');
    expect(chaiHttpResponse.body.user).to.have.property('id');
    expect(chaiHttpResponse.body.user).to.have.property('username');
    expect(chaiHttpResponse.body.user).to.have.property('role');
    expect(chaiHttpResponse.body.user).to.have.property('email');
    expect(chaiHttpResponse.body.user).to.not.have.property('password');
    expect(chaiHttpResponse.body).to.have.property('token');
  });

  it('Caso em que o password está incorreto', async () => {
     chaiHttpResponse = await chai
       .request(app)
       .post('/login')
       .send({
         email: 'admin@admin.com',
         password: '1234567'
       });

    expect(chaiHttpResponse.status).to.be.equal(401);
    expect(chaiHttpResponse.body).to.have.property('message');
    expect(chaiHttpResponse.body.message).to.be.equal('Incorrect email or password');
  });

  it('Caso em que o password não tenha a quantidade minima de caracteres', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({
        email: 'admin@admin.com',
        password: '1234'
      });

   expect(chaiHttpResponse.status).to.be.equal(400);
   expect(chaiHttpResponse.body).to.have.property('message');
   expect(chaiHttpResponse.body.message).to.be.equal('All fields must be filled');
 });

 it('Caso em que o email não esteja com o formato padrão', async () => {
  chaiHttpResponse = await chai
    .request(app)
    .post('/login')
    .send({
      email: 'admin',
      password: 'secret_admin'
    });

   expect(chaiHttpResponse.status).to.be.equal(400);
   expect(chaiHttpResponse.body).to.have.property('message');
   expect(chaiHttpResponse.body.message).to.be.equal('All fields must be filled');
  });

  it('Caso o login já tenha sido feito e o token esteja correto', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .get('/login/validate')
      .send({
        email: 'admin@admin.com',
        password: 'secret_admin'
      });
  
     expect(chaiHttpResponse.status).to.be.equal(200);
     expect(chaiHttpResponse.body).to.have.property('role');
     expect(chaiHttpResponse.body.role).to.be.equal('admin');
    });
});
