const {getUserGroupsService} = require('../../Services');
const getUserGroupsController = async (req, res) => {
    try {
        const userId = req.session.user.id;
        const userGroups = await getUserGroupsService(userId)
        res.json(userGroups)
    } catch (error) {
        console.log('Error in getUserGroupsController ',error)
        next(error)
    }
}
module.exports = getUserGroupsController;
