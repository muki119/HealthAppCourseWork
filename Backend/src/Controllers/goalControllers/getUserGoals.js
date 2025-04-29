const {goalServices} = require('../../Services')
const {getUserGoalsService} = goalServices
const { validationResult } = require('express-validator');
const getUserGoalsController = async (req, res,next) => {
    try {
        const {errors} = validationResult(req);
        if (errors.length > 0) {
            return res.status(400).json({"error":errors[0].msg});
        }
        const userId = req.session.user.id
        const {datebefore} = req.query
        const userGoals = await getUserGoalsService(userId,datebefore);
        res.status(200).json(userGoals);
    } catch (error) {
        next(error)
    }
}


module.exports = getUserGoalsController