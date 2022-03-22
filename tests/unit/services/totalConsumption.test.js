const { expect } = require('chai');

const { totalConsumption } = require('../../../src/services/customerServices');

const mockArrays = [
  [200, 300, 400, 500],
  [350, 550, 750, 950, 1150],
  [460, 660, 860, 1060, 1260, 1460],
];

describe('1 - Expects the "totalConsumption" function', () => {
  it('1.1 - To return a valid number', () => {
    const checker = mockArrays[0].reduce((acc, curr) => acc + curr, 0);
    expect(totalConsumption(mockArrays[0])).to.be.equal(checker);
  });

  it('1.2 - To return the correct value given test arrays', () => {
    const checker_1 = mockArrays[0].reduce((acc, curr) => acc + curr, 0);
    const checker_2 = mockArrays[1].reduce((acc, curr) => acc + curr, 0);
    const checker_3 = mockArrays[2].reduce((acc, curr) => acc + curr, 0);

    expect(totalConsumption(mockArrays[0])).to.be.equal(checker_1);
    expect(totalConsumption(mockArrays[1])).to.be.equal(checker_2);
    expect(totalConsumption(mockArrays[2])).to.be.equal(checker_3);
  });
});
