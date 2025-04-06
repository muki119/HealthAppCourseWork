const errorHandlerMiddleware = (err, req, res, next) => {
    //log the error
    res.status(500).json({"error":'Internal Server Error'});
}

module.exports = errorHandlerMiddleware;