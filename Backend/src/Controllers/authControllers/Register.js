const {authServices} = require("../../Services");
const {registerService} = authServices;
const { validationResult } = require('express-validator');
const { User } = require('../../models');

//Where the and outputs are handled
const RegisterController = async (req,res,next)=>{
    try{
        const {errors} = validationResult(req);
        if (errors.length > 0) {
            return res.status(400).json({"error":errors[0].msg});
        }
        const {forename,surname,username,email,password} = req.body; // check theyre not empty
        //check if usernsame,email,name's are valid 
        // password should have no spaces 
        // minumum 8 characters
        // at least one upper case letter
        //numbers/ special characters
        const userData = {forename,surname,username,email,password}
        const successfulRegister = await registerService(userData);
        if (successfulRegister?.error){
            return res.status(400).json(successfulRegister)
        }
        res.status(201).json({'message':'Account Successfully Created'})
    }catch(error){
        next(error)
    }
};

module.exports = RegisterController;