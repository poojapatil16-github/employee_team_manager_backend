const { team } = require("../models");
const Team = require("../models/team.model");
// const Employee = db.team;

// Create and Save a new Tutorial
exports.createTeam = (req, res) => {
  // Create a Team
  const team = new Team({
    name: req.body.name,
    startDate: req.body.startDate,
    endDate: req.body.endDate
  });
  // Save Team in the database
  team
    .save(team)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Team."
      });
    });
};


// Retrieve all Team from the database.
exports.findTeams = (req, res) => {
  const name = req.query.name;
  if(name){
      var condition = { name: name };
  }else{
      var condition = name ? { name: { $regex: new RegExp(name), $options: "i" } } : {};
  }
  Team.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving team."
      });
    });
};



// Update a Team by the name in the request
exports.updateTeam = (req, res) => {
  console.log("Inside update team",req.body.name);
  const name = req.body.name;
  if (!name) {
      return res.status(400).send({
          message: "Team name cannot be empty!"
      });
  }

  var condition = { name: name };
  team.updateOne(condition, req.body, function (err, data) {
      if (err) {
          res.send({ message: "Team not found, Please provide Valid team details to update" }, 400);
      }
      res.send({message:name+"  Team updated successfully"}, 200);
  });
};

// Delete a Team with the specified name in the request
exports.deleteTeam = (req, res) => {
  const name = req.query.name;
  if(name){
      var condition = { name: name };
  }else{
      var condition = {};
  }
  team.deleteMany(condition)
  .then(data => {
    res.send({
      message: `${data.deletedCount} Teams deleted successfully!`
    });
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while removing all teams."
    });
  });
};