const {metricServices} = require('../../Services')
const {getUserMetricService} = metricServices

const getUserMetricController = async (req,res,next)=>{
    try {
        const userId = req.session.user.id;
        const {datefrom} = req.query;
        const userMetrics = await getUserMetricService(userId,datefrom);
        res.status(200).json(userMetrics);
    } catch (error) {
        next(error)
    }
}

module.exports = getUserMetricController;