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
            type: mongoose.Schema.Types.ObjectId,
            ref: "log",
        }
      ]

    })
  );
  
  module.exports = Task;