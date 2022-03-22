const { expect } = require('chai');
const {
  eligibleClasses,
  eligibleFlags,
  eligibleConnections,
} = require('../../../src/services/customerServices');

describe('1 - Expects the "eligibleClasses" options', () => {
  it('1.1 - To be an array', () => {
    expect(eligibleClasses).to.be.an('array');
  });
  it('1.2 - To have 3 correct items', () => {
    expect(eligibleClasses).to.have.length(3);
    expect(eligibleClasses[0]).to.be.equal('comercial');
    expect(eligibleClasses[1]).to.be.equal('residencial');
    expect(eligibleClasses[2]).to.be.equal('industrial');
  });
});

describe('2 - Expects the "eligibleFlags" options', () => {
  it('2.1 - To be an array', () => {
    expect(eligibleFlags).to.be.an('array');
  });
  it('2.2 - To have 2 correct items', () => {
    expect(eligibleFlags).to.have.length(2);
    expect(eligibleFlags[0]).to.be.equal('convencional');
    expect(eligibleFlags[1]).to.be.equal('branca');
  });
});

describe('3 - Expects the dicionary eligibleConnections ', () => {
  it('3.1 -  to be an Object', () => {
    expect(eligibleConnections).to.be.an('object');
  });
  it('3.2 - To have "monofasico" property with value 400', () => {
    expect(eligibleConnections).to.have.property('monofasico');
    expect(eligibleConnections.monofasico).to.equal(400);
  });
  it('3.3 - To have "bifasico" property with value 500', () => {
    expect(eligibleConnections).to.have.property('bifasico');
    expect(eligibleConnections.bifasico).to.equal(500);
  });
  it('3.4 - To have "trifasico" property with value 750', () => {
    expect(eligibleConnections).to.have.property('monofasico');
    expect(eligibleConnections.trifasico).to.equal(750);
  });
});
