const express = require("express");
const router = express.Router();
const user = require("../schema/user");
const gatepass = require("../schema/gatepass");
const menuSchema = require("../schema/menuSchema");

const constants = require("../constants/constants");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const cookieParser = require("cookie-parser");
const verifyToken = require("../middleware/verifyToken");
const requireRole = require("../middleware/requireRole");
const validateRequest = require("../middleware/validateRequest");
const {
  loginValidation,
  newGatepassValidation,
} = require("../validators/userValidators");
const { SECRET_KEY, NODE_ENV } = require("../config/env");
const { COOKIE_NAME, cookieOptions } = require("../config/cookie");
const date = new Date();

router.use(cookieParser());

router.post("/login", loginValidation, validateRequest, async (req, res) => {
  const { username, password } = req.body;
  let response = await user.findOne({ username });

  if (!response) {
    return res.json({ status: false });
  }
  if (!bcrypt.compareSync(password, response.password)) {
    return res.json({ status: false });
  }

  const tokenPayload = {
    id: String(response._id),
    role: response.role,
    username: response.username,
    name: response.name,
  };
  response.password = undefined;
  let token = jwt.sign(tokenPayload, SECRET_KEY, {
    expiresIn: "24h",
  });
  res.cookie(COOKIE_NAME, token, cookieOptions);

  res.status(constants.SUCCESS).json({ response, status: true });
});

router.post(
  "/newgatepass",
  verifyToken,
  requireRole("Student"),
  newGatepassValidation,
  validateRequest,
  async (req, res) => {
    let { formData } = req.body;
    let todayDate =
      date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();

    try {
      let gatepassHistory = await gatepass.findOne({ userid: req.user.id });
      if (!gatepassHistory) {
        return res.status(constants.NOTFOUND).json({ added: false });
      }

      let userGatepass = gatepassHistory.history;
      let gatepassObject = {
        ...formData,
        todayDate,
        id: crypto.randomBytes(16).toString("hex"),
        status: "PENDING",
        permitBy: "",
        srno: userGatepass.length + 1,
      };
      userGatepass.push(gatepassObject);
      await gatepass.updateOne({ userid: req.user.id }, { history: userGatepass });
      res.status(constants.SUCCESS).json({ added: true });
    } catch (err) {
      if (NODE_ENV !== "production") {
        console.log(err);
      }
      return res
        .status(constants.SERVERERROR)
        .json({ added: false, message: "Internal server error" });
    }
  }
);

router.get(
  "/gatepass-history",
  verifyToken,
  requireRole("Student"),
  async (req, res) => {
  try {
    let gatepassHistory = await gatepass.findOne({ userid: req.user.id });
    if (!gatepassHistory) {
      return res.status(constants.NOTFOUND).json({ gatepasses: [] });
    }

    let userGatepass = gatepassHistory.history;
    res.status(constants.SUCCESS).json({ gatepasses: userGatepass });
  } catch (err) {
    if (NODE_ENV !== "production") {
      console.log(err);
    }
    return res
      .status(constants.SERVERERROR)
      .json({ gatepasses: [], message: "Internal server error" });
  }
  }
);

router.get("/menu", verifyToken, async (req, res) => {
  if (NODE_ENV !== "production") {
    console.log("Starting Menu Endpoint");
  }
  try{
    let menuTable = await menuSchema.find({});
    if (NODE_ENV !== "production") {
      console.log("Menu table : ", menuTable);
    }
    return res.status(constants.SUCCESS).json({menuTable});
  }catch(err){
    if (NODE_ENV !== "production") {
      console.log("Some error occured ", err);
    }
    return res
      .status(constants.SERVERERROR)
      .json({ userMessage: "Internal issue please try again.." });
  } 
});

module.exports = router;
