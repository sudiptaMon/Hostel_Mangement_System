const jwt = require("jsonwebtoken");
const constants = require("../constants/constants");
const { SECRET_KEY } = require("../config/env");
const { COOKIE_NAME } = require("../config/cookie");

const verifyToken = (req, res, next) => {
  const token = req.cookies[COOKIE_NAME];

  if (!token) {
    return res.status(constants.UNAUTHORISED).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    return next();
  } catch (err) {
    return res.status(constants.UNAUTHORISED).json({ message: "Invalid token" });
  }
};

module.exports = verifyToken;
