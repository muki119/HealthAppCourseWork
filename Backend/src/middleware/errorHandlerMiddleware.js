const errorHandlerMiddleware = (err, req, res, next) => {
    //log the error
    console.error(err);
    console.log(err.stack)
    res.status(500).json({"error":'Internal Server Error'});
}

module.exports = errorHandlerMiddleware;