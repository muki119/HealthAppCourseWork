const {createGroupService} = require('../../Services')
const createGroupController = async (req, res) => {
    const userId = req.session.user.id;
    const {groupName} = req.body;
}
module.exports = createGroupController;