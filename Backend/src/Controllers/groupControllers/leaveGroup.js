const {groupServices} = require('../../Services')
const {leaveGroupService} = groupServices
const { validationResult } = require('express-validator');

const leaveGroupController = async (req, res,next) => {
    const {errors} = validationResult(req);
    if (errors.length > 0) {
        return res.status(400).json({"error":errors[0].msg});
    }
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