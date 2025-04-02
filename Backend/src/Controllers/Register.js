const { registerService } = require("../Services");

//Where the and outputs are handled
const RegisterController = async (req,res)=>{
    try{
        const {forename,surname,username,email,password} = req.body;
        const userData = {forename,surname,username,email,password}
        const successfulRegister = await registerService(userData);
        console.log(successfulRegister)
        if (!successfulRegister){
            res.status(400).json({'error':'Email or Username Already Exists.'})
            return
        }
        res.status(201).json({'message':'Account Successfully Created'})
    }catch(e){
        res.status(500).json({"error":'Internal Server Error'})
    }
};
module.exports = RegisterController;