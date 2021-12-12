const mongoose = require("mongoose");

const Log = mongoose.model(
  "Log",
  new mongoose.Schema({
    employee_code:  {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee"
      },
    logedTime:Number,
    logedTime:Date
  })
);

module.exports = Log;
