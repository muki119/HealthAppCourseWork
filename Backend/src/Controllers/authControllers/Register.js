const {authServices} = require("../../Services");
const {registerService} = authServices;

//Where the and outputs are handled
const RegisterController = async (req,res,next)=>{
    try{
        const {forename,surname,username,email,password} = req.body;
        const userData = {forename,surname,username,email,password}
        const successfulRegister = await registerService(userData);
        if (!successfulRegister){
            return res.status(400).json({'error':'Email or Username Already Exists.'})
        }
        res.status(201).json({'message':'Account Successfully Created'})
    }catch(error){
        next(error)
    }
};
module.exports = RegisterController;