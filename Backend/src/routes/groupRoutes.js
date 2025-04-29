const groupRoutes = require('express').Router()
const {checkUserParticipationMiddleware,checkUserLoggedIn} = require('../middleware')
const {groupControllers} = require('../Controllers')
const {getUserGroupsController,
    createGroupController,
    getGroupMessagesController,
    joinGroupController,
    leaveGroupController
} = groupControllers;

const {groupValidators} = require('../validators')
const {groupIdValidator,createGroupDataValidator,getGroupMessagesValidator} = groupValidators;

groupRoutes.use(checkUserLoggedIn); // check if user is logged in before accessing any routes
groupRoutes.get('/groups',getUserGroupsController); // gets all user groups.
groupRoutes.get('/groups/:groupid/messages',groupIdValidator,checkUserParticipationMiddleware,getGroupMessagesValidator, getGroupMessagesController); // gets messages of a certain group the user is in.
groupRoutes.post('/groups',createGroupDataValidator,createGroupController); // create a group
groupRoutes.get('/groups/:groupid/join',groupIdValidator,joinGroupController); // join a group
groupRoutes.delete('/groups/:groupid/leave',groupIdValidator,checkUserParticipationMiddleware,leaveGroupController); // leave a group



// getgroups should use the users id from their session data to find all their chats
//Server, upon receiving a request, checks if the session id is present in the request and uses this session id to get information about the client.
module.exports = groupRoutes;