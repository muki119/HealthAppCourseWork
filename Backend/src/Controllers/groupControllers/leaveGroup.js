const {groupServices} = require('../../Services')
const {leaveGroupService} = groupServices

const leaveGroupController = async (req, res,next) => {
    const {groupid} = req.params;
    const userId = req.session.user.id;
    try {
        await leaveGroupService(userId,groupid);
        res.status(200).end()
    } catch (error) {
        console.log('Error in leaveGroupController',error)
        next(error)
    }
}
module.exports = leaveGroupController;