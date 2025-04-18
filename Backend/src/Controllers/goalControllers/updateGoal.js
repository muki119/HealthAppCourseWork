const {goalServices} = require('../../Services')
const {updateGoalService} = goalServices
const updateGoalController = async (req, res,next) => {
    try {
        const userId = req.session.user.id
        const goalId = req.params.goalid
    } catch (error) {
        next(error)
    }
}

module.exports = updateGoalController