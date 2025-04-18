const {groupControllers} =  require('../Controllers')
const {getUserGoalsController,
    createGoalController,
    deleteGoalController,
    updateGoalController} = groupControllers
const goalRouter = require('express').Router()
const checkUserLoggedIn = require('../middleware/checkUserLoggedIn')

goalRouter.use(checkUserLoggedIn)
goalRouter.get('/goals',getUserGoalsController) // gets all user goals
goalRouter.post('/goals',createGoalController) // create a goal
goalRouter.delete('/goals/:goalid',deleteGoalController) // delete a goal
goalRouter.put('/goals/:goalid',updateGoalController) // update a goal