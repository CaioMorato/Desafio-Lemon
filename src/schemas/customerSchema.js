const Joi = require('joi');
const { tiposDeConexao, classesDeConsumo, modalidadesTarifarias } = require('./types');

const customerSchemaValidation = Joi.object({
  numeroDoDocumento: Joi.string().min(11).max(14).required(),
  tipoDeConexao: Joi.string().required().valid(...tiposDeConexao),
  classeDeConsumo: Joi.string().required().valid(...classesDeConsumo),
  modalidadeTarifaria: Joi.string().required().valid(...modalidadesTarifarias),
  historicoDeConsumo: Joi.array().items(Joi.number().integer().min(0).max(9999)).min(3).max(12),
});

module.exports = { customerSchemaValidation };
