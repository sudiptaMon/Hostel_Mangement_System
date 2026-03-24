const { body } = require("express-validator");

const loginValidation = [
  body("username").trim().notEmpty().withMessage("username is required"),
  body("password").notEmpty().withMessage("password is required"),
];

const newGatepassValidation = [
  body("formData").isObject().withMessage("formData must be an object"),
  body("formData.applyFor").trim().notEmpty().withMessage("applyFor is required"),
  body("formData.reason").trim().notEmpty().withMessage("reason is required"),
  body("formData.outTime").trim().notEmpty().withMessage("outTime is required"),
  body("formData.inTime").trim().notEmpty().withMessage("inTime is required"),
];

module.exports = {
  loginValidation,
  newGatepassValidation,
};
