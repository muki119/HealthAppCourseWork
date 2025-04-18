const {goalServices} = require('../../Services')
const {getUserGoalsService} = goalServices

const getUserGoalsController = async (req, res,next) => {
    try {
        const userId = req.session.user.id
        
    } catch (error) {
        next(error)
    }
}


module.exports = getUserGoalsController