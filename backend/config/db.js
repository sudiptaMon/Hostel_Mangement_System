const mongoose = require("mongoose");
const { DB_URI, NODE_ENV } = require("./env");

let connectPromise = null;

const connectDB = async () => {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  if (!connectPromise) {
    connectPromise = mongoose.connect(DB_URI).then((connection) => {
      if (NODE_ENV !== "production") {
        console.log("DB Connected");
      }
      return connection;
    });
  }

  return connectPromise;
};

module.exports = connectDB;
