const { StatusCodes } = require('http-status-codes');
const { customerSchemaValidation } = require('../schemas/customerSchema');

const validateFields = async (req, res, next) => {
  try {
    const validate = await customerSchemaValidation.validate(req.body);

    console.log(validate);
    if (validate.error) {
      return res.status(StatusCodes.BAD_REQUEST).json({ error: validate.error.details[0].message });
    }

    next();
  } catch (err) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err });
  }
};

module.exports = { validateFields };
