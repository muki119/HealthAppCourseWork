const {GroupParticipant,Group} = require('../../models');
const getUserGroupsService = async (userId)=>{
    // This function will get the groups the user is in
    // It will return an array of group objects
    try {
            const userGroups = await GroupParticipant.findAll({
                attributes:['group_id'],
                where:{
                    user_id:userId
                },
                include:[{
                    model:Group,
                    as:'group',
                    attributes:['name','date_created'],
                }]
            })
            return userGroups
    } catch (error) {
        throw error
    }
};

// getUserGroupsService('31562144-7408-4a58-85d4-89e538711e7b');
module.exports =  getUserGroupsService;