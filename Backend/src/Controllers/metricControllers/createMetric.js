const {metricServices} = require('../../Services')
const {createMetricService} = metricServices

const  createMetricController  = async (req,res,next)=>{
    const userId = req.session.user.id;
    const {metric_type,metric_value,time_of_day} = req.body; // check type in enum , check value as number
    try { 

        const metricData = { metric_type, metric_value, time_of_day };
        const newMetric = await createMetricService(userId, metricData);
        res.status(201).json(newMetric);
    } catch (error) {
        next(error)
    }
}

module.exports = createMetricController