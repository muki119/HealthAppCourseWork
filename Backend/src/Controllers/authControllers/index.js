const loginController = require('./Login');
const registerController = require('./Register');
const logoutController = require('./logout');
const getUserController = require('./getUser');
const automaticLoginController = require('./autoLogin');

// src/Controllers/authControllers/index.js

module.exports = {
    loginController,
    registerController,
    logoutController,
    getUserController,
    automaticLoginController
};