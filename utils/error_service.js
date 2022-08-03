const { writeLogFile } = require("./log_service.js");

const isProduction = process.env.ENV === "production";

const ErrorFormat = (error) => {
  const devError = {
    res_code: "8888",
    res_type: "error",
    res_stack: error.stack || "",
    res_message: error.message || "",
    res_data: {},
  };
  const prodError = {
    res_code: "8888",
    res_message: "Server error.",
    res_data: {},
  };

  return {
    devError,
    prodError,
  };
};

exports.ErrorService = (error) => {
  const { devError, prodError } = ErrorFormat(error);

  try {
    writeLogFile(null, error);
  } catch (error) {}

  const resError = isProduction ? prodError : devError;
  return resError;
};
