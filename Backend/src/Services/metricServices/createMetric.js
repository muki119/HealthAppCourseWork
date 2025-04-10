const {Metric}  = require('../../models')
const database = require('../../config/Database')

const createMetricService = async (userId, metricData= null) => {
    try {
        const { metric_type, metric_value, time_of_day } = metricData; 
        console.log("metricData", metricData)
        const createMetricTransaction =  await database.transaction( async (t)=>{
            const newMetric = Metric.create({
                user_id:userId,
                metric_type:metric_type,
                metric_value:metric_value,
                time_of_day:time_of_day? time_of_day:null
            },{transaction:t})
            return newMetric
        })

        return createMetricTransaction
    } catch (error) {
        console.log(error)
        throw error
    }
}

// createMetricService('123',{metric_type:'Weight', metric_value: 70, time_of_day: 'BREAKFAST'})

// there should be a time of day collumn in the the metric table that should have the contraint of only being for certain metric types


module.exports = createMetricService;