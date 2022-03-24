// vitals
const routes = require('express').Router();
const { validateFields } = require('./middlewares/validations');
const { checkEligibility, checkAPIAvailability } = require('./controller/customerController');

routes.post('/customer', validateFields, checkEligibility);

routes.get('/', checkAPIAvailability);

module.exports = routes;
