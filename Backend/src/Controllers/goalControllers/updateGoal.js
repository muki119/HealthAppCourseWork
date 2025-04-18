const {goalServices} = require('../../Services')
const {updateGoalService} = goalServices
const updateGoalController = async (req, res,next) => {
    try {
        const userId = req.session.user.id
        const goalId = req.params.goalid
        const goalData = req.body
        await updateGoalService(userId,goalId,goalData);
        return res.status(200).end();
    } catch (error) {
        next(error)
    }
}

module.exports = updateGoalController