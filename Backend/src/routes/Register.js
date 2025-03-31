const registerRoute = require('express').Router();

registerRoute.post('/register', (req, res) => {
    const { username, password, email } = req.body;
    
    // check if username exists
    // check if email exists
    //hash password
    // add user to database
});

module.exports = registerRoute;