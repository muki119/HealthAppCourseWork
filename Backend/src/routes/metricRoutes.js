const metricRoutes = require('express').Router()
const {metricControllers} = require('../Controllers')
const {
    createMetricController,
    deleteMetricController,
    getUserMetricController,
    updateMetricController
} = metricControllers;

// get metrics (get all metrics from a certain date)  -- 
metricRoutes.get('/metrics', getUserMetricController)
// create metric
metricRoutes.post('/metrics', createMetricController) // create a new metric
// delete Metric (metric id)
metricRoutes.delete('/metrics/:metricId', deleteMetricController) // delete a metric
// update metric (metric id )
metricRoutes.put('/metrics/:metricId', updateMetricController) // update a metric

module.exports = metricRoutes