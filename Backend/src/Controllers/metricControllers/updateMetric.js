const {metricServices} = require('../../Services')
const {updateMetricService} = metricServices

const  updateMetricController = async (req,res,next)=>{
   
    try {
        const {metricId} = req.params;
        const {newUserData} = req.body;
        console.log('newUserData',newUserData)
        await updateMetricService(metricId,newUserData);
        res.status(200).json({ message: 'Metric updated successfully' });
    } catch (error) {
        next(error)
    }
}

module.exports = updateMetricController;