const {groupServices} = require('../../Services')
const {getUserGroupsService} = groupServices

const getUserGroupsController = async (req, res,next) => {
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
