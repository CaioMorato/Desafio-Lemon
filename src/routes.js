// vitals
const routes = require('express').Router();
const { validateFields } = require('./middlewares/validations');

routes.get('/', (req, res) => {
  console.log('pong');
  res.json('teste');
});
routes.post('/customer', validateFields);

module.exports = routes;
