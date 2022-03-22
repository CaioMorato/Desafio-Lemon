const { expect } = require('chai');

const {
  eligibleConnections,
  minimumConsumption,
} = require('../../../src/services/customerServices');

const mockArray = [350, 550, 750, 950, 1150];

const mockObject = {
  tipoDeConexao: 'monofasico',
  historicoDeConsumo: mockArray,
};

describe('1 - Expects the "minimumConsumption" function', () => {
  it('1.1 - To return an object', () => {
    expect(minimumConsumption(mockObject)).to.be.an('object');
  });

  it('1.2 - To return the correct objetct ', () => {})
});
