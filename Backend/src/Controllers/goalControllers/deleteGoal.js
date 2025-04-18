const {goalServices} = require('../../Services')
const {deleteGoalService} = goalServices
const deleteGoalController= async (req, res,next) => {
    try {
        const userId = req.session.user.id
        const {goalId} = req.params
        await deleteGoalService(userId,goalId);
        res.status(204).end()
    } catch (error) {
        next(error)
    }
}

module.exports = deleteGoalController