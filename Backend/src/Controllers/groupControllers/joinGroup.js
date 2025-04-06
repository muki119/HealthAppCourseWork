const {checkUserParticipationHelper} = require('../../helpers/')
const {joinGroupService} = require('../../Services');
const joinGroupController = async (req, res) => {
    const {groupId} = req.params;
    const userId = req.session.user.id;
    try {
            const isParticipant = await checkUserParticipationHelper(userId,groupId);
            if(isParticipant){
                return res.status(400).json({error:'User is already in the group.'}) // send that the user is already in the chat
            }
            const joinedGroup = await joinGroupService(userId,groupId);
            res.json(joinedGroup)
        }
    catch (error) { // logged
        console.log('Error in joinGroupController',error)
        next(error)
    }
}
module.exports = joinGroupController;