const { Op } = require('sequelize');
const database = require('../../config/Database')
const {User} = require('../../models');
const crypto = require('crypto')
const {createHashedPassword} = require('../../helpers')

//Where Business logic is written
//This will interact with the database

async function registerService(userData) {
    try{
        const {forename,surname,username,email,password} = userData;
        var doesUserExist = await User.findOne({where:{[Op.or]:[{username:username},{email:email}]},});
        if (doesUserExist){
            // if the user exists, check if the username or email is already taken
            if (doesUserExist.username === username){
                return {error:'Username already taken'}
            }
            if (doesUserExist.email === email){
                return {error:'Email already taken'}
            }
            return {error:'Username and Email already taken'}
        } // if the user dosent exist.
        const createAccount = await database.transaction(async(t)=>{
            var passwordSalt = crypto.randomBytes(24);
            var hashedPassword = await createHashedPassword(password,passwordSalt);
            await User.create({
                forename:forename,
                surname:surname,
                username:username,
                email:email,
                password:hashedPassword.toString('base64'),
                salt:passwordSalt.toString('base64')
            },{transaction:t});
            return true
        })
        return createAccount
    }catch(e){
        throw e
    }
}

module.exports = registerService;