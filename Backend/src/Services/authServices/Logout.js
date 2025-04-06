const {User} = require('../../models');
const database = require('../../config/Database');
const { where } = require('sequelize');

async function logoutService(userId){
    try {
        // update last login function.
        const updateLastOnline = database.transaction(async (t)=>{
            await User.update(
                {last_online:new Date()},
                {where:{id:userId},transaction:t},
            )
        })
        await updateLastOnline;
        return true;
    } catch (error) {
        throw error
    }
}

module.exports= logoutService;