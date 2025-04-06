const {leaveGroupService} = require('../../Services');
const leaveGroupController = async (req, res) => {
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