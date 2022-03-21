const { StatusCodes } = require('http-status-codes');
const { customerSchemaValidation } = require('../schemas/customerSchema');

const validateFields = async (req, res) => {
  try {
    // const validate = await customerSchemaValidation.validate(req.body);
    console.log('chegou aqui');
  } catch (err) {
    console.log(err);
    res.status(StatusCodes.BAD_REQUEST).json({ error: err });
  }
};
module.exports = { validateFields };
