const {metricServices} = require('../../Services')
const {deleteMetricService} = metricServices

const  deleteMetricController  = async (req,res,next)=>{
    try {
        const {metricId} = req.params;
        const userId = req.session.user.id;
        await deleteMetricService(metricId,userId);
        res.status(204).end();
    } catch (error) {
        next(error)
    }
}

module.exports = deleteMetricController;