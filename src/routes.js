// vitals
const routes = require('express').Router();
const { validateFields } = require('./middlewares/validations');

routes.post('/customer', validateFields);

module.exports = routes;
