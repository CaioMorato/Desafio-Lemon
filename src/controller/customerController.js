const { StatusCodes } = require('http-status-codes');
const customerServices = require('../services/customerServices');

const checkEligibility = async (req, res) => {
  try {
    const getClientType = customerServices.clientType(req.body);
    const getConsumptionFlag = customerServices.consumptionFlag(req.body);
    const getMinimumConsumption = customerServices.minimumConsumption(req.body);

    res.status(StatusCodes.OK).json(
      { elegivel: true, economiaAnualDeCO2: customerServices.carbonEmission(req.body) },
    );
  } catch (error) {
    res.status(StatusCodes).json({ error });
  }
};

module.exports = { checkEligibility };
