const {goalServices} = require('../../Services')
const {getUserGoalsService} = goalServices

const getUserGoalsController = async (req, res,next) => {
    try {
        const userId = req.session.user.id
        const {datebefore} = req.query
        const userGoals = await getUserGoalsService(userId,datebefore);
        res.status(200).json(userGoals);
    } catch (error) {
        next(error)
    }
}


module.exports = getUserGoalsController