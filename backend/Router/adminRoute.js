const express = require("express");
const router = express.Router();
const admin = require("../schema/admin");
const user = require("../schema/user");
const gatepass = require("../schema/gatepass");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const date = new Date();
const cookieParser = require("cookie-parser");
router.use(bodyParser.json());
router.use(cookieParser());

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  let response = await admin.findOne({ username });

  if (!response) {
    return res.send({ status: false });
  }
  if (!bcrypt.compareSync(password, response.password)) {
    return res.send({ status: false });
  }
  response.password = undefined;
  let token = jwt.sign({ ...response }, process.env.SECRET_KEY, {
    expiresIn: "24h",
  });
  res.cookie("isUser", token, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
    sameSite: "none",
    secure: true,
  });

  res.send({ response, status: true });
});

router.post("/createuser", async (req, res) => {
  try {
    const { name, email, password, username, room, batch } = req.body;
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
    res.status(200).json({ added: true });
  } catch (e) {
    console.log(e);
    res.status(500).json({ added: false });
  }
});

router.get("/gatepass", async (req, res) => {
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
});

router.post("/approvegatepass", async (req, res) => {
  let { userid, id, approved, comment } = req.body;
  try {
    let token = req.cookies.isUser;
    if (!token) {
      return res.status(404).json({ done: false });
    }
    let admin = await jwt.verify(token, process.env.SECRET_KEY)._doc;
    let gatepassEntity = await gatepass.findOne({ userid: userid });
    if (!gatepassEntity) {
      res.status(404).json({ done: false });
    }
    let gatepassOfUser = gatepassEntity.history;

    gatepassOfUser.forEach((ele) => {
      if (ele.id === id && approved) {
        ele.status = "APPROVED";
        ele.permitBy = admin.name;
        ele.comment = comment;
      }
    });
    await gatepass.updateOne({ userid: userid }, { history: gatepassOfUser });
    res.status(200).json({ done: true });
  } catch (err) {
    console.log(err);
  }
});

router.post("/rejectgatepass", async (req, res) => {
  let { userid, id, approved, comment } = req.body;
  try {
    let token = req.cookies.isUser;
    if (!token) {
      return res.status(404).json({ done: false });
    }
    let admin = await jwt.verify(token, process.env.SECRET_KEY)._doc;
    let gatepassEntity = await gatepass.findOne({ userid: userid });
    if (!gatepassEntity) {
      res.status(404).json({ done: false });
    }
    let gatepassOfUser = gatepassEntity.history;

    gatepassOfUser.forEach((ele) => {
      if (ele.id === id && !approved) {
        ele.status = "REJECTED";
        ele.permitBy = admin.name;
        ele.comment = comment;
      }
    });
    await gatepass.updateOne({ userid: userid }, { history: gatepassOfUser });
    res.status(200).json({ done: true });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
