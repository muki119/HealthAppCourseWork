const {goalServices} = require('../../Services')
const {createGoalService} = goalServices

const createGoalController = async (req, res,next) => {
    try {
        const userId = req.session.user.id
            
    } catch (error) {
        next(error)
    }
}

module.exports = createGoalController