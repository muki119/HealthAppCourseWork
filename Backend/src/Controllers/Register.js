const { registerService } = require("../Services");

//Where the and outputs are handled
const RegisterController = async (req,res)=>{
    try{
        const {forename,surname,username,email,password} = req.body;
        const userData = {forename,surname,username,email,password}
        const successfulRegister = await registerService(userData);
        if (!successfulRegister){
            res.status(400).end()
            return
        }
        res.status(201).end()
    }catch(e){
        res.status(400).end()
    }
};
module.exports = RegisterController;