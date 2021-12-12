const mongoose = require("mongoose");

const Employee = mongoose.model(
    "employee",
    new mongoose.Schema({
      name: String,
      joinDate: Date,
      skills: [],
      teamCode: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "team"
        }
    })
  );
  
  module.exports = Employee;