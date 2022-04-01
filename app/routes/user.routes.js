const { authJWT } = require("../middleware");
const controller = require("../controllers/user.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.get("/test/all", controller.allAccess);

  app.get(
    "/test/user",
    [authJWT.verifyToken],
    controller.userBoard
  );

  

  app.get(
    "/test/admin",
    [authJWT.verifyToken, authJWT.isAdmin],
    controller.adminBoard
  );
 
  

  app.post("/user/cancel", controller.cancel);
  app.post("/user/editEmail",  controller.editEmail);
  app.post("/user/editPassword",  controller.editPassword);
  
};