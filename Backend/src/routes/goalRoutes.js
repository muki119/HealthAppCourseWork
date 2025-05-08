const {goalControllers} =  require('../Controllers')
const {getUserGoalsController,
    createGoalController,
    deleteGoalController,
    updateGoalController} = goalControllers
const goalRouter = require('express').Router()
const checkUserLoggedIn = require('../middleware/checkUserLoggedIn')
const {goalValidators} = require('../validators')
const {getGoalsValidator,
    goalIdValidator,
    createGoalDataValidator,
    updateGoalDataValidator} = goalValidators

goalRouter.use(checkUserLoggedIn)
goalRouter.get('/goals',getGoalsValidator,getUserGoalsController) // gets all user goals
goalRouter.post('/goals',createGoalDataValidator,createGoalController) // create a goal
goalRouter.delete('/goals/:goalId',goalIdValidator,deleteGoalController) // delete a goal // check goalId not empty
goalRouter.put('/goals/:goalId',goalIdValidator,updateGoalDataValidator,updateGoalController) // update a goal // check goalId not empty

module.exports = goalRouter