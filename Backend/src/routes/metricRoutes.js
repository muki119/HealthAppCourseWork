const metricRoutes = require('express').Router()
const {metricControllers} = require('../Controllers')
const {checkUserLoggedIn} = require('../middleware')
const {
    createMetricController,
    deleteMetricController,
    getUserMetricController,
    updateMetricController
} = metricControllers;


metricRoutes.use(checkUserLoggedIn) // check if user is logged in before accessing any routes
// get metrics (get all metrics from a certain date)  -- 
metricRoutes.get('/metrics', getUserMetricController)
// create metric
metricRoutes.post('/metrics', createMetricController) // create a new metric
// delete Metric (metric id)
metricRoutes.delete('/metrics/:metricId', deleteMetricController) // delete a metric
// update metric (metric id )
metricRoutes.put('/metrics/:metricId', updateMetricController) // update a metric

module.exports = metricRoutes