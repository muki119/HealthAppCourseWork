const metricRoutes = require('express').Router()
const {metricControllers} = require('../Controllers')
const {checkUserLoggedIn} = require('../middleware')
const {
    createMetricController,
    deleteMetricController,
    getUserMetricController,
    updateMetricController
} = metricControllers;
const {metricValidators} = require('../validators')
const {getMetricValidator,metricDataValidator,updateMetricDataValidator,metricIdValidator} = metricValidators


metricRoutes.use(checkUserLoggedIn) // check if user is logged in before accessing any routes
// get metrics (get all metrics from a certain date)  -- 
metricRoutes.get('/metrics',getMetricValidator, getUserMetricController)
// create metric
metricRoutes.post('/metrics', metricDataValidator, createMetricController) // create a new metric
// delete Metric (metric id)
metricRoutes.delete('/metrics/:metricId', metricIdValidator, deleteMetricController) // delete a metric // check metricId not empty
// update metric (metric id )
metricRoutes.put('/metrics/:metricId',metricIdValidator ,updateMetricDataValidator,updateMetricController) // update a metric // check metricId not empty

module.exports = metricRoutes