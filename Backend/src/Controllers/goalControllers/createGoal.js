const {goalServices} = require('../../Services')
const {createGoalService} = goalServices
const { validationResult } = require('express-validator');

const createGoalController = async (req, res,next) => {
    try {
        const {errors} = validationResult(req);
        console.log('errors',errors)
        if (errors.length > 0) {
            return res.status(400).json({"error":errors[0].msg});
        }
        const userId = req.session.user.id
        const goalData = req.body      
        const newGoal = await createGoalService(userId, goalData);
        res.status(201).json(newGoal);
    } catch (error) {
        next(error)
    }
}

module.exports = createGoalController