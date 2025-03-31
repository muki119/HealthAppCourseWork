const Express = require('express');
const app = Express();
const Database = require('./src/config/Database');
const models = require('./src/models');
const BodyParser = require('body-parser');
const authenticationRoutes = require('./src/routes/authenticationRoutes');
const port = 2556;

app.use(BodyParser);
app.use("/api/v1",authenticationRoutes);

app.listen(port, (err) => {
    if (err){
        console.log("An error has occurred");
        throw err;
    }
    console.log(`Listening on port ${port}`);
});
