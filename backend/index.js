require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const user = require("./schema/user");
const admin = require("./schema/admin");
const gatepass = require("./schema/gatepass");
const client = require("mongoose");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const user_router = require("./Router/userRoute");
const admin_router = require("./Router/adminRoute");
const cookie_parser = require("cookie-parser");
const jwt = require("jsonwebtoken");

client.connect("mongodb://localhost:27017/HMS").then(() => {
  console.log("DB Connected");
});
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(cookie_parser());
app.use(bodyParser.json());

app.use("/Student", user_router);
app.use("/Admin", admin_router);
app.get("/logout", (req, res) => {
  res.clearCookie("isUser");
  res.sendStatus(200);
});

app.get("/authenticate", async (req, res) => {
  const token = req.cookies.isUser;
  if (!token) {
    return res.json({ isAuthenticated: false });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    // console.log( decoded);
    let userdata;
    if (decoded._doc.role === "Student") {
      userdata = await user.findById(decoded._doc._id);
    }
    if (decoded._doc.role === "Admin") {
      userdata = await admin.findById(decoded._doc._id);
    }
    // console.log(userdata);
    userdata.password = undefined;
    if (userdata) {
      res.json({ isAuthenticated: true, user: userdata });
    } else {
      res.json({ isAuthenticated: false });
    }
  } catch (error) {
    console.log(error);
    res.json({ isAuthenticated: false });
  }
});

app.listen(5000, () => {
  console.log("Server started");
});
