const express = require("express");
const router = express.Router();
const user = require("../schema/user");
const gatepass = require("../schema/gatepass");
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

  res.json({ response, status: true });
});

router.post("/newgatepass", async (req, res) => {
  let { formData } = req.body;
  let todayDate =
    date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
  // console.log(formData);

  try {
    let token = req.cookies.isUser;
    // console.log(token);
    if (!token) {
      return res.status(404).json({ added: false });
    }

    let user = jwt.verify(token, process.env.SECRET_KEY)._doc;
    if (!user) {
      return res.status(404).json({ added: false });
    }
    let gatepassHistory = await gatepass.findOne({ userid: user._id });
    if (!gatepassHistory) {
      return res.status(404).json({ added: false });
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
    res.status(200).json({ added: true });
  } catch (err) {
    console.log(err);
  }
});

router.get("/gatepass-history", async (req, res) => {
  try {
    let token = req.cookies.isUser;
    if (!token) {
      return res.status(404);
    }

    let user = jwt.verify(token, process.env.SECRET_KEY)._doc;
    if (!user) {
      return res.status(404);
    }
    let gatepassHistory = await gatepass.findOne({ userid: user._id });
    if (!gatepassHistory) {
      return res.status(404);
    }

    let userGatepass = gatepassHistory.history;
    res.status(200).json({gatepasses:userGatepass});
  } catch (err) {
    console.log(err);
  }
});

router.get("/manu",async(req,res)=>{
  
})

module.exports = router;
