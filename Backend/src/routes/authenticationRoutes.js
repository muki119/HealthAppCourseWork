const authenticationRoutes = require("express").Router();
const {LoginController, RegisterController,logoutController} = require("../Controllers");

authenticationRoutes.post("/login", LoginController);
authenticationRoutes.delete("/logout",logoutController);
authenticationRoutes.post("/register", RegisterController);

module.exports = authenticationRoutes;