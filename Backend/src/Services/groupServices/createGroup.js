const {GroupParticipant,Group} = require('../../models')
const database = require('../../config/Database')
const createGroupService = async (userId,groupName)=>{

    try {
        const transactionResults = await database.transaction(async (t) => {

            const newGroup = await Group.create({
                name:groupName,
                creator_id:userId,
                date_created: new Date() 
                
            },{transaction:t});
            
            await GroupParticipant.create({
                user_id:userId,
                group_id:newGroup.id,
                date_joined: new Date()
            },{transaction:t});
            return newGroup;
        });
        return transactionResults
    } catch (error) {
        console.error('Error creating group:', error); // log this error as it really shouldnt be happening.
        throw error
    }
};



module.exports =  createGroupService;