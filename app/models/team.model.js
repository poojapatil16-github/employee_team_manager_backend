const mongoose = require("mongoose");

const Team = mongoose.model(
    "Team",
    new mongoose.Schema({
      name: String,
      startDate: Date,
      endDate: Date,
    })
  );
  
  module.exports = Team;