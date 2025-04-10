const {authServices} = require('../../Services')
const {loginService} = authServices;
//Where the and outputs are handled
const LoginController = async (req,res,next)=>{
    const {username, password} = req.body
    // sanitise the username and password
    try {
        const user = await loginService({username,password})
        if (!user){
            return res.status(400).json({"error":'Invalid Username/Password.'})
        }
        req.session.user = user;
        res.json(user);
    } catch (error) {
        next(error)
    }

};
module.exports = LoginController;