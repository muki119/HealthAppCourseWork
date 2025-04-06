const loginService = require('./authServices/Login')
const logoutService = require('./authServices/Logout')
const registerService = require('./authServices/Register')
const createGroupService = require('./groupServices/createGroup')
const getUserGroupsService = require('./groupServices/getUserGroups')
const getGroupMessagesService = require('./groupServices/getGroupMessages')
const joinGroupService = require('./groupServices/joinGroup')
const leaveGroupService = require('./groupServices/leaveGroup')

module.exports = {
    loginService,
    registerService
    ,createGroupService,
    getUserGroupsService,
    getGroupMessagesService,
    joinGroupService,
    leaveGroupService,
    logoutService
}