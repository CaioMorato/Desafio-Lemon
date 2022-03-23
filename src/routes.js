// vitals
const routes = require('express').Router();
const { validateFields } = require('./middlewares/validations');
const { checkEligibility } = require('./controller/customerController');

routes.post('/customer', validateFields, checkEligibility);

routes.get('/', (req, res) => {
  res.status(200).send({ status: 200, message: 'API funcionando!' });
});

module.exports = routes;
