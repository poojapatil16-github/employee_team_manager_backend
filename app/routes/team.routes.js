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
    "/api/v1/team/",
    controller.createTeam
  );

  app.get(
    "/api/v1/team/",
    controller.findTeams
  );

  app.put(
    "/api/v1/team/",
    controller.updateTeam
  );

  app.delete(
    "/api/v1/team/",
    controller.deleteTeam
  );
};