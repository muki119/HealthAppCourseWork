const { Op } = require('sequelize');
const {User} = require('../models');
const crypto = require('crypto')
const {createHashedPassword} = require('../helpers')

//Where Business logic is written
//This will interact with the database

async function registerService(userData) {
    const {forename,surname,username,email,password} = userData;
    var doesUserExist = await User.count({where:{[Op.or]:[{username:username},{email:email}]},});
    if (!doesUserExist){ // if the user dosent exist.
        try{
            var passwordSalt = crypto.randomBytes(24);
            var hashedPassword = await createHashedPassword(password,passwordSalt);
            await User.create({
                forename:forename,
                surname:surname,
                username:username,
                email:email,
                password:hashedPassword.toString('base64'),
                salt:passwordSalt.toString('base64')
            });
            return true
        }catch(e){
            return false
        }
    }
    return false
}

module.exports = registerService;