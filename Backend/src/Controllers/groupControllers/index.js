const createGroupController = require('./createGroup');
const getUserGroupsController = require('./getUserGroups');
const getGroupMessagesController = require('./getGroupMessages');
const joinGroupController = require('./joinGroup');
const leaveGroupController = require('./leaveGroup');


module.exports = {
    createGroupController,
    leaveGroupController,
    joinGroupController,
    getGroupMessagesController,
    getUserGroupsController
}