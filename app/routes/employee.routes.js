const controller = require("../controllers/employee.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/v1/employee",
    controller.createEmployee
  );

  app.get(
    "/api/v1/employee",
    controller.findEmployees
  );

  app.put(
    "/api/v1/employee",
    controller.updateEmployee
  );

  app.delete(
    "/api/v1/employee",
    controller.deleteEmployee
  );
};