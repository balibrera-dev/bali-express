const { StatusCodes } = require('http-status-codes');
const errorHandlerMiddleware = (err, req, res, next) => {
  console.log(err);
  let customError = {
    // set default
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || 'Something went wrong try again later',
  };
  if (err.name === 'ValidationError') {
    const array = Object.values(err.errors);
    // console.log(Object.keys(err.errors));
    const allButLast = array
      .slice(0, -1)
      .map((item) => item.message)
      .join(', ');
    const last = array[array.length - 1].message;
    // console.log(last);
    customError.msg =
      'Fields ' + allButLast + ' and ' + last + ' are required to proceed.';
    customError.statusCode = 400;
  }
  if (err.code && err.code === 11000) {
    customError.msg = `Duplicate value entered for ${Object.keys(
      err.keyValue
    )} field, please choose another value`;
    customError.statusCode = 400;
  }
  if (err.name === 'CastError') {
    customError.msg = `No item found with id : ${err.value}`;
    customError.statusCode = 404;
  }

  return res.status(customError.statusCode).json({ msg: customError.msg });
};

module.exports = errorHandlerMiddleware;
