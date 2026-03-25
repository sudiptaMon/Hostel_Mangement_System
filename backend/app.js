require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const user = require("./schema/user");
const admin = require("./schema/admin");
const userRouter = require("./Router/userRoute");
const adminRouter = require("./Router/adminRoute");
const constants = require("./constants/constants");
const verifyToken = require("./middleware/verifyToken");
const { notFoundHandler, errorHandler } = require("./middleware/errorHandler");
const requestLogger = require("./middleware/requestLogger");
const { authRateLimiter, apiRateLimiter } = require("./middleware/rateLimit");
const connectDB = require("./config/db");
const { CLIENT_ORIGINS, NODE_ENV, IS_PRODUCTION } = require("./config/env");
const { COOKIE_NAME } = require("./config/cookie");

const app = express();
connectDB().catch((error) => {
  console.log("Database connection failed", error);
});

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || CLIENT_ORIGINS.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("Not allowed by CORS"));
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);
app.use(cookieParser());
app.use(bodyParser.json());
app.use(requestLogger);
app.use(apiRateLimiter);
app.use("/Student/login", authRateLimiter);
app.use("/Admin/login", authRateLimiter);

app.use("/Student", userRouter);
app.use("/Admin", adminRouter);

app.get("/health", async (req, res) => {
  const mongoState = require("mongoose").connection.readyState;
  const dbStatus = mongoState === 1 ? "up" : "down";
  console.log(process.env.DB_URI);
  return res.status(200).json({
    status: dbStatus === "up" ? "ok" : "degraded",
    environment: NODE_ENV,
    uptime: process.uptime(),
    db: dbStatus,
  });
});

app.post("/logout", (req, res) => {
  res.clearCookie(COOKIE_NAME, {
    httpOnly: true,
    sameSite: IS_PRODUCTION ? "none" : "lax",
    secure: IS_PRODUCTION,
  });

  res.set(
    "Cache-Control",
    "no-store, no-cache, must-revalidate, proxy-revalidate",
  );
  res.set("Pragma", "no-cache");
  res.set("Expires", "0");
  res.status(200).json({ success: true });
});

app.post("/authenticate", verifyToken, async (req, res) => {
  try {
    let userData;
    if (req.user.role === "Student") {
      userData = await user.findById(req.user.id);
    }
    if (req.user.role === "Admin") {
      userData = await admin.findById(req.user.id);
    }

    if (userData) {
      userData.password = undefined;
      return res.json({ isAuthenticated: true, user: userData });
    }
    return res.json({ isAuthenticated: false });
  } catch (error) {
    if (NODE_ENV !== "production") {
      console.log(error);
    }
    return res.status(constants.SERVERERROR).json({ isAuthenticated: false });
  }
});

app.use(notFoundHandler);
app.use(errorHandler);
module.exports = app;
