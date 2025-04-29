const {goalServices} = require('../../Services')
const {deleteGoalService} = goalServices
const { validationResult } = require('express-validator');
const deleteGoalController= async (req, res,next) => {
    try {
        const {errors} = validationResult(req);
        console.log(errors)
        if (errors.length > 0) {
            return res.status(400).json({"error":errors[0].msg});
        }
        const userId = req.session.user.id
        const {goalId} = req.params
        await deleteGoalService(userId,goalId);
        res.status(204).end()
    } catch (error) {
        next(error)
    }
}

module.exports = deleteGoalController