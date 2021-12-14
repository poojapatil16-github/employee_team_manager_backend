const mongoose = require("mongoose");

const Task = mongoose.model(
    "Task",
    new mongoose.Schema({
      code: String,
      name: String,
      description: String,
      project: String,
      logs: [
        {
            employee_code: String,
            logedTime:String,
            logStartDate:Date
        }
      ]

    })
  );
  
  module.exports = Task;