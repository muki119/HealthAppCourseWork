const {GroupParticipant} = require('../../models')
const database = require('../../config/Database')
const leaveGroupService = async (userId,groupId)=>{
    // This function will remove the user from the group
    // it will remove the user from the group_participants table
    try {
        const removeUserTransaction = await database.transaction((t)=>
        {
            return GroupParticipant.destroy({
                where:{
                    user_id:userId,
                    group_id:groupId,
                },
                transaction:t
            });
        })
        return removeUserTransaction;
    } catch (error) {
        throw error
    }
};

module.exports =  leaveGroupService;