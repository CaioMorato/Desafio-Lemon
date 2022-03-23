const chai = require('chai');
const chaiHttp = require('chai-http');
const { expect } = chai;
chai.use(chaiHttp);

const sinon = require('sinon');

const app = require('../../../src/app');

let mockRequestBody = {
  numeroDoDocumento: '14041737706',
  tipoDeConexao: 'bifasico',
  classeDeConsumo: 'comercial',
  modalidadeTarifaria: 'convencional',
  historicoDeConsumo: [3878, 9760, 5976, 2797, 2481, 5731, 7538, 4392, 7859, 4160, 6941, 4597],
};

describe('1 - Expects the "checkEligibility" controller', () => {
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

  it('1.1 - To return the proper value if the customer IS eligible', async () => {
    response = await chai.request(app).post('/customer').send(mockRequestBody);

    const economy = (
      mockRequestBody.historicoDeConsumo.reduce((acc, curr) => acc + curr, 0) * 0.084
    ).toFixed(2);

    expect(response.status).to.be.equal(200);
    expect(response.body).to.have.property('elegivel');
    expect(response.body.elegivel).to.be.true;
    expect(response.body).to.have.property('economiaAnualDeCO2');
    expect(response.body.economiaAnualDeCO2).to.be.equals(economy);
  });

  it('1.2 - To return the proper value if the customer is NOT eligible', async () => {
    mockRequestBody.classeDeConsumo = 'rural';
    response = await chai.request(app).post('/customer').send(mockRequestBody);

    expect(response.status).to.be.equal(406);
    expect(response.body).to.have.property('elegivel');
    expect(response.body.elegivel).to.be.false;
    expect(response.body).to.have.property('razoesInelegibilidade');
    expect(response.body.razoesInelegibilidade[0]).to.be.equal('Classe de consumo não aceita');

    mockRequestBody.modalidadeTarifaria = 'verde';
    response = await chai.request(app).post('/customer').send(mockRequestBody);

    expect(response.body.razoesInelegibilidade[1]).to.be.equal('Modalidade tarifária não aceita');

    mockRequestBody.historicoDeConsumo = [100, 200, 300];
    response = await chai.request(app).post('/customer').send(mockRequestBody);

    expect(response.body.razoesInelegibilidade[2]).to.be.equal(
      'Consumo muito baixo para tipo de conexão'
    );
  });
});
