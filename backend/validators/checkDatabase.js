const express = require("express");
const admin = require("../schema/admin");
const user = require("../schema/user");

const isUserExists = async (username) => {
  const result = await user.findOne({ username });
  return result != null ;
};

module.exports = { isUserExists };
