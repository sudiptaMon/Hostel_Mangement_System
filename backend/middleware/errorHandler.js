const constants = require("../constants/constants");
const { NODE_ENV } = require("../config/env");

const notFoundHandler = (req, res, next) => {
  res.status(constants.NOTFOUND).json({ message: "Route not found" });
};

const errorHandler = (err, req, res, next) => {
  if (NODE_ENV !== "production") {
    console.log(err);
  }

  if (res.headersSent) {
    return next(err);
  }

  return res.status(constants.SERVERERROR).json({
    message: "Internal server error",
  });
};

module.exports = {
  notFoundHandler,
  errorHandler,
};
