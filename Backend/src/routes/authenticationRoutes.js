const authenticationRoutes = require("express").Router();
const {authControllers} = require("../Controllers");
const {loginController, registerController,logoutController} = authControllers;
const {checkUserLoggedIn} = require('../middleware')

authenticationRoutes.post("/login", loginController);
authenticationRoutes.delete("/logout",checkUserLoggedIn,logoutController);
authenticationRoutes.post("/register", registerController);

module.exports = authenticationRoutes;