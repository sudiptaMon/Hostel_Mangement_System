const NODE_ENV = process.env.NODE_ENV || "development";

const normalizeOrigins = (raw) => {
  if (!raw) return [];
  return raw
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);
};

const CLIENT_ORIGINS =
  NODE_ENV === "production"
    ? normalizeOrigins(process.env.CLIENT_ORIGIN)
    : normalizeOrigins(process.env.CLIENT_ORIGIN || "http://localhost:3000");

module.exports = {
  NODE_ENV,
  IS_PRODUCTION: NODE_ENV === "production",
  PORT: process.env.PORT || 5000,
  DB_URI: process.env.DB_URI,
  SECRET_KEY: process.env.SECRET_KEY,
  CLIENT_ORIGINS,
};
