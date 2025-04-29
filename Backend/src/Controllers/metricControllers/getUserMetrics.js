const {metricServices} = require('../../Services')
const {getUserMetricService} = metricServices
const { validationResult } = require('express-validator');

const getUserMetricController = async (req,res,next)=>{
    const {errors} = validationResult(req);
    if (errors.length > 0) {
        return res.status(400).json({"error":errors[0].msg});
    }
    try {
        const userId = req.session.user.id;
        const {datebefore} = req.query;
        const userMetrics = await getUserMetricService(userId,datebefore);
        res.status(200).json(userMetrics);
    } catch (error) {
        next(error)
    }
}

module.exports = getUserMetricController;