const Express = require('express');
const app = Express();
const LoginRoute = require('./src/Routes/Login');
const RegisterRoute = require('./src/Routes/Register');
const Database = require('./src/config/Database');
const models = require('./src/models');
const BodyParser = require('body-parser');
const port = 2556;

app.use(BodyParser);
app.use("/api/v1",[LoginRoute, RegisterRoute]);

app.listen(port, (err) => {
    if (err){
        console.log("An error has occurred");
        throw err;
    }
    console.log(`Listening on port ${port}`);
});
