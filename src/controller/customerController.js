const { StatusCodes } = require('http-status-codes');
const customerServices = require('../services/customerServices');

const checkEligibility = async (req, res) => {
  try {
    const getClientType = customerServices.clientType(req.body);
    const getConsumptionFlag = customerServices.consumptionFlag(req.body);
    const getMinimumConsumption = customerServices.minimumConsumption(req.body);

    const errorStack = [
      getClientType.message,
      getConsumptionFlag.message,
      getMinimumConsumption.message,
    ];

    if (getClientType.message || getConsumptionFlag.message || getMinimumConsumption.message) {
      // this will get only the valid items and populate a new array which will be returned
      const filteredErrorStack = errorStack.filter((item) => !!item);

      return res
        .status(StatusCodes.OK)
        .json({ elegivel: false, razoesInelegibilidade: filteredErrorStack });
    }

    return res
      .status(StatusCodes.OK)
      .json({ elegivel: true, economiaAnualDeCO2: customerServices.carbonEmission(req.body) });
  } catch (error) {
    console.error(error);
  }
};

module.exports = { checkEligibility };
