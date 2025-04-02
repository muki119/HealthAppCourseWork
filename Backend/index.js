require('dotenv').config()
const Express = require('express');
const app = Express();
const BodyParser = require('body-parser');
const session = require('express-session')
const Database = require('./src/config/Database');
const models = require('./src/models');

const authenticationRoutes = require('./src/routes/authenticationRoutes');
const port = 2556;
require("./src/Services/Register")
require("./src/Services/Login")

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
app.use("/api/v1",authenticationRoutes);
app.listen(port, (err) => {
    if (err){
        console.log("An error has occurred");
        throw err;
    }
    console.log(`Listening on port ${port}`);
});
