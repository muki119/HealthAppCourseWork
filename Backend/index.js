const Express = require('express');
const app = Express();
const LoginRoute = require('./Login/Login');
const port = 2556;

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use(LoginRoute);

app.listen(port, (err) => {
    if (err){
        console.log("An error has occurred");
        throw err;
    }
    console.log(`Listening on port ${port}`);
});