const { validationResult } = require('express-validator');
const {authServices} = require('../../Services')
const {loginService} = authServices;
//Where the and outputs are handled
const LoginController = async (req,res,next)=>{
    const {username, password} = req.body
    // sanitise the username and password
    try {
        const {errors} = validationResult(req);
        if (errors.length > 0) {
            return res.status(400).json({"error":errors[0].msg});
        }
        const user = await loginService({username,password})
        if (!user){
            return res.status(400).json({"error":'Invalid Username/Password.'})
        }
        req.session.user = user;
        res.status(200).json({message:"Successfully logged in"});
    } catch (error) {
        next(error)
    }

};
module.exports = LoginController;