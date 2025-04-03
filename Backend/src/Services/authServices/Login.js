const {User} = require('../../models');
const {createHashedPassword} = require('../../helpers');
const { DataTypes } = require('sequelize');
//Where Business logic is written
//This will interact with the database
async function loginService(requestData){
    const {username,password} = requestData;
    try{
        const user = await User.findOne({where:{username:username}});
        if(!user){
            return null;
        }
        const foundUserPassword = user.password // the password from the found user in the database
        const foundUserSalt = user.salt // the salt from the found user in the database
        if (! await compareHash(password,foundUserSalt,foundUserPassword)){
            return null
        };
        const {id,forename,surname,email,date_created} = user;
        const responseData = {id,forename,surname,email,username,date_created};
        user.last_online = Date.now(); // update last online to the current time.
        user.save();
        return responseData;
    }catch(e){
        throw new e // should be logged
    }

}
async function compareHash(plainTextPassword,foundUserSalt,foundUserPassword){
    var passwordSalt = new Buffer.from(foundUserSalt,'base64')
    var hashedPassword = (await createHashedPassword(plainTextPassword,passwordSalt)).toString('base64')
    return hashedPassword === foundUserPassword
}


module.exports = loginService;