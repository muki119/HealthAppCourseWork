const {loginService} = require('../Services')
//Where the and outputs are handled
const LoginController = async (req,res)=>{
    const {username, password} = req.body
    // sanitise the username and password
    try {
        const user = await loginService({username,password})
        if (!user){
            res.status(400).json({"error":'Invalid Username/Password.'})
        }
        req.session.user = user
        res.json(user)
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }

};
module.exports = LoginController;