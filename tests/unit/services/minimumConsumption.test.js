const { expect } = require('chai');

const { minimumConsumption } = require('../../../src/services/customerServices');

const mockArray = [350, 550, 750, 950, 1150];

const monofasicoArrays = [
  [400, 400, 400],
  [100, 200, 300],
];

const bifasicoArrays = [
  [500, 500, 500],
  [100, 200, 300],
];

const trifasicoArrays = [
  [750, 750, 750],
  [100, 200, 300],
];

const mockObject = {
  tipoDeConexao: 'monofasico',
  historicoDeConsumo: mockArray,
};

describe('1 - Expects the "minimumConsumption" function', () => {
  beforeEach(() => {
    mockObject.tipoDeConexao = 'monofasico';
    mockObject.historicoDeConsumo = mockArray;
  });

  it('1.1 - To return an object', () => {
    expect(minimumConsumption(mockObject)).to.be.an('object');
  });

  it('1.2 - To return the correct object if the client minimum consumption is NOT eligible', () => {
    mockObject.historicoDeConsumo = monofasicoArrays[1];

    expect(minimumConsumption(mockObject).status).to.be.false;
    expect(minimumConsumption(mockObject)).to.have.property('message');
    expect(minimumConsumption(mockObject).message).to.be.equal(
      'Consumo muito baixo para tipo de conexão'
    );

    mockObject.historicoDeConsumo = bifasicoArrays[1];

    expect(minimumConsumption(mockObject).status).to.be.false;
    expect(minimumConsumption(mockObject)).to.have.property('message');
    expect(minimumConsumption(mockObject).message).to.be.equal(
      'Consumo muito baixo para tipo de conexão'
    );

    mockObject.historicoDeConsumo = trifasicoArrays[1];

    expect(minimumConsumption(mockObject).status).to.be.false;
    expect(minimumConsumption(mockObject)).to.have.property('message');
    expect(minimumConsumption(mockObject).message).to.be.equal(
      'Consumo muito baixo para tipo de conexão'
    );
  });

  it('1.2 - To return the correct object if the client minimum consumption IS eligible', () => {
    mockObject.historicoDeConsumo = monofasicoArrays[0];

    expect(minimumConsumption(mockObject).status).to.be.true;
    expect(minimumConsumption(mockObject)).to.not.have.property('message');

    mockObject.historicoDeConsumo = bifasicoArrays[0];

    expect(minimumConsumption(mockObject).status).to.be.true;
    expect(minimumConsumption(mockObject)).to.not.have.property('message');

    mockObject.historicoDeConsumo = trifasicoArrays[0];

    expect(minimumConsumption(mockObject).status).to.be.true;
    expect(minimumConsumption(mockObject)).to.not.have.property('message');
  });
});
