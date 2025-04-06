const {GroupParticipant,Group} = require('../../models')
const database = require('../../config/Database')
const joinGroupService = async (userId,groupId)=>{ 
    // This function will add the user to the group
    // it will add the user to the group_participants table
    try {
        const transactionResult = await database.transaction((t)=>{
            GroupParticipant.create({
                user_id:userId,
                group_id:groupId,
                date_joined:new Date()
            },{transaction:t})
            const addedGroup = Group.findByPk(groupId,{transaction:t});
            return addedGroup
        })
        return transactionResult
    } catch (error) {
        // track error 
        throw error
    }
    return
};

module.exports =  joinGroupService;