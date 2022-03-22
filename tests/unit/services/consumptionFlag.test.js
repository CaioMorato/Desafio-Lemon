const { expect } = require('chai');
const { beforeEach } = require('mocha');

const { consumptionFlag } = require('../../../src/services/customerServices');

const mockObject = {
  modalidadeTarifaria: 'branca',
};

describe('1 - Expects the "consumptionFlag" function', () => {
  beforeEach(() => {
    mockObject.modalidadeTarifaria = 'branca';
  });

  it('1.1 - To return an object', () => {
    expect(consumptionFlag(mockObject)).to.be.an('object');
  });

  it('1.2 - To return the correct object if the consumption class is NOT eligible', () => {
    mockObject.modalidadeTarifaria = 'azul';

    expect(consumptionFlag(mockObject).status).to.be.false;
    expect(consumptionFlag(mockObject)).to.have.property('message');
    expect(consumptionFlag(mockObject).message).to.be.equal('Modalidade tarifária não aceita');

    mockObject.modalidadeTarifaria = 'verde';

    expect(consumptionFlag(mockObject).status).to.be.false;
    expect(consumptionFlag(mockObject)).to.have.property('message');
    expect(consumptionFlag(mockObject).message).to.be.equal('Modalidade tarifária não aceita');
  });

  it('1.3 - To return the correct object if the consumption class IS eligible', () => {
    mockObject.modalidadeTarifaria = 'branca';

    expect(consumptionFlag(mockObject).status).to.be.true;
    expect(consumptionFlag(mockObject)).to.not.have.property('message');

    mockObject.modalidadeTarifaria = 'convencional';

    expect(consumptionFlag(mockObject).status).to.be.true;
    expect(consumptionFlag(mockObject)).to.not.have.property('message');
  });
});
