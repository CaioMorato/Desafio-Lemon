const Joi = require('joi');
const { tipoDeConexao, classeDeConsumo, modalidadesTarifarias } = require('./types');

const customerSchemaValidation = Joi.object({
  numeroDoDocumento: Joi.string().min(11).max(14).required(),
  tipoDeConexao: Joi.string().required().valid('monofasico', 'bifasico'),
  // classeDeConsumo: Joi.string().required().valid(classeDeConsumo),
  // modalidadeTarifaria: Joi.string().required().valid(modalidadesTarifarias),
  historicoDeConsumo: Joi.array().items(Joi.number().integer().min(0).max(9999)).min(3).max(12),
});

module.exports = { customerSchemaValidation };
