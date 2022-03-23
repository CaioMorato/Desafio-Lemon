// vitals
const routes = require('express').Router();
const { validateFields } = require('./middlewares/validations');
const { checkEligibility } = require('./controller/customerController');

routes.post('/customer', validateFields, checkEligibility);

routes.post('/', (req, res) => {
  res.status(400).send({ status: 200, message: 'API funcionando!' });
});

module.exports = routes;
