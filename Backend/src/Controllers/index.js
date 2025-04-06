const LoginController = require('./authControllers/Login');
const logoutController = require('./authControllers/Logout')
const RegisterController = require('./authControllers/Register');
const createGroupController = require('./groupControllers/createGroup');
const getUserGroupsController = require('./groupControllers/getUserGroups');
const getGroupMessagesController = require('./groupControllers/getGroupMessages');
const joinGroupController = require('./groupControllers/joinGroup');
const leaveGroupController = require('./groupControllers/leaveGroup');
module.exports = {
    LoginController,
    RegisterController,
    createGroupController,
    getUserGroupsController,
    getGroupMessagesController,
    joinGroupController,
    leaveGroupController,
    logoutController

};