const cpf = {
  type: 'string',
  pattern: '^\\d{11}$',
  example: '21554495008',
};

const cnpj = {
  type: 'string',
  pattern: '^\\d{14}$',
  example: '33400689000109',
};

const tiposDeConexao = ['monofasico', 'bifasico', 'trifasico'];

const classesDeConsumo = [
  'residencial',
  'industrial',
  'comercial',
  'rural',
  'poderPublico',
];

const modalidadesTarifarias = ['azul', 'branca', 'verde', 'convencional'];

module.exports = {
  cpf,
  cnpj,
  tiposDeConexao,
  classesDeConsumo,
  modalidadesTarifarias,
};
