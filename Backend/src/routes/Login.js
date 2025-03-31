const loginRoute = require("express").Router();


loginRoute.post("/login", (req, res) => {
    const {username,password } = req.body;
});

module.exports = loginRoute;
