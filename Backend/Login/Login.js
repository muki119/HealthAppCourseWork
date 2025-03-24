const express = express();
const loginRoute = express.Router();

loginRoute.post("/login", (req, res) => {
    // login logic here
    // return user info and session token
});

module.exports = loginRoute;
