const authenticationRoutes = require("express").Router();
const {authControllers} = require("../Controllers");
const {loginController, getUserController, registerController, logoutController, automaticLoginController} = authControllers;
const {checkUserLoggedIn} = require('../middleware')
const {authValidators} = require("../validators");
const {loginValidator, registerValidator} = authValidators;

authenticationRoutes.post("/login",loginValidator, loginController); // check if username is not empty and password is not empty
authenticationRoutes.get("/user",checkUserLoggedIn,getUserController); // check if user is logged in
authenticationRoutes.delete("/logout",checkUserLoggedIn,logoutController);
authenticationRoutes.post("/register", registerValidator, registerController); // check username is valid and password is valid (no spaces and no special characters) 
authenticationRoutes.get("/login",checkUserLoggedIn,automaticLoginController); // check if user is logged in on first load
module.exports = authenticationRoutes;