const authenticationRoutes = require("express").Router();
const {authControllers} = require("../Controllers");
const {loginController, registerController,logoutController} = authControllers;

authenticationRoutes.post("/login", loginController);
authenticationRoutes.delete("/logout",logoutController);
authenticationRoutes.post("/register", registerController);

module.exports = authenticationRoutes;