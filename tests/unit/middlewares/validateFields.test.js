const chai = require('chai');
const chaiHttp = require('chai-http');
const { expect } = chai;
chai.use(chaiHttp);

const sinon = require('sinon');

const app = require('../../../src/app');
const { tiposDeConexao } = require('../../../src/schemas/types');

const { validateFields } = require('../../../src/middlewares/validations');

let mockRequestBody = {
  numeroDoDocumento: '14041737706',
  tipoDeConexao: 'bifasico',
  classeDeConsumo: 'comercial',
  modalidadeTarifaria: 'convencional',
  historicoDeConsumo: [3878, 9760, 5976, 2797, 2481, 5731, 7538, 4392, 7859, 4160, 6941, 4597],
};

describe('1 - Expects "validateFields" middleware to validade', () => {
  let response = {};

  beforeEach(() => {
    mockRequestBody = {
      numeroDoDocumento: '14041737706',
      tipoDeConexao: 'bifasico',
      classeDeConsumo: 'comercial',
      modalidadeTarifaria: 'convencional',
      historicoDeConsumo: [3878, 9760, 5976, 2797, 2481, 5731, 7538, 4392, 7859, 4160, 6941, 4597],
    };
  });

  it('1.1 - That the "numeroDoDocumento" field has to have the right format', async () => {
    mockRequestBody.numeroDoDocumento = 123;

    response = await chai.request(app).post('/customer').send(mockRequestBody);

    expect(response.status).to.be.equal(400);
    expect(response.body).to.have.property('error');
    expect(response.body.error).to.be.equals('"numeroDoDocumento" must be a string');

    mockRequestBody.numeroDoDocumento = '123';

    response = await chai.request(app).post('/customer').send(mockRequestBody);

    expect(response.status).to.be.equal(400);
    expect(response.body).to.have.property('error');
    expect(response.body.error).to.be.equals(
      '"numeroDoDocumento" length must be at least 11 characters long'
    );

    mockRequestBody.numeroDoDocumento = '123456789012345';

    response = await chai.request(app).post('/customer').send(mockRequestBody);

    expect(response.status).to.be.equal(400);
    expect(response.body).to.have.property('error');
    expect(response.body.error).to.be.equals(
      '"numeroDoDocumento" length must be less than or equal to 14 characters long'
    );
  });

  it('1.2 - That the "tipoDeConexao" field has to have the right format', async () => {
    mockRequestBody.tipoDeConexao = 'teste';

    response = await chai.request(app).post('/customer').send(mockRequestBody);

    expect(response.status).to.be.equal(400);
    expect(response.body).to.have.property('error');
    expect(response.body.error).to.be.equals(
      '"tipoDeConexao" must be one of [monofasico, bifasico, trifasico]'
    );

    mockRequestBody.tipoDeConexao = 'monofásico';

    response = await chai.request(app).post('/customer').send(mockRequestBody);
    expect(response.status).to.be.equal(400);
    expect(response.body).to.have.property('error');
    expect(response.body.error).to.be.equals(
      '"tipoDeConexao" must be one of [monofasico, bifasico, trifasico]'
    );
  });

  it('1.3 - That the "classeDeConsumo" field has to have the right format', async () => {
    mockRequestBody.classeDeConsumo = 'teste';

    response = await chai.request(app).post('/customer').send(mockRequestBody);

    expect(response.status).to.be.equal(400);
    expect(response.body).to.have.property('error');
    expect(response.body.error).to.be.equals(
      '"classeDeConsumo" must be one of [residencial, industrial, comercial, rural, poderPublico]'
    );

    mockRequestBody.classeDeConsumo = 'poderPúblico';

    response = await chai.request(app).post('/customer').send(mockRequestBody);
    expect(response.status).to.be.equal(400);
    expect(response.body).to.have.property('error');
    expect(response.body.error).to.be.equals(
      '"classeDeConsumo" must be one of [residencial, industrial, comercial, rural, poderPublico]'
    );
  });

  it('1.3 - That the "modalidadeTarifaria" field has to have the right format', async () => {
    mockRequestBody.modalidadeTarifaria = 'teste';

    response = await chai.request(app).post('/customer').send(mockRequestBody);

    expect(response.status).to.be.equal(400);
    expect(response.body).to.have.property('error');
    expect(response.body.error).to.be.equals(
      '"modalidadeTarifaria" must be one of [azul, branca, verde, convencional]'
    );

    mockRequestBody.modalidadeTarifaria = 'branco';

    response = await chai.request(app).post('/customer').send(mockRequestBody);
    expect(response.status).to.be.equal(400);
    expect(response.body).to.have.property('error');
    expect(response.body.error).to.be.equals(
      '"modalidadeTarifaria" must be one of [azul, branca, verde, convencional]'
    );
  });

  it('1.4 - That the "historicoDeConsumo" field has to have the right format', async () => {
    mockRequestBody.historicoDeConsumo = 'teste';

    response = await chai.request(app).post('/customer').send(mockRequestBody);

    expect(response.status).to.be.equal(400);
    expect(response.body).to.have.property('error');
    expect(response.body.error).to.be.equals('"historicoDeConsumo" must be an array');
  });

  it('1.5 - That if all parameters are fine, should return the correct response', async () => {
    response = await chai.request(app).post('/customer').send(mockRequestBody);

    expect(response.status).to.be.equal(200);
    expect(response.body).to.not.have.property('error');
    expect(response.body).to.have.property('economiaAnualDeCO2');
    expect(response.body.economiaAnualDeCO2).to.be.equal('5553.24');
  });
});
