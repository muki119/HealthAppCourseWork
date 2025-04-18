const {goalServices} = require('../../Services')
const {createGoalService} = goalServices

const createGoalController = async (req, res,next) => {
    try {
        const userId = req.session.user.id
        const goalData = req.body      
        const newGoal = await createGoalService(userId, goalData);
        res.status(201).json(newGoal);
    } catch (error) {
        next(error)
    }
}

module.exports = createGoalController