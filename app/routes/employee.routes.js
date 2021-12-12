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
    "/api/employee/create",
    controller.createEmployee
  );

  app.get(
    "/api/employee/findAll",
    controller.findAll
  );

  app.get(
    "/api/employee/find/:name",
    controller.findOne
  );

  app.put(
    "/api/employee/update/:name",
    controller.update
  );

  app.delete(
    "/api/employee/deleteAll",
    controller.deleteAll
  );

  app.delete(
    "/api/employee/delete/:name",
    controller.delete
  );
};