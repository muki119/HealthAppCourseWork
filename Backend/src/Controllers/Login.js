const {loginService} = require('../Services')
//Where the and outputs are handled
const LoginController = async (req,res)=>{
    const {username, password} = req.body
    // sanitise the username and password
    try {
        const user = await loginService({username,password})
        if (!user){
            res.status(400).end()
        }
        req.session.user = user
        res.send(user)
    } catch (error) {
        res.status(500).end()
    }
    // pass username to service function and get resonsone
    //if not null create session and add user details to session. 

    //session should contain basic user data, 

};
module.exports = LoginController;