const {groupServices} = require('../../Services')
const {getUserGroupsService} = groupServices
const { validationResult } = require('express-validator');

const getUserGroupsController = async (req, res,next) => {
    try {
        const {errors} = validationResult(req);
        if (errors.length > 0) {
            return res.status(400).json({"error":errors[0].msg});
        }
        const userId = req.session.user.id;
        const userGroups = await getUserGroupsService(userId)
        res.json(userGroups)
    } catch (error) {
        console.log('Error in getUserGroupsController ',error)
        next(error)
    }
}
module.exports = getUserGroupsController;
