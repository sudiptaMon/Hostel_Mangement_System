const { IS_PRODUCTION } = require("./env");

const COOKIE_NAME = "isUser";

const cookieOptions = {
  httpOnly: true,
  maxAge: 24 * 60 * 60 * 1000,
  sameSite: IS_PRODUCTION ? "none" : "lax",
  secure: IS_PRODUCTION,
};

module.exports = {
  COOKIE_NAME,
  cookieOptions,
};
