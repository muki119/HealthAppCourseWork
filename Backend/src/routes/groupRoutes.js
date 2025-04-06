const groupRoutes = require('express').Router()
const {checkUserParticipationMiddleware} = require('../middleware')
const {createGroupController,
    getUserGroupsController,
    getGroupMessagesController,
    joinGroupController,
    leaveGroupController
} = require('../Controllers')



groupRoutes.get('/groups',getUserGroupsController); // gets all user groups.
groupRoutes.get('/groups/:groupid/messages',checkUserParticipationMiddleware,getGroupMessagesController); // gets messages of a certain group the user is in.
groupRoutes.post('/groups',createGroupController); // create a group
groupRoutes.post('/groups/:groupid/join',joinGroupController); // join a group
groupRoutes.delete('/groups/:groupid/leave',checkUserParticipationMiddleware,leaveGroupController); // leave a group



// getgroups should use the users id from their session data to find all their chats
//Server, upon receiving a request, checks if the session id is present in the request and uses this session id to get information about the client.
module.exports = groupRoutes;