const { body } = require("express-validator");

const adminLoginValidation = [
  body("username").trim().notEmpty().withMessage("username is required"),
  body("password").notEmpty().withMessage("password is required"),
];

const createUserValidation = [
  body("name").trim().notEmpty().withMessage("name is required"),
  body("email").isEmail().withMessage("valid email is required"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("password must be at least 6 characters"),
  body("username").trim().notEmpty().withMessage("username is required"),
  body("room").trim().notEmpty().withMessage("room is required"),
  body("batch").trim().notEmpty().withMessage("batch is required"),
];

const gatepassActionValidation = [
  body("userid").trim().notEmpty().withMessage("userid is required"),
  body("id").trim().notEmpty().withMessage("id is required"),
  body("approved").isBoolean().withMessage("approved must be boolean"),
  body("comment")
    .optional({ values: "falsy" })
    .isString()
    .withMessage("comment must be string"),
];

module.exports = {
  adminLoginValidation,
  createUserValidation,
  gatepassActionValidation,
};
