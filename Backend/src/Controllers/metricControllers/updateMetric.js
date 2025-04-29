const {metricServices} = require('../../Services')
const {updateMetricService} = metricServices
const { validationResult } = require('express-validator');

const  updateMetricController = async (req,res,next)=>{
    const {errors} = validationResult(req);
    if (errors.length > 0) {
        return res.status(400).json({"error":errors[0].msg});
    }
    try {
        const {metricId} = req.params;
        const newMetricData = req.body;
        const metricUpdated = await updateMetricService(metricId,newMetricData);
        if (!metricUpdated){
            return res.status(404).json({ error: 'Metric not found' });
        }
        res.status(200).json({ message: 'Metric updated successfully' });
    } catch (error) {
        next(error)
    }
}

module.exports = updateMetricController;