const config = require("../config/auth.config");
const { employee } = require("../models");
const db = require("../models");
const Employee = db.employee;
const Team = db.team;

exports.createEmployee = (req, res) => {
    const employee = new Employee({
        name: req.body.name,
        joinDate: req.body.joinDate,
        teamCode: req.body.teamCode,
        skills: req.body.skills
    });

    if (req.body.teamCode) {
        Team.find(
            {
                name: { $in: req.body.teamCode }
            },
            (err, team) => {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }

                employee.teamCode = team.map(t => t._id);
                employee.save(err => {
                    if (err) {
                        res.status(500).send({ message: err });
                        return;
                    }

                    res.send({ message: "Employee save successfully!" });
                });
            }
        );
    }
};


// Retrieve all Employee from the database.
exports.findAll = (req, res) => {
    const name = req.query.name;
    var condition = name ? { name: { $regex: new RegExp(name), $options: "i" } } : {};

    Employee.find(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving employee."
            });
        });
};

// Find a single Tutorial with an name
exports.findOne = (req, res) => {
    const name = req.params.name;

    var condition = name ? { name: { $regex: new RegExp(name), $options: "i" } } : {};

    employee.findOne(condition, (err, data) =>{
        if(err){
            res.send({
                message:"Employee not found!"
            },400);
        }
        res.send(data,200);
    })
};

// Update a Team by the name in the request
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const name = req.query.name;
    var condition = name ? { name: { $regex: new RegExp(name), $options: "i" } } : {};
    var newvalues = req.body;
    employee.updateOne(condition, newvalues, function (err, data) {
        if (err) {
            throw err;
        }
        res.send(data);
    });
};

// Delete all Employee from the database.
exports.deleteAll = (req, res) => {
    Employee.deleteMany({})
      .then(data => {
        res.send({
          message: `${data.deletedCount} Employee were deleted successfully!`
        });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all employee."
        });
      });
  };

  // Delete a Employee with the specified name in the request
exports.delete = (req, res) => {
    const name = req.params.name;
  
    var condition = name ? { name: { $regex: new RegExp(name), $options: "i" } } : {};

    employee.deleteOne(condition, function(err, data) {
        if (err) {
            throw err
        };
        res.send({
            message: "Deleted successfully!"
        })
      });
  };
  
  