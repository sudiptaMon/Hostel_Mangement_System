const express = require("express");
const router = express.Router();
const user = require("../schema/user");
const gatepass = require("../schema/gatepass");
const menuSchema = require("../schema/menuSchema");

const checkUser = require("../common/checkuser");
const constants = require("../constants/constants");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const cookieParser = require("cookie-parser");
const date = new Date();

router.use(cookieParser());

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  let response = await user.findOne({ username });

  if (!response) {
    return res.json({ status: false });
  }
  if (!bcrypt.compareSync(password, response.password)) {
    return res.json({ status: false });
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

  res.status(constants.SUCCESS).json({ response, status: true });
});

router.post("/newgatepass", async (req, res) => {
  let { formData } = req.body;
  let todayDate =
    date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
  // console.log(formData);

  try {
    
    if (!checkUser(req)) {
      return res.status(constants.UNAUTHORISED).json({ added: false });
    }

    let user = jwt.verify(req.cookies.isUser, process.env.SECRET_KEY)._doc;
    if (!user) {
      return res.status(constants.UNAUTHORISED).json({ added: false });
    }
    let gatepassHistory = await gatepass.findOne({ userid: user._id });
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
    await gatepass.updateOne({ userid: user._id }, { history: userGatepass });
    res.status(constants.SUCCESS).json({ added: true });
  } catch (err) {
    console.log(err);
  }
});

router.get("/gatepass-history", async (req, res) => {
  try {
    
    if (!checkUser(req)) {
      return res.status(constants.UNAUTHORISED);
    }
    
    let user = jwt.verify(req.cookies.isUser, process.env.SECRET_KEY)._doc;
    if (!user) {
      return res.status(constants.UNAUTHORISED);
    }
    let gatepassHistory = await gatepass.findOne({ userid: user._id });
    if (!gatepassHistory) {
      return res.status(constants.NOTFOUND);
    }

    let userGatepass = gatepassHistory.history;
    res.status(constants.SUCCESS).json({ gatepasses: userGatepass });
  } catch (err) {
    console.log(err);
  }
});

router.get("/menu", async (req, res) => {

  console.log("Stating Menu Endpoint");
  try{

    if(!checkUser(req)){
      return res.status(constants.UNAUTHORISED);
    }
    let menuTable = await menuSchema.find({});
    console.log("Menu table : " ,menuTable);
    return res.status(constants.SUCCESS).json({menuTable});
  }catch(err){
    console.log("Some error occured " ,err);
    return res.status(constants.SERVERERROR).json({userMessage : "Internl issue please try again.."})
  } 
});

module.exports = router;
