const {goalControllers} =  require('../Controllers')
const {getUserGoalsController,
    createGoalController,
    deleteGoalController,
    updateGoalController} = goalControllers
const goalRouter = require('express').Router()
const checkUserLoggedIn = require('../middleware/checkUserLoggedIn')

goalRouter.use(checkUserLoggedIn)
goalRouter.get('/goals',getUserGoalsController) // gets all user goals
goalRouter.post('/goals',createGoalController) // create a goal
goalRouter.delete('/goals/:goalId',deleteGoalController) // delete a goal
goalRouter.put('/goals/:goalId',updateGoalController) // update a goal

module.exports = goalRouter