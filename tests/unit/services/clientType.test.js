const { expect } = require('chai');
const { beforeEach } = require('mocha');

const { clientType } = require('../../../src/services/customerServices');

const mockObject = {
  classeDeConsumo: 'residencial',
};

describe('1 - Expects the "clientType" function', () => {
  beforeEach(() => {
    mockObject.classeDeConsumo = 'industrial';
  });

  it('1.1 - To return an object', () => {
    expect(clientType(mockObject)).to.be.an('object');
  });

  it('1.2 - To return the correct object if the consumption class is NOT eligible', () => {
    mockObject.classeDeConsumo = 'rural';

    expect(clientType(mockObject).status).to.be.false;
    expect(clientType(mockObject)).to.have.property('message');
    expect(clientType(mockObject).message).to.be.equal('Classe de consumo não aceita');

    mockObject.classeDeConsumo = 'poderPublico';

    expect(clientType(mockObject).status).to.be.false;
    expect(clientType(mockObject)).to.have.property('message');
    expect(clientType(mockObject).message).to.be.equal('Classe de consumo não aceita');
  });

  it('1.3 - To return the correct object if the consumption class IS eligible', () => {
    expect(clientType(mockObject).status).to.be.true;
    expect(clientType(mockObject)).to.not.have.property('message');
  });
});
