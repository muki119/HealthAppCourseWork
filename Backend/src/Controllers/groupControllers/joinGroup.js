const {checkUserParticipationHelper} = require('../../helpers/')
const {groupServices} = require('../../Services')
const {joinGroupService} = groupServices
const { validationResult } = require('express-validator');

const joinGroupController = async (req, res,next) => {
    const {errors} = validationResult(req);
    if (errors.length > 0) {
        return res.status(400).json({"error":errors[0].msg});
    }
    const {groupid} = req.params;
    const userId = req.session.user.id;
    try {

            const isParticipant = await checkUserParticipationHelper(userId,groupid);
            if(isParticipant){
                return res.status(400).json({error:'User is already in the group.'}) // send that the user is already in the chat
            }
            const joinedGroup = await joinGroupService(userId,groupid);
            res.json(joinedGroup)
        }
    catch (error) { // logged
        console.log('Error in joinGroupController',error)
        next(error)
    }
}
module.exports = joinGroupController;