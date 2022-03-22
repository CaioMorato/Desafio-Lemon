// const { tiposDeConexao, classesDeConsumo, modalidadesTarifarias } = require('../schemas/types');

const eligibleClasses = [
  'comercial',
  'residencial',
  'industrial',
];

const eligibleFlags = [
  'convencional',
  'branca',
];

const eligibleConnections = {
  monofasico: 400,
  bifasico: 500,
  trifasico: 750,
};

const clientType = (object) => {
  const { classeDeConsumo } = object;

  if (!eligibleClasses.includes(classeDeConsumo)) {
    return false;
  }

  return true;
};

const consumptionFlag = (object) => {
  const { modalidadeTarifaria } = object;

  if (!eligibleFlags.includes(modalidadeTarifaria)) {
    return false;
  }

  return true;
};

const totalConsumption = (consumptionData) => consumptionData.reduce((acc, curr) => acc + curr, 0);

const minimumConsumption = (object) => {
  const { historicoDeConsumo, tipoDeConexao } = object;

  const average = (totalConsumption(historicoDeConsumo) / historicoDeConsumo.length);

  if (average < eligibleConnections[tipoDeConexao]) {
    return false;
  }

  return true;
};

const carbonEmission = (object) => {
  const { historicoDeConsumo } = object;

  // each 1000kWh consumed also produces on average 84Kg
  const RATIO = 0.084;

  const consumption = totalConsumption(historicoDeConsumo);

  return (consumption * RATIO).toFixed(2);
};

module.exports = {
  clientType, consumptionFlag, minimumConsumption, carbonEmission,
};
