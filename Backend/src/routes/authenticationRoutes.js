const authenticationRoutes = require("express").Router();
const {LoginController, RegisterController} = require("../Controllers");

authenticationRoutes.post("/login", LoginController);
authenticationRoutes.post("/register", RegisterController);

module.exports = authenticationRoutes;