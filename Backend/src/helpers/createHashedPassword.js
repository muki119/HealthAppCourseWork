const crypto = require('crypto')
const createHashedPassword = async (plainTextPassword,passwordSalt,) =>{
    try {
        return crypto.scryptSync(plainTextPassword,passwordSalt,64,{N:16384,r:8,p:1})
    } catch (error) {
        throw new Error(error)
    }
};

module.exports = createHashedPassword;