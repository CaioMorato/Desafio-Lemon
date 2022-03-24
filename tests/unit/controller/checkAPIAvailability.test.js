const chai = require('chai');
const chaiHttp = require('chai-http');
const { expect } = chai;
chai.use(chaiHttp);

const app = require('../../../src/app');

describe('1 - Expects the "checkEligibility" controller', () => {
  let response = {};

  it('1.1 - To return the proper value if the customer IS eligible', async () => {
    response = await chai.request(app).get('/');

    expect(response.status).to.be.equal(200);
    expect(response.body).to.have.property('message');
    expect(response.body.message).to.be.equals('API funcionando!');
  });
});
