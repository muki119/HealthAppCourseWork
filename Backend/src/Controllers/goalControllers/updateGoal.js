const {goalServices} = require('../../Services')
const {updateGoalService} = goalServices
const { validationResult } = require('express-validator');
const updateGoalController = async (req, res,next) => {
    try {
        const {errors} = validationResult(req);
        console.log(errors)
        if (errors.length > 0) {
            return res.status(400).json({"error":errors[0].msg});
        }
        const userId = req.session.user.id
        const {goalId} = req.params
        const goalData = req.body
        await updateGoalService(userId,goalId,goalData);
        return res.status(200).end();
    } catch (error) {
        next(error)
    }
}

module.exports = updateGoalController