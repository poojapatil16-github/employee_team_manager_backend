const mongoose = require("mongoose");

const Log = mongoose.model(
  "Log",
  new mongoose.Schema({
    employee_code: String,
    logedTime:String,
    logedTime:Date
  })
);

module.exports = Log;
