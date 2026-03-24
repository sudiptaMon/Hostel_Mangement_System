const express = require("express");
const router = express.Router();
const admin = require("../schema/admin");
const user = require("../schema/user");
const gatepass = require("../schema/gatepass");
const checkDatabase = require("../validators/checkDatabase");
const constants = require("../constants/constants");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const date = new Date();
const cookieParser = require("cookie-parser");
const verifyToken = require("../middleware/verifyToken");
const requireRole = require("../middleware/requireRole");
const validateRequest = require("../middleware/validateRequest");
const {
  adminLoginValidation,
  createUserValidation,
  gatepassActionValidation,
} = require("../validators/adminValidators");
const { SECRET_KEY, NODE_ENV } = require("../config/env");
const { COOKIE_NAME, cookieOptions } = require("../config/cookie");
router.use(bodyParser.json());
router.use(cookieParser());

router.post("/login", adminLoginValidation, validateRequest, async (req, res) => {
  const { username, password } = req.body;
  let response = await admin.findOne({ username });

  if (!response) {
    return res.send({ status: false });
  }
  if (!bcrypt.compareSync(password, response.password)) {
    return res.send({ status: false });
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

  res.send({ response, status: true });
});

router.post(
  "/createuser",
  verifyToken,
  requireRole("Admin"),
  createUserValidation,
  validateRequest,
  async (req, res) => {
  try {
    const { name, email, password, username, room, batch } = req.body;

    const isUserExists = await checkDatabase.isUserExists(username);

    if (isUserExists) {
      return res.status(constants.SUCCESS).json({
        added: false,
        username,
        message: "Already existed user.",
      });
    }

    let createdUser = await user.create({
      name,
      username,
      password: bcrypt.hashSync(password, 10),
      email,
      room,
      batch,
      role: "Student",
    });
    await gatepass.create({
      userid: createdUser._id,
      history: [],
      name,
      username,
    });
    res
      .status(200)
      .json({ added: true, username, massage: "Is added to the database." });
  } catch (e) {
    console.log(e);
    res
      .status(constants.SERVERERROR)
      .json({ added: false, message: "Can't be added. Something went wrong" });
  }
  }
);

router.get("/gatepass", verifyToken, requireRole("Admin"), async (req, res) => {
  try {
    let allgatepass = await gatepass.find({});
    let todayDate =
      date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
    let gatepassHistory = [];
    allgatepass.forEach((ele) => {
      let temp = ele.history.filter((obj) => {
        return obj.todayDate === todayDate && obj.status === "PENDING";
      });

      temp.forEach((obj) => {
        obj.userid = ele.userid;
        obj.username = ele.username;
        obj.name = ele.name;
      });
      gatepassHistory = [...gatepassHistory, ...temp];
    });
    res.json(gatepassHistory);
  } catch (err) {
    if (NODE_ENV !== "production") {
      console.log(err);
    }
    return res
      .status(constants.SERVERERROR)
      .json({ done: false, message: "Internal server error" });
  }
});

router.post(
  "/approvegatepass",
  verifyToken,
  requireRole("Admin"),
  gatepassActionValidation,
  validateRequest,
  async (req, res) => {
  let { userid, id, approved, comment } = req.body;
  try {
    let gatepassEntity = await gatepass.findOne({ userid: userid });
    if (!gatepassEntity) {
      return res.status(404).json({ done: false });
    }
    let gatepassOfUser = gatepassEntity.history;

    gatepassOfUser.forEach((ele) => {
      if (ele.id === id && approved) {
        ele.status = "APPROVED";
        ele.permitBy = req.user.name;
        ele.comment = comment;
      }
    });
    await gatepass.updateOne({ userid: userid }, { history: gatepassOfUser });
    res.status(constants.SUCCESS).json({ done: true });
  } catch (err) {
    if (NODE_ENV !== "production") {
      console.log(err);
    }
    return res
      .status(constants.SERVERERROR)
      .json({ done: false, message: "Internal server error" });
  }
  }
);

router.post(
  "/rejectgatepass",
  verifyToken,
  requireRole("Admin"),
  gatepassActionValidation,
  validateRequest,
  async (req, res) => {
  let { userid, id, approved, comment } = req.body;
  try {
    let gatepassEntity = await gatepass.findOne({ userid: userid });
    if (!gatepassEntity) {
      return res.status(constants.NOTFOUND).json({ done: false });
    }
    let gatepassOfUser = gatepassEntity.history;

    gatepassOfUser.forEach((ele) => {
      if (ele.id === id && !approved) {
        ele.status = "REJECTED";
        ele.permitBy = req.user.name;
        ele.comment = comment;
      }
    });
    await gatepass.updateOne({ userid: userid }, { history: gatepassOfUser });
    res.status(constants.SUCCESS).json({ done: true });
  } catch (err) {
    if (NODE_ENV !== "production") {
      console.log(err);
    }
    return res
      .status(constants.SERVERERROR)
      .json({ done: false, message: "Internal server error" });
  }
  }
);

module.exports = router;
