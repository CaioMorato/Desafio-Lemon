// vitals
const express = require('express');
const routes = require('./routes');

// setup
const app = express();

app.use(express.json());

app.use(routes);

module.exports = app;
