const {Metric}  = require('../../models')
const database = require('../../config/Database')

const deleteMetricService = async (metricId,userId) => {
    try {
        await database.transaction(async (t)=>{
            await Metric.destroy({
                where:{
                    id:metricId,
                    user_id: userId
                },
                transaction:t
            })
            return true
        })
    } catch (error) {
        throw error
    }
}

module.exports = deleteMetricService;