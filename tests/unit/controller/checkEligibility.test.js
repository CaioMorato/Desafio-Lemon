const chai = require('chai');
const chaiHttp = require('chai-http');
const { expect } = chai;
chai.use(chaiHttp);

const sinon = require('sinon');

const app = require('../../../src/app');
