const {getUserGroupsService} = require('../../Services');
const getUserGroupsController = async (req, res) => {
    const {groupId} = req.params;
    const userId = req.session.user.id;
}
module.exports = getUserGroupsController;
