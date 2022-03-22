const { expect } = require('chai');

const { carbonEmission } = require('../../../src/services/customerServices');

const RATIO = 0.084;

const mockArrays = [
  [200, 300, 400, 500],
  [350, 550, 750, 950, 1150],
  [460, 660, 860, 1060, 1260, 1460],
];

const mockObject = {
  historicoDeConsumo: mockArrays[0],
};

describe('1 - Expects the "carbonEmission" function', () => {
  it('1.1 - To return the correct numbers', () => {
    const check_1 = (mockArrays[0].reduce((acc, curr) => acc + curr, 0) * RATIO).toFixed(2);
    const check_2 = (mockArrays[1].reduce((acc, curr) => acc + curr, 0) * RATIO).toFixed(2);
    const check_3 = (mockArrays[2].reduce((acc, curr) => acc + curr, 0) * RATIO).toFixed(2);

    expect(carbonEmission(mockObject)).to.be.equal(check_1);

    mockObject.historicoDeConsumo = mockArrays[1];

    expect(carbonEmission(mockObject)).to.be.equal(check_2);

    mockObject.historicoDeConsumo = mockArrays[2];

    expect(carbonEmission(mockObject)).to.be.equal(check_3);
  });
});
