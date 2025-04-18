const {Metric}  = require('../../models')
const database = require('../../config/Database')

const updateMetricService = async (metricId,newUserData) => {
    try {
        const updateMetricTransaction =  await database.transaction( async (t)=>{
            const updatedMetric = await Metric.update({
                metric_type: newUserData.metric_type,
                metric_value: newUserData.metric_value,
                time_of_day: newUserData.time_of_day
            },{
                where:{
                    id:metricId,
                },
                transaction:t
            })
            const affectedRows = updatedMetric[0]
            if (!affectedRows) {
                throw new Error('Metric not found');
            }
            return updatedMetric
        })

        return updateMetricTransaction;
    } catch (error) {
        throw error
    }
}

module.exports = updateMetricService;