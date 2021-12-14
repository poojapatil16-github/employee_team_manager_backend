const { employee, task } = require("../models");
const db = require("../models");
const Task = db.task;
const Team = db.team;
const Log = db.log;
const Employee = db.employee;

exports.createTask = (req, res) => {
    const logs = req.body.logs;
    if (req.body.code) {
        Task.find({ code: req.body.code }, (err, data) => {
            if(err){
                res.send({ message: "Unable to save Task, please provide valid task details" }, 400);
            }
            
            if(data.length==0) {
                const task = new Task({
                    code: req.body.code,
                    name: req.body.name,
                    description: req.body.description,
                    project: req.body.project,
                    logs: logs
                });
                task.save(task, (err, savedTask) => {
                    if (err) {
                        return res.send(err, 400);
                    } else {
                        return res.send(savedTask, 200);
                    }
                });
            } else{
                return res.send({ message: "Unable to save Task with same task code, please provide correct details" }, 400);
            }
        });
        
    }
};


exports.addLogsToTask = (req, res) => {
    const logs = req.body.logs;
    if (req.body.code) {
        Task.find({ code: req.body.code }, (err, data) => {
            if(err){
                return res.send({ message: "Unable to save Task, please provide valid task details" }, 400);
            }
            
            if(data.length>=0) {
                const task = data[0];
                task.logs.push(...logs);
                task.save(task, (err, savedTask) => {
                    if (err) {
                        return res.send(err, 400);
                    } else {
                        return res.send(savedTask, 200);
                    }
                 });
            } else{
                return res.send({ message: "Unable to save Task with same task code, please provide correct details" }, 400);
            }
        });
        
    }
};

// Retrieve all Task from the database.
exports.findTasks = (req, res) => {
    const code = req.query.code;
    if (code) {
        var condition = { code: code };
    } else {
        var condition = {};
    }
    Task.find(condition)
        .then(data => {
            return res.send(data);
        })
        .catch(err => {
            return res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving employee."
            });
        });
};

// Delete a Employee with the specified name in the request
exports.deleteTasks = (req, res) => {
    const code = req.query.code;
    if (code) {
        var condition = { code: code };
    } else {
        var condition = {};
    }
    task.deleteMany(condition, function (err, data) {
        if (err) {
            return res.send({ message: "Task not found, Please provide Valid Details" }, 400);
        }
        return res.send({
            message: code + " deleted successfully!"
        })
    });
};


