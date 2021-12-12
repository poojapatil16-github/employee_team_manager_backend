const db = require("../models");
const Team = require("../models/team.model");
// const Employee = db.team;

// Create and Save a new Tutorial
exports.create = (req, res) => {
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
exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { $regex: new RegExp(name), $options: "i" } } : {};

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
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const name = req.params.name;

  Team.findByNameAndUpdate(name, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Team with name=${name}. Maybe Team was not found!`
        });
      } else res.send({ message: "Team was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Team with name=" + name
      });
    });
};

// Delete a Team with the specified name in the request
exports.delete = (req, res) => {
  const name = req.params.name;

  Team.findByIdAndRemove(name, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Team with name=${name}. Maybe Team was not found!`
        });
      } else {
        res.send({
          message: "Team was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Team with name=" + name
      });
    });
};

// Delete all Teams from the database.
exports.deleteAll = (req, res) => {
  Team.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Teams were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all teams."
      });
    });
};
