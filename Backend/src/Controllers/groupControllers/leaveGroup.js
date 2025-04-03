const {leaveGroupService} = require('../../Services');
const leaveGroupController = async (req, res) => {
    const {groupId} = req.params;
    const userId = req.session.user.id;
}
module.exports = leaveGroupController;