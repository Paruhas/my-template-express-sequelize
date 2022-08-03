const { ErrorService } = require("../utils/error_service.js");

module.exports = (err, req, res, next) => {
  const resError = ErrorService(err);

  let resHTTPCode = 500;

  if (err.httpStatusCode) {
    resHTTPCode = err.httpStatusCode;
  }
  if (err.status) {
    resHTTPCode = err.status;
  }
  if (err.name === "TokenExpiredError" || err.name === "JsonWebTokenError") {
    resHTTPCode = 401; // ดัก Error จากการ Auth Token
  }
  if (err.name === "SequelizeValidationError") {
    resHTTPCode = 400;
  }

  return res.status(resHTTPCode).json(resError);
};
