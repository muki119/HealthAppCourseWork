require('dotenv').config()
const Express = require('express');
const app = Express();
const BodyParser = require('body-parser');
const session = require('express-session')
const Database = require('./src/config/Database');
const helmet = require('helmet')
const compression = require('compression')
const cors = require('cors');
const {errorHandlerMiddleware} = require('./src/middleware');
const {authenticationRoutes, groupRoutes,metricRoutes,goalRoutes} = require('./src/routes');
const port = process.env.PORT;


// incorpoatation of rate limiting is needed.
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true,
}));
app.use(compression());
app.use(helmet());
app.use(BodyParser.json());
app.use(session({
    name:'sid',
    path: '/', 
    httpOnly: true, 
    secure: false, 
    saveUninitialized:false,
    resave:false,
    secret:process.env.COOKIE_SECRET,
    cookie:{
        priority:'high',
        maxAge:(14*24*60*60*1000),
    }
}))

app.use("/api/v1",authenticationRoutes,groupRoutes,metricRoutes,goalRoutes);
app.use(errorHandlerMiddleware);
app.listen(port, (err) => {
    if (err){
        console.log("An error has occurred");
        throw err;
    }
    console.log(`Listening on port ${port}`);
});


// add rate limiting 
// make a socket.io microservice to handle group messages.