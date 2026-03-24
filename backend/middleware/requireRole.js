const constants = require("../constants/constants");

const requireRole = (allowedRole) => {
  return (req, res, next) => {
    if (!req.user || req.user.role !== allowedRole) {
      return res
        .status(constants.UNAUTHORISED)
        .json({ message: "Forbidden for current role" });
    }
    return next();
  };
};

module.exports = requireRole;
