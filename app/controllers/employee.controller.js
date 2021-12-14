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

// Update a Employee by the name in the request
exports.updateEmployee = (req, res) => {
    const name = req.body.name;
    if (!name) {
        return res.status(400).send({
            message: "Employee name cannot be empty!"
        });
    }

    var condition = { name: name };
    employee.updateOne(condition, req.body, function (err, data) {
        if (err) {
            res.send({ message: "Employee not found, Please provide Valid Details" }, 400);
        }
        res.send(data, 200);
    });
};

// Retrieve all Employee from the database.
exports.findEmployees = (req, res) => {
    const name = req.query.name;
    if(name){
        var condition = { name: name };
    }else{
        var condition = name ? { name: { $regex: new RegExp(name), $options: "i" } } : {};
    }
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

// Delete a Employee with the specified name in the request
exports.deleteEmployee = (req, res) => {
    console.log("delete ", req.params.name);
    const name = req.query.name;
    if(name){
        var condition = { name: name };
    }else{
        var condition = {};
    }
    employee.deleteMany(condition)
    .then(data => {
      res.send({
        message: `${data.deletedCount} Employee deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all teams."
      });
    });
};


