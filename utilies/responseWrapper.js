const success = (statusCode, result) => {
  return {
    statusCode,
    Status: "ok",
    result,
  };
};
const error = (statusCode, error) => {
  return {
    statusCode,
    Status: "error",
    error,
  };
};
module.exports = {
  success,
  error,
};
