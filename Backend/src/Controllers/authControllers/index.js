const loginController = require('./Login');
const registerController = require('./Register');
const logoutController = require('./Logout');
const getUserController = require('./getUser');
const checkUsernameController = require('./checkUsername');

// src/Controllers/authControllers/index.js

module.exports = {
    loginController,
    registerController,
    logoutController,
    getUserController,
    checkUsernameController
};