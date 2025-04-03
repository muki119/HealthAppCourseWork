const groupRoutes = require('express').Router()


groupRoutes.get('/groups',) // gets all user groups.
groupRoutes.get('/groups/:groupid/messages') // gets messages of a certain group the user is in.
groupRoutes.post('/groups') // create a group
groupRoutes.post('/groups/:groupId/join') // join a group



// getgroups should use the users id from their session data to find all their chats
//Server, upon receiving a request, checks if the session id is present in the request and uses this session id to get information about the client.
module.exports = groupRoutes;