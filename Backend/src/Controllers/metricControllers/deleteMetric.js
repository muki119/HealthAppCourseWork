const {metricServices} = require('../../Services')
const {deleteMetricService} = metricServices
const { validationResult } = require('express-validator');

const  deleteMetricController  = async (req,res,next)=>{
    const {errors} = validationResult(req);
    if (errors.length > 0) {
        return res.status(400).json({"error":errors[0].msg});
    }
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