const controller = require("../controllers/task.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/v1/task/",
    controller.createTask
  );
  
  app.put(
    "/api/v1/task/",
    controller.addLogsToTask
  );
  
  app.get(
    "/api/v1/task/",
    controller.findTasks
  );


  app.delete(
    "/api/v1/task/",
    controller.deleteTasks
  );

};