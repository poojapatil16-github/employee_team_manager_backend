const controller = require("../controllers/team.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/team/create",
    controller.create
  );

  app.get(
    "/api/team/findAll",
    controller.findAll
  );

  app.put(
    "/api/team/update/:name",
    controller.update
  );

  app.delete(
    "/api/team/deleteAll",
    controller.deleteAll
  );

  app.delete(
    "/api/team/delete/:name",
    controller.delete
  );
};