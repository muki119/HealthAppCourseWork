const {joinGroupService} = require('../../Services');
const joinGroupController = async (req, res) => {
    const {groupId} = req.params;
    const userId = req.session.user.id;
}
module.exports = joinGroupController;